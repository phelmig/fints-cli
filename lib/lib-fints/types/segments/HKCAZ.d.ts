import { AlphaNumeric } from '../dataElements/AlphaNumeric.js';
import { Dat } from '../dataElements/Dat.js';
import { Numeric } from '../dataElements/Numeric.js';
import { YesNo } from '../dataElements/YesNo.js';
import { type CamtAccount } from '../dataGroups/CamtAccount.js';
import { DataGroup } from '../dataGroups/DataGroup.js';
import type { SegmentWithContinuationMark } from '../segment.js';
import { SegmentDefinition } from '../segmentDefinition.js';
export type HKCAZSegment = SegmentWithContinuationMark & {
    account: CamtAccount;
    acceptedCamtFormats: string[];
    allAccounts: boolean;
    from?: Date;
    to?: Date;
    maxEntries?: number;
};
/**
 * Request account transactions in a given period (CAMT format)
 */
export declare class HKCAZ extends SegmentDefinition {
    static Id: string;
    static Version: number;
    constructor();
    version: number;
    elements: (AlphaNumeric | YesNo | DataGroup | Numeric | Dat)[];
}
//# sourceMappingURL=HKCAZ.d.ts.map