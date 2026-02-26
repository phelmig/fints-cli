import { HKEND } from '../segments/HKEND.js';
import { CustomerInteraction } from './customerInteraction.js';
export class EndDialogInteraction extends CustomerInteraction {
    constructor() {
        super(HKEND.Id);
    }
    createSegments(_config) {
        const hkend = {
            header: { segId: HKEND.Id, segNr: 0, version: HKEND.Version },
            dialogId: this.dialog?.dialogId ?? '0',
        };
        return [hkend];
    }
    handleResponse(_response, _clientResponse) {
        // no special response handling needed
    }
}
