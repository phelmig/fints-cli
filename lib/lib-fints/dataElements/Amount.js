import { Float } from './Float.js';
export class Amount extends Float {
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        super(name, minCount, maxCount, 15, minVersion, maxVersion);
    }
}
