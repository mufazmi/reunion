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
router.use('/posts',postRoute);
router.post('/all_post',auth,am(postController.findAll));

//User
router.get('/user',auth,am(userController.user))

//follow
router.get('/follow/:id',auth,am(userController.user))
router.get('/unfollow/:id',auth,am(userController.user))



export default router