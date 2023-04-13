"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class CommentValidation {
    constructor() {
        this.create = joi_1.default.object({
            comment: joi_1.default.string().min(1).max(1000).required()
        });
        this.update = joi_1.default.object({
            comment: joi_1.default.string().min(1).max(1000).optional()
        });
    }
}
exports.default = new CommentValidation;
