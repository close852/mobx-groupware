import db from '../lib/db'

const findAllDept = () => {
    let sql = `SELECT * FROM  DEPT `;
    let args = []; //[idx];

    try {
        return db.query(sql, args).catch(err => err);
    }
    catch (err) {
        return err;
    }
}

const findDeptById = async ({ id }) => {
    let sql = `SELECT * FROM  DEPT WHERE DEPT_ID=?`;
    let args = [id];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


export default ({
    findAllDept,
    findDeptById
})