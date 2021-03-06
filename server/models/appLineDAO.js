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

let insertAppLineBatch = (appLines) => {
    //   let sql = `INSERT INTO APP_LINE (line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, status)  VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    let sql = `INSERT INTO APP_LINE (line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, status) values ?`;
    // { line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, status }
    let values = appLines;
    try {
        return db.query(sql, [values]).catch(err => err);
    } catch (err) {
        return err;
    }
}
let findAppLineByLineId = async (lineId) => {
    let sql = `SELECT * FROM APP_LINE WHERE line_id = ?`;
    let args = [lineId];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}
const updateAppLineStatusByLineId = ({ status, appdate, line_id }) => {
    let sql = `UPDATE APP_LINE 
               SET STATUS = ? , APP_DATE = ?
               WHERE LINE_ID = ?`;
    let args = [status, appdate, line_id];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

const findNextLineData = async (line_id) => {
    let sql = ` SELECT * FROM APP_LINE WHERE (app_id, taskno, sortno) in (select app_id, taskno, sortno+1 from app_line where line_id = ?) `;
    sql += ` UNION `;
    sql += ` SELECT * FROM APP_LINE WHERE (app_id, taskno, sortno) in (select app_id, taskno+1, sortno from app_line where line_id = ?) `;
    sql += ` ORDER BY TASKNO, SORTNO LIMIT 1 `;

    let args = [line_id, line_id];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}

const findPrevLineData = async (line_id) => {
    
    let sql = ` SELECT * FROM APP_LINE WHERE (app_id, taskno, sortno) in (select app_id, taskno, sortno-1 from app_line where line_id = ?) `;

    let args = [line_id, line_id];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


const findCurLineData = async (appId) => {
    let sql = ` SELECT * FROM APP_LINE WHERE (app_id, taskno, sortno) in (select app_id, cur_taskno, cur_sortno from app where app_id = ?) `;

    let args = [appId];

    try {
        return await db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}
export default ({
    findAppLineByLineId,
    insertAppLine,
    insertAppLineBatch,
    updateAppLineStatusByLineId,
    findCurLineData,
    findNextLineData,
    findPrevLineData,
})