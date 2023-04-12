import express from 'express';
import postController from '../controllers/post-controller';
import authRoute from './auth-route'
import postRoute from './post-route'
import userController from '../controllers/user-controller';
import auth from '../middlewares/auth-middleware';
const am = require('../middlewares/async-middleware');
const router = express.Router();

//Auth
router.use('/authenticate', authRoute);

//Post
router.use('/posts',auth,postRoute);
router.post('/all_post',auth,am(postController.findAll));

//User
router.get('/user',auth,am(userController.user))

//Follow
router.post('/follow/:id',auth,am(userController.follow))
router.post('/unfollow/:id',auth,am(userController.unfollow))

//Like
router.post('/like/:id',auth,am(postController.likePost))
router.post('/unlike/:id',auth,am(postController.unLikePost))




export default router