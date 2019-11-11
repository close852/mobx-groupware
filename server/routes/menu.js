import express from 'express'
import menuDAO from '../models/menuDAO'
const router = express.Router();

router.get('/', (req, res) => {
    const {
        group_id
    } = req.query;
    const result = menuDAO.findMenuGroupByGroupId(group_id);
    return res.send(result)
})
export default router;
