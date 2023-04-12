import express from 'express';
import postController from '../controllers/post-controller';
import authRoute from './auth-route'
import postRoute from './post-route'
const am = require('../middlewares/async-middleware');
const router = express.Router();

//Auth
router.use('/authenticate', authRoute);

//Post
router.use('/posts',postRoute);
router.post('/all_post',am(postController.findAll));



export default router