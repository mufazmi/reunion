"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const error_handler_1 = __importDefault(require("./utils/error-handler"));
const db_config_1 = __importDefault(require("./configs/db-config"));
const PORT = Number(process.env.PORT || 3000);
db_config_1.default;
// Application
const app = (0, express_1.default)();
app.use(express_1.default.json());
//Main Route
const routes_1 = __importDefault(require("./routes"));
const error_middleware_1 = __importDefault(require("./middlewares/error-middleware"));
app.use('/api', routes_1.default);
// Not Found Middleware
app.use((req, res, next) => {
    return next(error_handler_1.default.notFound());
});
// Error Middleware
app.use(error_middleware_1.default);
//Listning Server
app.listen(PORT, () => console.log(`SERVER IS LISTING ON ${PORT}`));
