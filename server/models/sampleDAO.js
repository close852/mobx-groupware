import db from '../lib/db'

const findSampleById = async (idx) => {
    let sql = `SELECT 'USER' ROLE from dual`;
    let args = []; //[idx];

    try {
        return db.query(sql, args).catch(err => err);
    }
    catch (err) {
        return err;
    }
}

const insertUser = async (loginId, username, password) => {
    let sql = `INSERT INTO USER (USER_ID, LOGIN_ID, USERNAME, PASSWORD)  VALUES (nextval(mw_seq), ? , ? , ? )`;
    let args = [loginId, username, password];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


export default ({
    findSampleById
})