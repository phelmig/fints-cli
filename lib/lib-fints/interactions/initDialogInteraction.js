import { finTsAccountTypeToEnum } from '../bankAccount.js';
import { Language, SyncMode, TanMediaRequirement } from '../codes.js';
import { HIBPA } from '../segments/HIBPA.js';
import { HIKIM } from '../segments/HIKIM.js';
import { HIKOM } from '../segments/HIKOM.js';
import { HIPINS } from '../segments/HIPINS.js';
import { HISYN } from '../segments/HISYN.js';
import { HITANS } from '../segments/HITANS.js';
import { HIUPA } from '../segments/HIUPA.js';
import { HIUPD } from '../segments/HIUPD.js';
import { HKIDN } from '../segments/HKIDN.js';
import { HKSPA } from '../segments/HKSPA.js';
import { HKSYN } from '../segments/HKSYN.js';
import { HKTAB } from '../segments/HKTAB.js';
import { HKVVB } from '../segments/HKVVB.js';
import { CustomerInteraction } from './customerInteraction.js';
import { SepaAccountInteraction } from './sepaAccountInteraction.js';
import { TanMediaInteraction } from './tanMediaInteraction.js';
export class InitDialogInteraction extends CustomerInteraction {
    config;
    syncSystemId;
    constructor(config, syncSystemId = false) {
        super(HKIDN.Id);
        this.config = config;
        this.syncSystemId = syncSystemId;
    }
    createSegments(init) {
        const segments = [];
        const hkidn = {
            header: { segId: HKIDN.Id, segNr: 0, version: HKIDN.Version },
            bank: { country: init.countryCode, bankId: init.bankId },
            customerId: init.customerId ?? init.userId ?? '9999999999',
            systemId: init.bankingInformation.systemId,
            systemIdRequired: this.config.userId ? 1 : 0,
        };
        segments.push(hkidn);
        const hkvvb = {
            header: { segId: HKVVB.Id, segNr: 0, version: HKVVB.Version },
            bpdVersion: init.bankingInformation.bpd?.version ?? 0,
            updVersion: init.bankingInformation.upd?.version ?? 0,
            dialogLanguage: Language.Default,
            productId: init.productId,
            productVersion: init.productVersion,
        };
        segments.push(hkvvb);
        if (this.syncSystemId && this.config.userId && init.bankingInformation.systemId === '0') {
            const hksyn = {
                header: { segId: HKSYN.Id, segNr: 0, version: HKSYN.Version },
                mode: SyncMode.NewSystemId,
            };
            segments.push(hksyn);
        }
        return segments;
    }
    handleResponse(response, clientResponse) {
        const hisyn = response.findSegment(HISYN.Id);
        if (hisyn?.systemId) {
            this.config.bankingInformation.systemId = hisyn.systemId;
        }
        const bankAnswers = clientResponse.bankAnswers;
        const hibpa = response.findSegment(HIBPA.Id);
        if (hibpa) {
            const hitansSegments = response.findAllSegments(HITANS.Id);
            hitansSegments.sort((a, b) => b.header.version - a.header.version);
            const supportedTanMethods = [];
            hitansSegments.forEach((hitans) => {
                supportedTanMethods.push(...(hitans?.params.tanMethods
                    .map((method) => ({
                    id: method.secFunc,
                    name: method.methodName,
                    version: hitans.header.version,
                    isDecoupled: isDecoupledTanMethod(method),
                    activeTanMediaCount: method.activeTanMedia,
                    activeTanMedia: [],
                    tanMediaRequirement: method.tanMediaRequired,
                    decoupled: isDecoupledTanMethod(method)
                        ? {
                            maxStatusRequests: method.decoupledMaxStatusRequests ?? 0,
                            waitingSecondsBeforeFirstStatusRequest: method.decoupledWaitBeforeFirstStatusRequest ?? 0,
                            waitingSecondsBetweenStatusRequests: method.decoupledWaitBetweenStatusRequests ?? 0,
                            manualConfirmationAllowed: method.decoupledManualConfirmationAllowed ?? false,
                            autoConfirmationAllowed: method.decoupledAutoConfirmationAllowed ?? false,
                        }
                        : undefined,
                }))
                    .filter((method) => !supportedTanMethods.some((existing) => existing.id === method.id)) ?? []));
            });
            let bankingUrl = this.config.bankingUrl;
            const hikom = response.findSegment(HIKOM.Id);
            if (hikom) {
                bankingUrl = hikom?.comParams.address;
                if (!bankingUrl.toLowerCase().startsWith('https://')) {
                    bankingUrl = `https://${bankingUrl}`;
                }
            }
            const hipins = response.findSegment(HIPINS.Id);
            if (!hipins) {
                throw new Error('Bank does not support PIN/TAN transactions (HIPINS segment not found in BPA)');
            }
            const bankTransactions = hipins.params.transactions.map((t) => {
                return { transId: t.transId, tanRequired: t.tanRequired, versions: [] };
            });
            bankTransactions.forEach((transaction) => {
                if (transaction.transId.startsWith('HK') || transaction.transId.startsWith('DK')) {
                    const paramSegId = `HI${transaction.transId.slice(2)}S`;
                    const paramSegments = [
                        ...response.findAllSegments(paramSegId),
                    ];
                    const unknownParamSegments = [...response.findAllUnknownSegments(paramSegId)];
                    paramSegments.forEach((paramSegment) => {
                        if (paramSegment) {
                            transaction.versions.push(paramSegment.header.version);
                            transaction.params = paramSegment.params;
                        }
                    });
                    unknownParamSegments.forEach((paramSegment) => {
                        if (paramSegment) {
                            transaction.versions.push(paramSegment.header.version);
                        }
                    });
                }
            });
            const bpd = {
                version: hibpa?.bpdVersion,
                countryCode: hibpa?.bank.country,
                bankId: hibpa?.bank.bankId,
                bankName: hibpa?.bankName,
                maxTransactionsPerMessage: hibpa?.maxNumTransactions,
                supportedLanguages: hibpa?.supportedLanguages,
                supportedHbciVersions: hibpa?.supportedHbciVersions,
                url: bankingUrl,
                supportedTanMethods: supportedTanMethods,
                availableTanMethodIds: [],
                allowedTransactions: bankTransactions,
            };
            this.config.bankingInformation.bpd = bpd;
        }
        const tanMethodMessaqe = bankAnswers.find((answer) => answer.code === 3920);
        if (tanMethodMessaqe && this.config.bankingInformation.bpd) {
            this.config.bankingInformation.bpd.availableTanMethodIds =
                tanMethodMessaqe.params?.map((p) => Number.parseInt(p, 10)) ?? [];
        }
        const hiupa = response.findSegment(HIUPA.Id);
        if (hiupa) {
            const hiupds = response.findAllSegments(HIUPD.Id);
            const accounts = hiupds.map((upd) => {
                return {
                    accountNumber: upd.account.accountNumber,
                    subAccountId: upd.account.subAccountId,
                    bank: upd.account.bank,
                    iban: upd.iban,
                    customerId: upd.customerId,
                    accountType: finTsAccountTypeToEnum(upd.accountType),
                    currency: upd.currency,
                    holder1: upd.accountHolder1,
                    holder2: upd.accountHolder2,
                    product: upd.accountProduct,
                    limit: upd.accountLimit,
                    allowedTransactions: upd.allowedTransactions?.filter((t) => !!t),
                };
            });
            const upd = {
                version: hiupa.updVersion,
                usage: hiupa.updUsage,
                bankAccounts: accounts,
            };
            this.config.bankingInformation.upd = upd;
        }
        const hikimSegments = response.findAllSegments(HIKIM.Id);
        const bankMessages = hikimSegments.map((s) => ({
            subject: s.subject,
            text: s.text,
        }));
        this.config.bankingInformation.bankMessages = bankMessages;
        clientResponse.bankingInformation = this.config.bankingInformation;
        if (this.config.selectedTanMethod &&
            this.config.selectedTanMethod.tanMediaRequirement > TanMediaRequirement.NotAllowed &&
            this.config.isTransactionSupported(HKTAB.Id)) {
            this.dialog?.addCustomerInteraction(new TanMediaInteraction(), true);
        }
        const bankAccounts = this.config.bankingInformation?.upd?.bankAccounts;
        if (bankAccounts) {
            if (bankAccounts.some((account) => account.isSepaAccount === undefined) &&
                this.config.isTransactionSupported(HKSPA.Id)) {
                this.dialog?.addCustomerInteraction(new SepaAccountInteraction(), true);
            }
        }
    }
}
function isDecoupledTanMethod(tanMethod) {
    if (tanMethod.zkaMethod === 'Decoupled' || tanMethod.zkaMethod === 'DecoupledPush') {
        return true;
    }
    if (tanMethod.decoupledMaxStatusRequests !== undefined ||
        tanMethod.decoupledWaitBeforeFirstStatusRequest !== undefined ||
        tanMethod.decoupledWaitBetweenStatusRequests !== undefined ||
        tanMethod.decoupledManualConfirmationAllowed !== undefined ||
        tanMethod.decoupledAutoConfirmationAllowed !== undefined) {
        return true;
    }
    return false;
}
