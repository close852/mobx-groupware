import db from '../lib/db'

const findAllOpinionByAppId = async (idx) => {
    let sql = `SELECT 'USER' ROLE from dual`;
    let args = []; //[idx];

    try {
        return db.query(sql, args).catch(err => err);
    }
    catch (err) {
        return err;
    }
}
/*
            opinion_id: uuid(),
            user_id: appVO.user_id,
            app_id: appVO.appId,
            line_id: line_id,
            opinion: appVO.opinion,
*/
const insertOpinion = async ({ opinion_id, user_id, app_id, line_id, opinion }) => {
    let sql = `INSERT INTO OPINION (opinion_id, app_id, user_id, line_id, opinion)  VALUES ( ?, ?, ?, ?, ? )`;
    let args = [opinion_id, app_id, user_id, line_id, opinion];

    try {
        return db.query(sql, args).catch(err => err);
    } catch (err) {
        return err;
    }
}


export default ({
    insertOpinion,
    findAllOpinionByAppId,
})
