export class DataElement {
    name;
    minCount;
    maxCount;
    minVersion;
    maxVersion;
    constructor(name, minCount = 0, maxCount = 1, minVersion, maxVersion) {
        this.name = name;
        this.minCount = minCount;
        this.maxCount = maxCount;
        this.minVersion = minVersion;
        this.maxVersion = maxVersion;
        if (minCount < 0 || maxCount < 0 || minCount > maxCount) {
            throw new Error('invalid count range');
        }
        if (minVersion && maxVersion && minVersion > maxVersion) {
            throw new Error('invalid version range');
        }
    }
    maxValueCount(version) {
        return this.isInVersion(version) ? 1 : 0;
    }
    isInVersion(version) {
        return ((!this.minVersion || version >= this.minVersion) &&
            (!this.maxVersion || version <= this.maxVersion));
    }
    toString(value) {
        if (value !== undefined && value !== null && value !== '') {
            return `${this.name}: ${value}`;
        }
        else if (this.minCount > 0) {
            return `${this.name}: <MISSING>`;
        }
        else {
            return '';
        }
    }
}
