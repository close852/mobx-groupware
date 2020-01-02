import db from '../lib/db'
// import { log } from 'util';

let getUserByAuth = async (loginId, password) => {
    let sql = `SELECT * FROM USER WHERE LOGIN_ID = ? and password = ?`;
    let args = [loginId, password];

    try {
        return db.query(sql, args).catch(err => err);;
    } catch (err) {
        return err;
    }
}
let getUserByLoginId = async (loginId) => {
    let sql = `SELECT * FROM USER WHERE LOGIN_ID = ? `;
    let args = [loginId];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

let getUserById = async (userId) => {
    let sql = `SELECT * FROM USER WHERE USER_ID = ? `;
    let args = [userId];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


let insertUser = async (loginId, username, password) => {
    let sql = `INSERT INTO USER (USER_ID, LOGIN_ID, USERNAME, PASSWORD)  VALUES (nextval(mw_seq), ? , ? , ? )`;
    let args = [loginId, username, password];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}
let updateUser = async (username, password, userId) => {
    let sql = `UPDATE USER SET ${username ? 'username=? ' : ''}${password ? ',password=? ' : ''} WHERE USER_ID = ?`;
    let args = [];
    if (username) {
        args.push(username);
    }
    if (password) {
        args.push(password);
    }
    args.push(userId);

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}
const updateDynamicUser = async (args, userId) => {
    const id = escape(userId);
    let sql = `UPDATE USER SET ? WHERE USER_ID = ${id}`;
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

const findUserByDeptId = ({ deptId }) => {
    let sql = ` SELECT user_id, login_id, password, username,u.dept_id,d.deptname 
                FROM USER u, DEPT d  
                WHERE u.dept_id = d.dept_id 
                AND u.DEPT_ID = ? `;
    let args = [deptId];
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

const findUserListByTarget = ({ srchTarget, keyword }) => {

    let sql = ` SELECT user_id, login_id, password, username,u.dept_id,d.deptname
                FROM USER u, DEPT d  
                WHERE u.dept_id = d.dept_id 
                AND ${srchTarget} LIKE  CONCAT('%', ?, '%') `;
    let args = [keyword];
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }

}
export default ({
    getUserById,
    insertUser,
    getUserByAuth,
    getUserByLoginId,
    updateUser,
    updateDynamicUser,
    findUserByDeptId,
    findUserListByTarget
})