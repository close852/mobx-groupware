import express from 'express'
import appDAO from '../models/appDAO'
import {
    requireRole
} from '../utils/roleUtils'

const router = express.Router();


//미결함 조회
router.get('/todolist', async (req, res) => {
    const user_id = '1'; //session에서 꺼내쓰기
    const result = await appDAO.findAllTodoList(user_id);
    res.send(result)
})

//진행함 조회
router.get('/inglist', async (req, res) => {
    const user_id = '1'; //session에서 꺼내쓰기
    const result = await appDAO.findAllIngList(user_id);
    res.send(result)
})

//완결함 조회
router.get('/endlist', async (req, res) => {
    const user_id = '1'; //session에서 꺼내쓰기
    const result = await appDAO.findAllEndList(user_id);
    res.send(result)
})

export default router;