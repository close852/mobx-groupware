import db from '../lib/db'

/*
        line_id: uuid(),
        app_id: appVO.appId,
        auth_type: line.auth_type,
        auth_id: line.userid,
        taskno: line.taskno,
        sortno: line.sortno,
        action_type: line.action_type,
        status: line.status,

*/
let insertAppLine = ({ line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, status }) => {
    let sql = `INSERT INTO APP_LINE (line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, status)  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    let args = [line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, status];
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
const updateAppLineStatusByLineId = ({ status, appdate, line_id }) => {
    let sql = `UPDATE APP_LINE 
               SET STATUS = ? , APPDATE = ?
               WHERE LINE_ID = ?`;
    let args = [status, appdate, line_id];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

export default ({
    findAppById,
    insertAppLine,
    updateAppLineStatusByLineId,
})