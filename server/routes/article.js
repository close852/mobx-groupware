import express from 'express'
import fs from 'fs'
import articleDAO from '../models/articleDAO'
import {
    requireRole
} from '../utils/roleUtils'

import formidable from 'formidable';
import pathUtil from 'path';

var uploadDir = __dirname + '/upload';
var imageDir = __dirname + '/image';
var publicDir = 'public/temp'
// 업로드 된 데이터 목록
var paintList = [];
const encode = "utf-8";

const router = express.Router();

/**
 * 게시글 조회
 */
router.get('/:id', async (req, res) => {
    const {
        id
    } = req.params;
    const result = await articleDAO.findArticleById(id);
    return res.send(result)
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

    var form = formidable.IncomingForm();
    form.multiples = true;
    form.encoding = encode;
    form.parse(req, async (err, fields, files) => {
        // const { bbs_id, writer, dept_id, title, content } = fields;

        console.log('req.body > ', req.body, req.params)
        const idx = 1;
        const result = await articleDAO.insertArticle(fields);
        if (files.upload) {
            console.log('여기안옴', files.upload.length)
            let uploadList = files.upload;
            uploadList.forEach(async (file, idx, arr) => {
                var title = file.name;
                let real_path = file.path;
                let size = file.size;
                var date = new Date();
                var newImageName = date.getTime();
                var ext = pathUtil.parse(title).ext;
                console.log(title, real_path, size, ext);
                var newPath = publicDir + '/' + newImageName + ext;
                console.log(real_path, 'newPath ', newPath)
                console.log('--------fs.renameSync-------')
                await fs.rename(real_path, newPath, (err, data) => {
                    if (err) {
                        console.log('err.code !!!!', err.code)
                        if (err.code === 'EXDEV') {
                            copy_and_delete(real_path, newPath);
                        }
                    }
                });
                const url = 'http://127.0.0.1:3000/temp/' + newImageName + ext;
                console.log(`post : url`, url, '여기온거맞지??');
            })
        }
        const data = {
            nexturl: fields.nexturl,
            result: result
        }
        res.send(data)
    })

})
/**
 * 게시글 수정
 */
router.put('/:id', async (req, res) => {
    var form = formidable.IncomingForm();
    form.multiples = true;
    form.encoding = encode;
    form.parse(req, async (err, fields, files) => {

        console.log('fields', fields)
        console.log('req.body > ', req.body, req.params)
        if (files.upload) {
            console.log('여기안옴', files.upload.length)
            let uploadList = files.upload;
            uploadList.forEach(async (file, idx, arr) => {
                var title = file.name;
                let real_path = file.path;
                let size = file.size;
                var date = new Date();
                var newImageName = date.getTime();
                var ext = pathUtil.parse(title).ext;
                console.log(title, real_path, size, ext);
                var newPath = publicDir + '/' + newImageName + ext;
                console.log(real_path, 'newPath ', newPath)
                console.log('--------fs.renameSync-------')
                await fs.rename(real_path, newPath, (err, data) => {
                    if (err) {
                        console.log('err.code !!!!', err.code)
                        if (err.code === 'EXDEV') {
                            copy_and_delete(real_path, newPath);
                        }
                    }
                });
                const url = 'http://127.0.0.1:3000/temp/' + newImageName + ext;
                console.log(`post : url`, url, '여기온거맞지??');
            })
        }
        const result = await articleDAO.updateArticle(fields);
        const data = {
            nexturl: fields.nexturl,
            result: result
        }
        res.send(data)
    })
    // const result = await articleDAO.updateDynamicArticle(params, id);
    return res.send('test')
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

function copy_and_delete(oldPath, newPath) {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);

    // readStream.on('error', callback);
    // writeStream.on('error', callback);
    // readStream.on('close', 
    //       function () {
    //         fs.unlink(oldPath, callback);
    //       }
    // );

    readStream.pipe(writeStream);
}


export default router;