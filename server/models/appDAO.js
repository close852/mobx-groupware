import db from '../lib/db'

let insertApp = async ({ app_id, doc_no, title, content, user_id }) => {
    let sql = `INSERT INTO APP (app_id,doc_no,title,content,doc_status,draft_user_id,curr_user_id)  VALUES (?,?,?,?,?,?,?)`;
    let args = [app_id, 'doc_no', title, content, 'ARRIVAL', user_id, user_id];
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
    let args = [user_id ];
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
    findAllEndList
})