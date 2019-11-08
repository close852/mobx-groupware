import express from 'express'
import userDAO from '../models/userDAO'
import roleDAO from '../models/roleDAO'
import { requireRole } from '../utils/roleUtils'
import { passwordEncode } from '../utils/securityUtils'

const router = express.Router();
/**
 * 사용자 로그인
 */
router.post('/login', async (req, res) => {
    const {
        loginId,
        password
    } = req.body;

    let encPassword = passwordEncode(password);

    const result = await userDAO.getUserByAuth(loginId, encPassword);
    if (result.length === 0) {
        return res.status(400).json({
            error: "login fail!",
            code: 111
        })
    }
    const user = result[0];
    const role = await roleDAO.getUserRole(user.user_id);
    console.log('role>>>', role);
    //session 생성
    req.session.user = user;
    req.session.role = role;

    return res.json({
        data: result
    })
})
/**
 * 사용자 등록
 */
router.post('/', async (req, res) => {
    const {
        username,
        password,
        loginId
    } = req.body;
    let encPassword = passwordEncode(password);

    const dupCheckData = await userDAO.getUserByLoginId(loginId);

    if (dupCheckData.length > 0) {
        return res.status(400).json({
            error: "exists loginId",
            code: 101
        })
    }

    const result = await userDAO.insertUser(loginId, username, encPassword);
    return res.json({
        data: result
    })
});

/**
 * 사용자 정보 수정
 */
router.put('/', async (req, res) => {
    const {
        username,
        password,
        user_id
    } = req.body;

    console.log(username, password, user_id);
    let encPassword = password ? passwordEncode(password) : undefined;

    const params = {
        username,
        password: encPassword,
    }
    // const result = await userDAO.updateUser(username, encPassword, user_id);
    const result = await userDAO.updateDynamicUser(params, user_id);
    const user = await userDAO.getUserById(user_id);
    req.session.user = user[0];

    return res.json({
        data: result
    })

})

/**
 * 사용자 조회
 */
router.get('/', requireRole("USER"), (req, res) => {

    return res.json({
        data: req.session.user
    })

})

/**
 * 사용자 로그아웃
 */
router.post('/logout', requireRole("USER"), (req, res) => {
    req.session.destroy(() => {
        // req.session;
    })
    return res.json({
        data: ''
    })
})

/*
    ERROR CODE
    register : 100
    login : 110
*/
export default router;