import express from 'express'
import appDAO from '../models/appDAO'
import proc from '../framework/appProcess'
import {
    requireRole
} from '../utils/roleUtils'

const router = express.Router();

router.post('/draft', async (req, res) => {
    const {
        title,
        content,
        upappid
    } = req.body;

    const lineData = [
        {
            userid: '2',
            appid: 'test'
        }
    ]
    proc.draftProcess();

    res.send({ data: '123' })
})

router.post('/app', (req, res) => {

    proc.appProcess();

    res.send({ data: '123' })

})

router.post('/cancel', (req, res) => {

    proc.cancelProcess();

    res.send({ data: '123' })

})

router.post('/coop', (req, res) => {

    proc.coopProcess();

    res.send({ data: '123' })

})

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