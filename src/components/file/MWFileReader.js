
import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

import MWDialog from 'containers/MWDialog';
//예제
//https://medium.com/@habibmahbub/basic-file-reader-with-react-js-80bf48d574da
//https://dotnetthoughts.net/how-to-upload-multiple-files-with-html5-and-jquery/
function MWFileReader({ accept, capture, multiple, fileQueue }) {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOk = () => {
        console.log('handleOk >>')
        setOpen(false);
    }


    const useStyles = makeStyles(theme => ({
        root: {
            width: '100%',
            height: '100%'
        },
        body: {
            marginLeft: '10px'
        }
    }));
    const classes = useStyles();

    const getFileUnit = (size) => {
        const sizeStr = ['Byte', 'KB', 'MB', 'GB', 'TB'];

        for (let i = 0; i < sizeStr.length; i++) {
            let cost = Math.pow(1024, (i + 1));
            if (size < cost) {
                // console.log('cost > ', cost, size);
                return ((size / (Math.pow(1024, i))).toFixed(2)).replace(".00", "") + sizeStr[i];
            }
            // break;
        }
    }

    const fileQueueMap = fileQueue.map(file => (
        <div key={file.name} >
            <Link href={"http://127.0.0.1:4000/download/" + file.fileId}>{file.name} ({getFileUnit(file.size)}) </Link><span onClick={handleClickOpen}>X</span>
        </div>
    ))

    //1.더할때, 파일 빼기 목록에서 지우고, 더한다. 2. 뺄때, 빼기목록에 추가
    //3. 업로드시, 빼기목록에 없는 애들만 넘김
    return (
        <div class={classes.root}>
            첨부파일
            <div className={classes.body}>
                {fileQueueMap}
            </div>
            <MWDialog open={open} handleClose={handleClose} handleOk={handleOk} />
        </div>
    );
}

export default MWFileReader;