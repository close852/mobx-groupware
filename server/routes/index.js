import express from 'express';

import article from './article'
import bbs from './bbs'
import app from './app'

import user from './user'
import dept from './dept'
import menu from './menu'
import d3Data from './d3Data'
import org from './org'

const router = express.Router();

router.use('/app', app);/*requireRole("USER"), */
router.use('/bbs', bbs);/*requireRole("USER"), */
router.use('/user', user);/*requireRole("USER"), */
router.use('/dept', dept);/*requireRole("USER"), */
router.use('/article', article);/*requireRole("USER"), */
router.use('/menu', menu);/*requireRole("USER"), */
router.use('/d3', d3Data);/*requireRole("USER"), */
router.use('/org', org);/*requireRole("USER"), */

export default router;