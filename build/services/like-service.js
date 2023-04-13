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
const like_model_1 = __importDefault(require("../models/like-model"));
class LikeService {
    constructor() {
        this.create = (data) => __awaiter(this, void 0, void 0, function* () { return yield like_model_1.default.create(data); });
        this.update = (_id, data) => __awaiter(this, void 0, void 0, function* () { return yield like_model_1.default.updateOne({ _id }, data); });
        this.findOne = (filter) => __awaiter(this, void 0, void 0, function* () { return yield like_model_1.default.findOne(filter); });
        this.deleteOne = (filter) => __awaiter(this, void 0, void 0, function* () { return yield like_model_1.default.deleteOne(filter); });
        this.findCount = (filter) => __awaiter(this, void 0, void 0, function* () { return yield like_model_1.default.countDocuments(filter); });
    }
}
exports.default = new LikeService;
