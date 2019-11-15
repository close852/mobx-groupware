import fs from 'fs'
import fileDAO from '../models/fileDAO'
import { uuid } from './uuidUtils'
const publicDir = 'public/repository'


export function fileUpload(file, group, type, refid, sortno) {

    var newPath = publicDir;
    if (group === "ARTICLE") {
        newPath += "/article";
    } else {
        group = "DEFAULT";
        newPath += "/default";
    }

    if (type === "content") {
        newPath += "content";
    } else if (type === "etc") {
        newPath += "/etc";
    } else if (type === "IAMGE") {
        newPath += "/etc";
    } else {
        newPath += "/file";
    }

    // /yyyy/mm/dd
    var date = new Date();
    date.setHours(date.getHours() + 9);
    // console.log('curr_date > ', date);
    newPath += "/" + date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
    // console.log('newPath > ', newPath)
    recursiveMkdir(newPath);

    var filename = file.name;
    let oriFilepath = file.path;
    let newName = date.getTime();

    let filepath = newPath + '/' + newName;
    filepath += newName;
    let filesize = file.size;
    console.log('--------fs.renameSync-------')

    fileCopy(oriFilepath, filepath);
    const fileid = uuid();
    const fileData = {
        fileid,
        refid,
        filename,
        filepath,
        filesize,
        sortno,
        type
    }
    console.log('fileDAO.insertFile > ');
    const data = fileDAO.insertFile(fileData);
    console.log('data', data)
    // fs.rename(real_path, newPath + '/' + newName, (err, data) => {
    //     if (err) {
    //         console.log('err.code !!!!', err.code)
    //         if (err.code === 'EXDEV') {
    //         }
    //     }
    // });
    return fileid;
}
//copy & delete
function fileCopy(oldPath, newPath) {
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

const recursiveMkdir = (path) => {
    const pathArr = path.split('/');
    let addPath = "";
    pathArr.forEach((value, idx, arr) => {
        addPath += value + '/';
        try {
            fs.statSync(addPath);
        } catch (err) {
            fs.mkdirSync(addPath);
        }
    });
}