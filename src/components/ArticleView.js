import React, { useState, useEffect, useCallback, Fragment } from 'react'
import MWEditor from 'components/editor/MWEditor'
import MWFileUpload from 'components/file/MWFileUpload'
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'
//https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
function ArticleView({ history, location, match }) {


    console.log('match.params.id', match.params.id)
    const [bbsList, setBbsList] = useState([]);
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

    useEffect(() => {
        const bbsData = getBbsFetchUrl();
        bbsData.then(res => {
            console.log('bbsData > res.data', res.data)
            setBbsList(res.data);
        })

        if (match.params.id) {
            const articleData = getArticleFetchUrl();
            articleData.then(res => {
                const article = res.data[0];
                if (article) {
                    console.log(article)
                    setArticleId(article.article_id);
                    setBbsId(article.bbs_id);

                    setTitle(article.title);
                    setContent(article.content);

                    setUserId(article.user_id);
                    setUserName(article.username);
                    setDeptId(article.dept_id);
                    setDeptName(article.deptname);
                } else {
                    // setBbsId(article.bbs_id);
                    initForms();
                }
            })
        } else {
            initForms();
        }
        // ... 데이터를 불러와서 무언가를 한다 ...
    }, [getArticleFetchUrl, getBbsFetchUrl, location.search, match.params.id]); // ✅ 이펙트의 deps는 OK

    const initForms = () => {
        setArticleId('');
        setBbsId('');

        setTitle('');
        setContent('');

        setUserId('2');
        setUserName('mwuser123');
        setDeptId('DEPT01');
        setDeptName('개발');
        setEditMode(true);
    }
    // FORM DATA

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
            height: '100%',
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

        if (validate()) {
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
                console.log(res, res.data)
                if (res.data) {
                    history.push(res.data.nexturl);
                }
            });
    }
    const handleModify = (e) => {
        console.log('handleModify eeee > ', e)
        e.preventDefault();

        if (validate()) {
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

    const validate = () => {
        if (bbsId) {
            return true;
        }

        return true;
    }
    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <form id="bbsForm" name="bbsForm" onSubmit={handleSubmit} >
                    <input type="hidden" id="nexturl" name="nexturl" value={`/bbs/list/${bbsId}`} />
                    <input type="hidden" id="article_id" name="article_id" value={articleId} />
                    <input type="hidden" id="user_id" name="user_id" value={userId} />
                    <input type="hidden" id="dept_id" name="dept_id" value={deptId} />
                    <input type="hidden" id="content" name="content" value={content} />

                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="bbs-select" style={{ backgroundColor: 'white' }}>
                                게시판
                            </InputLabel>
                            <Select
                                native
                                value={bbsId}
                                onChange={changeBbsId}
                                disabled={!editMode}
                                // labelWidth={labelWidth}
                                inputProps={{
                                    name: 'bbs-select',
                                    id: 'bbs-select',
                                }}

                            >
                                <option value="" />
                                {
                                    bbsList.map(bbs => (
                                        <option value={bbs.bbs_id}>{bbs.bbsname}</option>
                                    ))
                                }
                            </Select>
                            <FormHelperText id="my-helper-text" style={{ display: 'none' }}>test</FormHelperText>
                        </FormControl>
                        <TextField
                            id="writerDisp"
                            name="writerDisp"
                            label="게시자"
                            value={userName}
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
                            label="부서명"
                            value={deptName}
                            className={classes.textFieldInput}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />
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
                    <div id="fileAttach" className={classes.fileattach}>
                        <MWFileUpload fileQueue={fileQueue} setFileQueue={setFileQueue} />
                    </div>
                    <div id="_editor" className={classes.editor}>
                        <MWEditor mode={editMode} content={content} setContent={setContent} />
                    </div>
                    <div className={classes.buttonInc}>
                        {(editMode && articleId) &&
                            <Button variant="contained" type="submit" color="secondary" className={classes.button} onClick={handleModify}>수정</Button>
                        }
                        {(editMode && !articleId) &&
                            <Fragment>
                                <Button variant="contained" type="submit" color="default" className={classes.button} onClick={handlePreview}>미리보기</Button>
                                <Button variant="contained" type="submit" color="default" className={classes.button} onClick={handleTempSave}>임시저장</Button>
                                <Button variant="contained" type="submit" color="secondary" className={classes.button} >글쓰기</Button>
                            </Fragment>
                        }
                        {!editMode &&
                            <Fragment>
                                <Button variant="contained" type="submit" color="secondary" className={classes.button} onClick={() => { setEditMode(true) }}>수정</Button>
                                <Button variant="contained" type="submit" color="default" className={classes.button} onClick={handleDelete}>삭제</Button>
                            </Fragment>
                        }
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ArticleView
