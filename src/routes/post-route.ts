import express from 'express';
import postController from '../controllers/post-controller';
import commentController from '../controllers/comment-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/posts/',am(postController.create))
router.get('/posts/:id',am(postController.findOne))
router.delete('/posts/:id',am(postController.destroy))
router.post('/all_post',am(postController.findAll));

//Like
router.post('/like/:id',am(postController.likePost))
router.post('/unlike/:id',am(postController.unLikePost))

//Comment
router.post('/comment/:id',am(commentController.create))

export default router;