export var Language;
(function (Language) {
    Language[Language["Default"] = 0] = "Default";
    Language[Language["German"] = 1] = "German";
    Language[Language["English"] = 2] = "English";
    Language[Language["French"] = 3] = "French";
})(Language || (Language = {}));
export var Service;
(function (Service) {
    Service[Service["Tonline"] = 1] = "Tonline";
    Service[Service["TcpIp"] = 2] = "TcpIp";
    Service[Service["Https"] = 3] = "Https";
})(Service || (Service = {}));
export var HashAlgorithm;
(function (HashAlgorithm) {
    HashAlgorithm[HashAlgorithm["SHA1"] = 1] = "SHA1";
    HashAlgorithm[HashAlgorithm["SHA256"] = 3] = "SHA256";
    HashAlgorithm[HashAlgorithm["SHA384"] = 4] = "SHA384";
    HashAlgorithm[HashAlgorithm["SHA512"] = 5] = "SHA512";
    HashAlgorithm[HashAlgorithm["SHA256_256"] = 6] = "SHA256_256";
})(HashAlgorithm || (HashAlgorithm = {}));
export var SyncMode;
(function (SyncMode) {
    SyncMode[SyncMode["NewSystemId"] = 0] = "NewSystemId";
    SyncMode[SyncMode["LastProcessedMsgNr"] = 1] = "LastProcessedMsgNr";
    SyncMode[SyncMode["SignatureId"] = 2] = "SignatureId";
})(SyncMode || (SyncMode = {}));
export var LimitType;
(function (LimitType) {
    LimitType["SingleOrder"] = "E";
    LimitType["Day"] = "T";
    LimitType["Week"] = "W";
    LimitType["Month"] = "M";
    LimitType["Time"] = "Z";
})(LimitType || (LimitType = {}));
export var UpdUsage;
(function (UpdUsage) {
    UpdUsage[UpdUsage["MissingNotAllowed"] = 0] = "MissingNotAllowed";
    UpdUsage[UpdUsage["MissingUnknown"] = 1] = "MissingUnknown";
})(UpdUsage || (UpdUsage = {}));
export var CreditDebit;
(function (CreditDebit) {
    CreditDebit["Credit"] = "C";
    CreditDebit["Debit"] = "D";
})(CreditDebit || (CreditDebit = {}));
export var TanMediaType;
(function (TanMediaType) {
    TanMediaType[TanMediaType["All"] = 0] = "All";
    TanMediaType[TanMediaType["Active"] = 1] = "Active";
    TanMediaType[TanMediaType["Available"] = 2] = "Available";
})(TanMediaType || (TanMediaType = {}));
export var TanMediaClass;
(function (TanMediaClass) {
    TanMediaClass["All"] = "A";
    TanMediaClass["List"] = "L";
    TanMediaClass["TanGenerator"] = "G";
    TanMediaClass["Mobile"] = "M";
    TanMediaClass["Secoder"] = "S";
    TanMediaClass["Bilateral"] = "B";
})(TanMediaClass || (TanMediaClass = {}));
export var TanMediaRequirement;
(function (TanMediaRequirement) {
    TanMediaRequirement[TanMediaRequirement["NotAllowed"] = 0] = "NotAllowed";
    TanMediaRequirement[TanMediaRequirement["Optional"] = 1] = "Optional";
    TanMediaRequirement[TanMediaRequirement["Required"] = 2] = "Required";
})(TanMediaRequirement || (TanMediaRequirement = {}));
export var TanStatus;
(function (TanStatus) {
    TanStatus[TanStatus["Active"] = 1] = "Active";
    TanStatus[TanStatus["Available"] = 2] = "Available";
    TanStatus[TanStatus["ActiveFollowUpCard"] = 3] = "ActiveFollowUpCard";
    TanStatus[TanStatus["AvailableFollowUpCard"] = 4] = "AvailableFollowUpCard";
})(TanStatus || (TanStatus = {}));
export var TanUsage;
(function (TanUsage) {
    TanUsage[TanUsage["All"] = 0] = "All";
    TanUsage[TanUsage["Single"] = 1] = "Single";
    TanUsage[TanUsage["MobileAndGenerator"] = 2] = "MobileAndGenerator";
})(TanUsage || (TanUsage = {}));
export var TanProcess;
(function (TanProcess) {
    TanProcess["Process1"] = "1";
    TanProcess["Process2"] = "2";
    TanProcess["Process3"] = "3";
    TanProcess["Process4"] = "4";
    TanProcess["Status"] = "S";
})(TanProcess || (TanProcess = {}));
