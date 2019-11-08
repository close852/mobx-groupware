import db from '../lib/db'

const getUserRole = (idx) => {
    let sql = `SELECT 'USER' ROLE from dual`;
    let args = []; //[idx];

    return db.query(sql, args).catch(err => err);
}

export default ({
    getUserRole
})
