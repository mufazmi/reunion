"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class PostValidation {
    constructor() {
        this.create = joi_1.default.object({
            title: joi_1.default.string().min(1).max(1000).required(),
            desc: joi_1.default.string().min(1).max(8000).required()
        });
        this.update = joi_1.default.object({
            title: joi_1.default.string().min(1).max(1000).optional(),
            desc: joi_1.default.string().min(1).max(8000).optional()
        });
    }
}
exports.default = new PostValidation;
