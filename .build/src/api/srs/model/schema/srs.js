"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.srsModal = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const srsSchema = new mongoose_1.default.Schema({
    data: {
        type: []
    }
}, {
    timestamps: true, collection: 'srs'
});
exports.srsModal = mongoose_1.default.model('srs', srsSchema);
//# sourceMappingURL=srs.js.map