import db from '../lib/db'

const findByFileId = (fileid) => {
    let sql = `SELECT * from file where file_id =?`;
    let args = [fileid]; //[idx];
    try {
        return db.query(sql, args).catch(err => err);
    }
    catch (err) {
        return err;
    }
}
const findAllByRefId = (refid) => {
    let sql = `SELECT * from file where ref_id =?`;
    let args = [refid]; //[idx];
    try {
        return db.query(sql, args).catch(err => err);
    }
    catch (err) {
        return err;
    }
}

const insertFile = ({ fileid, refid, filename, filepath, filesize, sortno, type }) => {
    let sql = `INSERT INTO FILE (FILE_ID, REF_ID, FILE_NAME, filepath, file_size, sortno,type )  VALUES (? , ? , ? , ?, ?, ?, ? )`;
    let args = [fileid, refid, filename, filepath, filesize, sortno, type];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}
const deleteByFileId = (fileid) => {
    let sql = `DELETE FROM FILE WHERE FILE_ID = ? `;
    let args = [fileid];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


export default ({
    findByFileId,
    findAllByRefId,
    insertFile,
    deleteByFileId
})