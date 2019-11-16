import React, { useState, useCallback  } from 'react'
import MWEditor from 'components/editor/MWEditor'
import MWFileReader from 'components/file/MWFileReader'
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import {AppLine, AppDate} from 'containers/app'
import axios from 'axios'
import Grid from '@material-ui/core/Grid';
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
    MuiPickersUtilsProvider,
    DatePicker
} from '@material-ui/pickers';
import {FormControl, Select, InputLabel} from '@material-ui/core';

moment.locale("ko"); // it is required to select default locale manually

//https://rinae.dev/posts/a-complete-guide-to-useeffect-ko
//https://material-ui-pickers.dev/demo/datepicker
function WorkForm({ history, location, match, appId }) {

    const [locale, setLocale] = useState("ko");

    console.log('moment().format() > ',moment().format() )
    console.log('match.params.id', match.params.id)
    const [selectedStrDate, setSelectedStrDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());

    const [articleId, setArticleId] = useState('');
    const [attCode, setAttCode] = useState('');
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

    const handleAttCode =e=>{
        setAttCode(e.target.value);
    }
    const drawerWidth = 240;
    const handleDateStrChange = date => {
        setSelectedStrDate(date);
      };
      const handleDateEndChange = date => {
        setSelectedEndDate(date);
      };

      
    const changeBbsId = (e) => {
        setBbsId(e.target.value)
    }
    const useStyles = makeStyles(theme => ({
        // label: {
        //     backgroundColor:'white'
        // },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
          },
        
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
                            label="기안일"
                            value={deptName}
                            className={classes.textFieldInput}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />&nbsp;

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
                        <div>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel htmlFor="attCode" style={{ backgroundColor: 'white' }}>근태분류</InputLabel>
                                <Select
                                native
                                value={attCode} 
                                onChange={handleAttCode}
                                inputProps={{
                                    name: 'attCode',
                                    id: 'attCode',
                                }}
                                >
                                    <option value="" />
                                    <option value={10}>연차</option>
                                    <option value={20}>반차</option>
                                    <option value={30}>특근</option>
                                    <option value={30}>교육</option>
                                </Select>
                            </FormControl>
                            
                            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={locale}>
                                    <DatePicker
                                        autoOk
                                        margin="normal"
                                        id="strDate"
                                        name="strDate"
                                        inputVariant="outlined"
                                        label="시작일"
                                        format="YYYY-MM-DD"
                                        value={selectedStrDate}
                                        onChange={handleDateStrChange}
                                        style={{
                                            width:'150px',
                                            textAlign:'center'
                                        }}

                                    />&nbsp;
                                    <DatePicker
                                        autoOk
                                        margin="normal"
                                        id="endDate"
                                        name="endDate"
                                        inputVariant="outlined"
                                        label="종료일"
                                        format="YYYY-MM-DD"
                                        value={selectedEndDate}
                                        onChange={handleDateEndChange}
                                        style={{
                                            width:'150px',
                                            textAlign:'center',
                                        }}
                                    />

                            </MuiPickersUtilsProvider>

                        </div>                        
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

export default WorkForm
