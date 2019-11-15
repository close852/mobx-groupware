import express from 'express';
import fileProcess from './fileProcess'


const router = express.Router();
router.use('/', fileProcess);/*requireRole("USER"), */

export default router;