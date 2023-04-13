"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dbConnection = () => {
    const dbUrl = process.env.MONGODB_URI || '';
    mongoose_1.default.connect(dbUrl)
        .then(() => console.log('Database Connection Success'))
        .catch((err) => console.log(`Connection With Database Failed. Reason ${err.message}`));
};
exports.default = dbConnection();
