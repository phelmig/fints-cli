import { TanMediaClass, TanMediaType } from '../codes.js';
import { HITAB } from '../segments/HITAB.js';
import { HKTAB } from '../segments/HKTAB.js';
import { CustomerOrderInteraction } from './customerInteraction.js';
export class TanMediaInteraction extends CustomerOrderInteraction {
    constructor() {
        super(HKTAB.Id, HITAB.Id);
    }
    createSegments(init) {
        const version = init.getMaxSupportedTransactionVersion(HKTAB.Id);
        if (!version) {
            throw Error(`There is no supported version for business transaction '${HKTAB.Id}`);
        }
        const hktab = {
            header: { segId: HKTAB.Id, segNr: 0, version: version },
            mediaType: TanMediaType.All,
            mediaClass: TanMediaClass.All,
        };
        return [hktab];
    }
    handleResponse(response, clientResponse) {
        const hitab = response.findSegment(HITAB.Id);
        if (hitab) {
            clientResponse.tanMediaList = (hitab.mediaList ?? [])
                .map((media) => media.name)
                .filter((name) => name);
            const tanMethod = this.dialog?.config.selectedTanMethod;
            if (tanMethod) {
                tanMethod.activeTanMedia = clientResponse.tanMediaList;
            }
        }
    }
}
