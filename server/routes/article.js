import express from 'express'
import articleDAO from '../models/articleDAO'
import {
    requireRole
} from '../utils/roleUtils'

const router = express.Router();

/**
 * 게시글 조회
 */
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const result = await articleDAO.findArticleById(id);
    return res.json({
        data: result
    })
})


//게시판 조회
router.get('/', async (req, res) => {
    const {
        // orderBy,
        // sortType,
        // pageSize,
        // page,
        bbs_id
    } = req.query;
    console.log('req.params >>>>> ', req.query, req.body)
    // const paging = {
    //     orderBy,
    //     sortType,
    //     startWith: (Number(page) - 1) * pageSize,
    //     pageSize: pageSize?pageSize:'0'
    // }
    console.log('req.query > ', paging(req.query), req.query)
    const result = await articleDAO.findArticleByBbsId(bbs_id);
    return res.send(result)
})



/**
 * 게시글 조회
 */
router.delete('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const result = await articleDAO.deleteArticleById(id);
    return res.json({
        data: result
    })
})

/**
 * 게시글 등록
 */
router.post('/', async (req, res) => {
    const {
        title,
        content,
        bbsId,
        userId
    } = req.body;

    const { // /:id
    } = req.params;
    console.log('req.body > ', req.body)
    const idx = 1;
    const result = await articleDAO.insertArticle(title, content, bbsId, userId);
    return res.json({
        data: result
    })
})
/**
 * 게시글 수정
 */
router.put('/:id', async (req, res) => {
    const {
        title,
        content,
        user_id,
        indent,
        ref_article_id,
        sortno,
        bbs_id,
        article_id
    } = req.body;

    const { // /:id
        id
    } = req.params;

    const params = {
        title,
        content,
        bbs_id,
        user_id,
        indent,
        ref_article_id,
        sortno
    };

    const result = await articleDAO.updateDynamicArticle(params, id);
    return res.json({
        data: result
    })
})

const paging = ({ orderBy, sortType, page, pageSize, startWith }) => {
    page = page ? page : 1;
    pageSize = pageSize ? pageSize : 10;
    console.log('page', page);
    return {
        orderBy,
        sortType,
        pageSize,
        startWith: (Number(page) - 1) * pageSize,
    }
}

export default router;