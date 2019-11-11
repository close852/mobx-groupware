import db from '../lib/db'

let findMenuGroupByGroupId = async (group_id) => {
    let sql = `SELECT * FROM MENU WHERE group_id = ?`;
    let args = [group_id];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


export default ({
    findMenuGroupByGroupId,
})