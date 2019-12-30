import express from 'express'
import userDAO from '../models/userDAO'

const router = express.Router();

/**
 * 사용자 조회
 */
router.get('/find', async (req, res) => {
    const {
        srchTarget,
        keyword,
    } = req.query;

    const data = await userDAO.findUserListByTarget({ srchTarget, keyword })
    console.log('/org/find', req.query)
    res.send({
        data: data
    })
})
export default router;