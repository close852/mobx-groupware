import React, { useState, useEffect, useCallback } from 'react';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import Backdrop from '@material-ui/core/Backdrop';

import { makeStyles } from '@material-ui/core/styles';
import { textAlign } from '@material-ui/system';

import SearchBar from 'containers/SearchBar'
import axios from 'axios'
const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '700px',
        // height: '100%',
        minHeight: '700px'
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        width: '700px',
        // height: '100%',
        minHeight: '700px'
    },
    textFieldInput: {
        width: '150px',
    },
    title: {
        width: '100%',
    },
    btnInc: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    actionBtn: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

    },
    button: {
        margin: theme.spacing(1),
    },
    leftMenu: {
        width: '500px',
        height: '100%',
    },
    rightMenu: {
        width: '500px',
        height: '100%',
        border: '1px solid darkgray',
    },
    body: {
        display: 'flex',
        height: '700px',
    },
    deptClass: {
        height: '50%',
        border: '1px solid darkgray',
        marginBottom: '2px',
    },
    userClass: {
        height: '50%',
        border: '1px solid darkgray',
    },
    search: {
        width: '100%',
        height: '50px',
        textAlign: 'center',
        border: '1px solid darkgray',
        marginBottom: '2px',
    },
    lineStyle: {
        width: '100%',
        display: 'flex',
    },
    lineItem5: {
        width: '5%'
    },
    lineItem10: {
        width: '10%'
    },
    lineItem15: {
        width: '15%'
    },
    lineItem20: {
        width: '20%'
    },
    lineItem25: {
        width: '25%'
    },
}));

export default function AppLineSelect({ open, handleClose, appLine, setAppLine }) {
    // 사용자 선택
    // 버튼 액션(추가,삭제)
    const classes = useStyles();
    const [deptId, setDeptId] = useState('DEPT01');
    const [userId, setUserId] = useState('');
    const [deptData, setDeptData] = useState([]);
    const [userData, setUserData] = useState([]);
    const [lineData, setLineData] = useState([]);
    const [srchTarget, setSrchTarget] = useState('username');
    const [keyword, setKeyword] = useState('');


    // const getArticleFetchUrl = useCallback(() => {
    //     return axios.get(`/api/article/${match.params.id}`);
    // }, [match.params.id]);  // ✅ 콜백 deps는 OK

    const getDeptData = useCallback(() => {
        return axios.get(`/api/dept/`);
    }, []);
    const getUserData = useCallback(() => {
        return axios.get(`/api/dept/user/${deptId}`);
    }, [deptId]);

    useEffect(() => {
        const dData = getDeptData();
        dData.then(res => {
            console.log('dData >', res)
            setDeptData(res.data);
        })
    }, [getDeptData]);

    useEffect(() => {
        const uData = getUserData();
        uData.then(res => {
            console.log('uData >', res)
            setUserData(res.data);
        })

    }, [getUserData]);
    useEffect(() => {
        console.log('appLine', appLine);
        if (appLine && appLine.length > 0) {
            setLineData(...appLine)
        }
    }, [appLine]);

    const dragOverUserHandler = (e) => {
        console.log('dragOverUserHandler', e.target)
        e.preventDefault();
        //grabbing
    }
    const dragOverOrgHandler = (e) => {
        console.log('dragOverOrgHandler', e.target)
        e.preventDefault();
        //grabbing
    }

    const dragOverLineHandler = (e) => {
        e.dataTransfer.dropEffect = "move"
        console.log('dragOverLineHandler', e.currentTarget)
        // console.log('data >>> ', data)
        e.preventDefault();
        // e.target.appendChild(data);
        //grabbing
    }
    const dropHandler = (e) => {
        let data = e.dataTransfer.getData("userInfo");
        const jsonInfo = JSON.parse(data);
        console.log('dropHandler', data, JSON.parse(data))

        setLineData([...lineData, jsonInfo])
        e.preventDefault();
    }

    const dragUserData = (e) => {
        // e.preventDefault();
        console.log('dragUserData >', e.target.dataset.info)
        e.dataTransfer.setData('userInfo', e.target.dataset.info)
    }
    const deptDataMap = deptData.map(dept => (
        <div draggable={"true"} id={dept.dept_id} data-id={"123"} data-detail="123">
            <input type="checkbox" id={"chk" + dept.dept_id} value="1" />
            {dept.deptname}
        </div>
    ))
    const userDataMap = userData.map(user => (
        <div draggable={"true"} id={user.user_id} onDragOver={dragOverUserHandler} onDragStart={dragUserData}
            data-info={`{"userid":"${user.user_id}", "username":"${user.username}", "deptid":"${user.dept_id}", "deptname":"${user.deptname}"}`}>
            <input type="checkbox" id={"chk"} value="1" />
            {user.username}
        </div>
    ))

    const lineDataMap = lineData.map(info => (
        <div className={classes.lineStyle}>
            <div className={classes.lineItem5}><input type="checkbox" value={info.userid} /></div>
            <div className={classes.lineItem25}>결재/합의</div>
            <div className={classes.lineItem25}>{info.username}</div>
            <div className={classes.lineItem25}>{info.deptname}</div>
            <div className={classes.lineItem15}>대기</div>
            <div className={classes.lineItem5}>▤</div>
        </div>
    ));

    return (
        <div>
            <Modal
                // aria-labelledby="transition-modal-title"
                // aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className={classes.root}>
                    <div className={classes.search}><SearchBar srchTarget={srchTarget} setSrchTarget={setSrchTarget} keyword={keyword} setKeyword={setKeyword} /></div>
                    <div className={classes.body}>
                        <div className={classes.leftMenu}>
                            <div className={classes.deptClass} onDragOver={dragOverOrgHandler}>
                                조직도
                                {deptDataMap}
                            </div>
                            <div className={classes.userClass} >
                                사용자영역
                                {userDataMap}
                            </div>
                        </div>
                        <div className={classes.actionBtn}>
                            <Button>결재></Button>
                            <Button>합의></Button>
                            <Button>{"<"}삭제</Button>
                        </div>
                        <div className={classes.rightMenu} onDrop={dropHandler} onDragOver={dragOverLineHandler} >
                            오른쪽영역
                            <div>
                                {lineDataMap}
                            </div>
                        </div>
                    </div>
                    <div className={classes.btnInc}>
                        <Button>확인</Button><Button onClick={handleClose}>닫기</Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}