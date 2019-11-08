import db from '../lib/db'

const findAllCategory = async () => {
    let sql = `SELECT * FROM CATEGORY`;
    let args = []; //[idx];
    return db.query(sql, args).catch(err => err);
}

const findCategoryById = async (category_id) => {
    let sql = `SELECT * FROM CATEGORY WHERE CATEGORY_ID =?`;
    let args = [category_id]; //[idx];
    return db.query(sql, args).catch(err => err);
}


const deleteCategoryById = async (category_id) => {
    let sql = `DELETE FROM CATEGORY WHERE CATEGORY_ID = ?`;
    let args = [category_id]; //[idx];
    return db.query(sql, args).catch(err => err);
}


const insertCategory = async (name, use_yn, userid) => {
    let sql = `INSERT INTO CATEGORY (NAME, USE_YN, reguse_id)  VALUES (nextval(mw_seq), ? , ? , ? )`;
    let args = [name, use_yn, userid];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


export default ({
    findAllCategory,
    findCategoryById,
    deleteCategoryById,
    insertCategory
})