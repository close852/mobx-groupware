import express from 'express';
import formidable from 'formidable';
import fileDAO from '../models/fileDAO'

import fs from 'fs'
import mime from 'mime'

import { fileUpload } from '../utils/fileUtils'
import { uuid } from '../utils/uuidUtils'

const router = express.Router();
router.get('/download/:fileid', (req, res) => {
    const { fileid } = req.params;
    console.log('filedownload', fileid);

    //파일을 보관할 Table 생성
    //필요한 정보 : fileId, filename, filepath, filesize,sortno 
    let fileData = fileDAO.findByFileId(fileid);

    fileData.then(data => {
        // console.log('fileData.file_name', data, data[0])
        const filename = encodeURIComponent(data[0].FILE_NAME);
        let filepath = data[0].FILEPATH;
        // let type = data[0].TYPE;
        let mimeType = mime.lookup(filename);
        // if (type !== "IAMGE") {
        console.log('mimeType > ', mimeType)
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-Type', mimeType);
        // }

        fs.createReadStream(filepath).pipe(res);
    }).catch(err => {
        console.log('err ', err.code, err)
    })
})

// router.post('/upload', (req, res) => {
//     console.log('fileupload');
//     res.json({ data: 'upload' })
// })

router.post('/upload', (req, res) => {
    //fileUpload(file, group, type, refid, sortno)
    var form = formidable.IncomingForm();
    // form.multiples = true;
    form.encoding = "utf-8";
    form.parse(req, async (err, fields, files) => {
        let {
            group,
            type,
            refid,
            sortno
        } = fields;
        if (!refid) {
            refid = uuid();
        }
        console.log('fields > ', fields, 'files.len', files.upload, files, 'files.upload >> ', files.upload.length);
        let fileid;
        if (files.upload) {
            const file = files.upload;
            fileid = fileUpload(file, group, type, refid, sortno);
        }

        const url = 'http://127.0.0.1:3000/download/' + fileid;
        console.log(`post : url`, url, '여기온거맞지??');
        res.json({
            url
        })
    })
})

export default router;