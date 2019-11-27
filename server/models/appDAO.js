import db from '../lib/db'

//appVO = { appId, title, content, appLine, docno, user_id, dept_id, makedate }
let insertApp = async ({ appId, docno, title, content, user_id, dept_id }) => {
    console.log('>>> insertApp ...')
    let sql = `INSERT INTO APP (app_id,docno,title,content,status,draft_user_id,dept_id, created_user_id,updated_user_id)  VALUES (?,?,?,?,?,?,?,?,?)`;
    let args = [appId, docno, title, content, 'ARRIVAL', user_id, dept_id, user_id, user_id];
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

const updateAppStatusByAppId = ({ status, cur_taskno, cur_sortno, app_id }) => {
    let sql = ` UPDATE APP 
                SET STATUS=?, cur_taskno=? , cur_sortno=? 
                WHERE APP_ID = ? `
    let args = [status, cur_taskno, cur_sortno, app_id];
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

let findAppById = async (app_id) => {
    let sql = `SELECT * FROM APP WHERE app_id = ?`;
    let args = [app_id];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

/**
 * 미결문서함
 */
const findAllTodoList = (user_id) => {
    let sql = ` SELECT * FROM V_TODOLIST WHERE curr_user_id = ? `;
    let args = [user_id];
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

/**
 * 진행문서함
 */
const findAllIngList = (user_id) => {
    let sql = ` SELECT * FROM V_INGLIST WHERE auth_id = ?  `;
    let args = [user_id];
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

/**
 * 완료문서함
 */
const findAllEndList = (user_id) => {
    let sql = ` SELECT * FROM V_ENDLIST WHERE auth_id = ?`;
    let args = [user_id];
    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

export default ({
    findAppById,
    insertApp,
    findAllTodoList,
    findAllIngList,
    findAllEndList,
    updateAppStatusByAppId,
})