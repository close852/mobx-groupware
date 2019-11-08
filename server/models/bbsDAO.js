import db from '../lib/db'

const findAllBbs = () => {
    let sql = `SELECT  * FROM BBS`;
    let args = []; //[idx];
    return db.query(sql, args).catch(err => err);
}

const findBbsById = (bbs_id) => {
    let sql = `SELECT  * FROM BBS WHERE BBS_ID =?`;
    let args = [bbs_id]; //[idx];
    return db.query(sql, args).catch(err => err);
}


const deleteBbsById = (bbs_id) => {
    let sql = `DELETE FROM BBS WHERE BBS_ID = ?`;
    let args = [bbs_id]; //[idx];
    return db.query(sql, args).catch(err => err);
}


const insertBbs = async (bbs_name, description, use_yn) => {
    let sql = `INSERT INTO BBS (BBS_ID, BBS_NAME, DESCRIPTION, USE_YN)  VALUES (nextval(mw_seq), ? , ? , ? )`;
    let args = [bbs_name, description, use_yn];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


export default ({
    findAllBbs,
    findBbsById,
    deleteBbsById,
    insertBbs
})