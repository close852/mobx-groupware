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
const findAllTodoList = (user_id, paging) => {
    let sql = ` SELECT * FROM V_TODOLIST WHERE curr_user_id = ? ${paging.orderBy} LIMIT ?, ?`;
    let args = [user_id, (paging.startWith), (paging.size)];
    return db.query(sql, args).catch(err => err);
}

/**
 * 진행문서함
 */
const findAllProcessList = (user_id, paging) => {
    let sql = ` SELECT * FROM V_PROCESSLIST WHERE auth_id = ?  ${paging.orderBy} LIMIT ?, ?`;
    let args = [user_id, (paging.startWith), (paging.size)];
    return db.query(sql, args).catch(err => err);
}

/**
 * 완료문서함
 */
const findAllEndList = (user_id, paging) => {
    let sql = ` SELECT * FROM V_ENDLIST WHERE auth_id = ? ${paging.orderBy} LIMIT ?, ?`;
    let args = [user_id, (paging.startWith), (paging.size)];
    return db.query(sql, args).catch(err => err);
}

export default ({
    findAppById,
    insertApp,
    findAllTodoList,
    findAllProcessList,
    findAllEndList
})