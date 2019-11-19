
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
//예제
//https://medium.com/@habibmahbub/basic-file-reader-with-react-js-80bf48d574da
//https://dotnetthoughts.net/how-to-upload-multiple-files-with-html5-and-jquery/
function MWFileReader({ accept, capture, multiple, fileQueue, setFileQueue }) {
    const useStyles = makeStyles(theme => ({
        root: {
            display: 'flex',
            width: '100%',
            height: '100%'
        },
    }));
    const classes = useStyles();

    const styles = {

    }

    const fileQueueMap = fileQueue.map(file => (
        <div key={file.name} >
            {"링크링크"}
        </div>
    ))

    //1.더할때, 파일 빼기 목록에서 지우고, 더한다. 2. 뺄때, 빼기목록에 추가
    //3. 업로드시, 빼기목록에 없는 애들만 넘김
    return (
        <div class={classes.root}>
            {fileQueueMap}asdasd
        </div>
    );
}

export default MWFileReader;