"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("./auth-route"));
const post_route_1 = __importDefault(require("./post-route"));
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth-middleware"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
//Auth
router.use('/authenticate', auth_route_1.default);
//Post
router.use(auth_middleware_1.default, post_route_1.default);
//User
router.get('/user', auth_middleware_1.default, am(user_controller_1.default.user));
//Follow
router.post('/follow/:id', auth_middleware_1.default, am(user_controller_1.default.follow));
router.post('/unfollow/:id', auth_middleware_1.default, am(user_controller_1.default.unfollow));
exports.default = router;
