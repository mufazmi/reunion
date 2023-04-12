import express from 'express';
import authController from '../controllers/auth-controller';
const am = require('../middlewares/async-middleware');

const router = express.Router();

router.post('/',am(authController.login))
router.post('/register',am(authController.register))

export default router;