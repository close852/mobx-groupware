import db from '../lib/db'


let insertAppLine = async ({ line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, app_status }) => {
    let sql = `INSERT INTO APP_LINE (line_id, app_id,auth_type,auth_id, taskno, sortno, action_type, app_status)  VALUES (?,?,?,?,?,?,?,?)`;
    let args = [line_id, app_id, auth_type, auth_id, taskno, sortno, action_type, app_status];
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

export default ({
    findAppById,
    insertAppLine,
})