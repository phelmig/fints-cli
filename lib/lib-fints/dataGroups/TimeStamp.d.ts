import { DataGroup } from './DataGroup.js';
export type TimeStamp = {
    date: Date;
    time?: Date;
};
export declare class TimeStampGroup extends DataGroup {
    constructor(name: string, minCount?: number, maxCount?: number, minVersion?: number, maxVersion?: number);
}
//# sourceMappingURL=TimeStamp.d.ts.map