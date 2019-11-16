import React, { useState, useEffect, useCallback,  } from 'react'
import MWEditor from 'components/editor/MWEditor'
import MWFileReader from 'components/file/MWFileReader'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {AppLine} from 'containers/app'
import axios from 'axios'
//https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
function DraftForm({ history, location, match, appId }) {


    console.log('match.params.id', match.params.id)
    const [articleId, setArticleId] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [bbsId, setBbsId] = useState('');
    const [userId, setUserId] = useState('');
    const [userName, setUserName] = useState('');
    const [deptId, setDeptId] = useState('');
    const [deptName, setDeptName] = useState('');

    const [fileQueue, setFileQueue] = useState([]);

    const [editMode, setEditMode] = useState(false);

    const getArticleFetchUrl = useCallback(() => {
        return axios.get(`/api/article/${match.params.id}`);
    }, [match.params.id]);  // ✅ 콜백 deps는 OK

    const getBbsFetchUrl = useCallback(() => {
        return axios.get(`/api/bbs`);
    }, []);  // ✅ 콜백 deps는 OK

    
    const drawerWidth = 240;
    const changeBbsId = (e) => {
        setBbsId(e.target.value)
    }
    const useStyles = makeStyles(theme => ({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        textField: {
            width: '100%',
        },
        textFieldInput: {
            width: '150px',
        },
        button: {
            margin: theme.spacing(1),
        },
        buttonInc: {
            display: 'flex',
            justifyContent: 'flex-end'
        },
        root: {
            width: `calc(100% - ${drawerWidth}px)`,
            align: 'center',
            display: 'flex',
            'justifyContent': 'center'
        },
        body: {
            width: '700px',
            backgroundColor: 'white',
            border: '1px solid #e5e5e5',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
        editor: {
            width: '100%',
        },
        fileattach: {
            width: '100%',
            height: '100px',
        },
        formControl: {
            width: '150px',
            marginTop: theme.spacing(2),
            marginRight: '4px',
        },


    }));
    const classes = useStyles();

    //1. 본문내용 전송(기본항목, 에디터 본문)
    //2. file있다면, return 받은 articleid로 fileUpload
    const handlePreview = (e) => {
        e.preventDefault();
        console.log('handlePreview');
    }
    const handleTempSave = (e) => {
        e.preventDefault();
        console.log('handleTempSave');
    }
    const handleSubmit = (e) => {
        console.log('handleSubmit >> ')
        e.preventDefault();

        if(validate()){
            return false;
        }
        // console.log('handleSubmit',e.target);
        // console.log(data,e.target.writer,e.target.title.value);
        const data = new FormData(e.target);
        //파일추가만포함
        //더 추가되야하는것 : 수정로직에서 기존 파일,신규파일,삭제파일 구분처리 필요,
        fileQueue.forEach((value, idx, arr) => {
            data.append('upload', value);
        })
        console.log(data.entries());
        for (var pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios.post('/api/article', data)
            .then(res => {
                console.log(res,res.data)
                if (res.data) {
                    history.push(res.data.nexturl);
                }
            });
    }
    const handleModify = (e) => {
        console.log('handleModify eeee > ', e)
        e.preventDefault();

        if(validate()){
            return false;
        }


        const form = document.bbsForm;
        const data = new FormData(form);
        console.log(data.entries());
        for (var pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }

        axios.put(`/api/article/${articleId}`, data)
            .then(res => {
                console.log(res)
                if (res.data) {
                    history.push(res.data.nexturl);
                }
            });

    }
    const handleDelete = (e) => {
        console.log('handleDelete > ')
        e.preventDefault();

        axios.delete(`/api/article/${articleId}`)
            .then(res => {
                console.log(res)
                if (res.data) {
                     history.push(res.data.nexturl);
                }
            });

    }

    const validate =() => {
        if(bbsId){
            return true;
        }

        return true;
    }
    return (
        <div >
                <form id="bbsForm" name="bbsForm" onSubmit={handleSubmit} >
                    <input type="hidden" id="nexturl" name="nexturl" value={`/bbs/list/${bbsId}`} />
                    <input type="hidden" id="article_id" name="article_id" value={articleId} />
                    <input type="hidden" id="user_id" name="user_id" value={userId} />
                    <input type="hidden" id="dept_id" name="dept_id" value={deptId} />
                    <input type="hidden" id="content" name="content" value={content} />

                    <div>
                        <div>
                            <AppLine/>
                        </div>
                        <div>
                            
                        </div>
                        <TextField
                            height="50%"
                            id="writerDisp"
                            name="writerDisp"
                            label="문서번호"
                            value="asd"
                            className={classes.textFieldInput}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />&nbsp;
                        <TextField
                            id="deptDisp"
                            name="deptDisp"
                            label="기안자"
                            value={deptName}
                            className={classes.textFieldInput}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />&nbsp;  

                        <TextField
                            id="deptDisp"
                            name="deptDisp"
                            label="기안부서"
                            value={deptName}
                            className={classes.textFieldInput}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />&nbsp;
                        <TextField
                            id="deptDisp"
                            name="deptDisp"
                            label="기안일"
                            value={deptName}
                            className={classes.textFieldInput}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />&nbsp;

                        <div>
                            <TextField
                                id="title"
                                name="title"
                                label="문서제목"
                                value={title}
                                onChange={(e) => { setTitle(e.target.value); }}
                                className={classes.textField}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    readOnly: !editMode,
                                }}
                            />
                        </div>
                    </div>
                    <div id="_editor" className={classes.editor}>
                        <MWEditor mode={editMode} content={content} setContent={setContent} />
                    </div>
                    <div id="fileAttach" className={classes.fileattach}>
                        <MWFileReader fileQueue={fileQueue} setFileQueue={setFileQueue} />
                    </div>
                </form>
        </div>
    )
}

export default DraftForm
