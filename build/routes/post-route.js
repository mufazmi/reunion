"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const post_controller_1 = __importDefault(require("../controllers/post-controller"));
const comment_controller_1 = __importDefault(require("../controllers/comment-controller"));
const am = require('../middlewares/async-middleware');
const router = express_1.default.Router();
router.post('/posts/', am(post_controller_1.default.create));
router.get('/posts/:id', am(post_controller_1.default.findOne));
router.delete('/posts/:id', am(post_controller_1.default.destroy));
router.post('/all_post', am(post_controller_1.default.findAll));
//Like
router.post('/like/:id', am(post_controller_1.default.likePost));
router.post('/unlike/:id', am(post_controller_1.default.unLikePost));
//Comment
router.post('/comment/:id', am(comment_controller_1.default.create));
exports.default = router;
