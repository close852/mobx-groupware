import express from 'express'
import deptDAO from '../models/deptDAO'

const router = express.Router();

router.get('/', async (req, res) => {
    const result = await deptDAO.findAllDept();
    return res.send(result)
})
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;

    const result = await deptDAO.findDeptById({ id });
    return res.send(result)
})
export default router;
