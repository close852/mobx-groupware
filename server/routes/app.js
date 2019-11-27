import express from 'express'
import appDAO from '../models/appDAO'
import proc from '../framework/appProcess'
import {
    requireRole
} from '../utils/roleUtils'
import { uuid } from '../utils/uuidUtils'

const router = express.Router();

router.post('/draft', async (req, res) => {
    const {
        title,
        content,
        appLine,
        docno,
        user_id,
        dept_id,
        nexturl,
        makedate,
        opinion,
        cur_taskno,
        cur_sortno,
    } = req.body;
    let {
        appId,
    } = req.body;
    console.log('... req.body>>>', req.body)
    const jsonLine = JSON.parse(appLine);
    console.log(jsonLine[1])

    if (appId) {
        // copy기안 또는 redraft, 결재 진행상태 확인 하고 처리진행
    }
    appId = uuid();
    const appVO = {
        title,
        content,
        appLine: jsonLine,
        docno,
        user_id,
        dept_id,
        makedate,
        appId,
        opinion,
        cur_taskno,
        cur_sortno,
    }
    proc.draftProcess(appVO);

    res.send({ data: '123', nexturl })
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