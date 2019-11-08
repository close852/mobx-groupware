import express from 'express';
import article from './article'
import bbs from './bbs'
import user from './user'

const router = express.Router();


router.use('/bbs', bbs);/*requireRole("USER"), */
router.use('/user', user);/*requireRole("USER"), */
router.use('/article', article);/*requireRole("USER"), */
export default router;