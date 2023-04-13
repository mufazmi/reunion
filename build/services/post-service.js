"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post-model"));
class PostService {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () { return yield post_model_1.default.create(data); });
        this.update = (filter, data) => __awaiter(this, void 0, void 0, function* () { return yield post_model_1.default.updateOne(filter, data); });
        this.findOne = (filter) => __awaiter(this, void 0, void 0, function* () { return yield post_model_1.default.findOne(filter); });
        this.findAll = (filter) => __awaiter(this, void 0, void 0, function* () { return yield post_model_1.default.find(filter); });
        this.findCount = (filter) => __awaiter(this, void 0, void 0, function* () { return yield post_model_1.default.countDocuments(filter); });
        this.deleteOne = (filter) => __awaiter(this, void 0, void 0, function* () { return yield post_model_1.default.deleteOne(filter); });
    }
}
exports.default = new PostService;