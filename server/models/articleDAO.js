import db from '../lib/db'

const findArticleById = async (articleId) => {
    let sql = `SELECT * FROM ARTICLE WHERE ARTICLE_ID = ?`;
    let args = [articleId]; //[idx];

    return db.query(sql, args).catch(err => err);
}
const deleteArticleById = async (articleId) => {
    let sql = `DELETE FROM ARTICLE WHERE ARTICLE_ID = ?`;
    let args = [articleId]; //[idx];

    return db.query(sql, args).catch(err => err);
}
const findArticleByBbsId = (bbs_id, paging) => {
    const orderBy = paging.orderBy && escape(paging.orderBy);
    const sortType = (paging.sortType && escape(paging.sortType)) || '';
    const startWith = Number(paging.startWith);
    const size = Number(paging.pageSize);
    const order = (paging.orderBy && ('ORDER BY ' + orderBy + ' ' + sortType)) || '';
    let sql = ` SELECT * FROM ARTICLE WHERE BBS_ID = ? ${order} LIMIT ?, ?`;
    let args = [bbs_id, startWith, size];
    return db.query(sql, args).catch(err => err);
}


const insertArticle = (title, content, bbs_id, user_id, ref_article_id) => {
    const refId = ref_article_id ? ref_article_id : 'lastval(mw_seq)';

    let sql = `INSERT INTO ARTICLE (ARTICLE_ID, TITLE, CONTENT, BBS_ID, USER_ID, REF_ARTICLE_ID)  VALUES (nextval(mw_seq), ? , ? , ? , ? , ${refId} )`;
    let args = [title, content, bbs_id, user_id];
    if (ref_article_id)
        args.push(ref_article_id)

    return db.query(sql, args).catch(err => err);
}
const updateArticle = async (params) => {
    let sql = `UPDATE ARTICLE SET content=?, title=?, indent=?, ref_article_id=?, sortno=?, bbs_id=? where article_id = ?`;
    let args = [params.content, params.title, params.indent, params.ref_article_id, params.sortno, params.bbs_id, params.article_id];

    return db.query(sql, args).catch(err => err);
}

const updateDynamicArticle = async (params, article_id) => {
    let sql = `UPDATE ARTICLE SET ? where article_id=${escape(article_id)}`;
    return db.query(sql, params).catch(err => err);
}

export default ({
    findArticleById,
    insertArticle,
    updateArticle,
    findArticleByBbsId,
    updateDynamicArticle,
    deleteArticleById
})