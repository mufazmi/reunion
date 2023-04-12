import express from 'express';
import postController from '../controllers/post-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(postController.create))
router.get('/:id',am(postController.findOne))
router.delete('/:id',am(postController.destroy))

export default router;