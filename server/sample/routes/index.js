import express from 'express';
import article from './article'
import upload from './upload'

const router = express.Router();


router.use('/upload', upload);/*requireRole("USER"), */
router.use('/article', article);/*requireRole("USER"), */
export default router;