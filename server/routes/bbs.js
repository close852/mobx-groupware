import express from 'express'
import articleDAO from '../models/articleDAO'
import bbsDAO from '../models/bbsDAO'

import {
    requireRole
} from '../utils/roleUtils'

const router = express.Router();

/**
 * 전체 게시판 조회
 */
router.get('/', async (req, res) => {
    /*    const {// form-data
        } = req.body;
        const { // /:id
        } = req.params;
    */
    const result = await bbsDAO.findAllBbs();
    return res.send(result)
})

//게시판 조회
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    // console.log('req.params >>>>> ', req.params)
    const result = await bbsDAO.findBbsById(id);
    return res.json({
        data: result
    })
})




export default router;