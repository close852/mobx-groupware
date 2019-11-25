import express from 'express'
import deptDAO from '../models/deptDAO'
import userDAO from '../models/userDAO'

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
router.get('/user/:id', async (req, res) => {
    const {
        id
    } = req.params;

    const result = await userDAO.findUserByDeptId({ id });
    return res.send(result)
})
export default router;
