import React, { useState } from 'react'
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppLineSelect from 'containers/app/AppLineSelect'
function AppButton({ appLine, setAppLine }) {
    const useStyles = makeStyles(theme => ({
        root: {
            width: `100%`,
            // align: 'center',
            backgroundColor: "#ffcc00"
        },
    }));
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const handleAppLine = () => {
        setOpen(true)
    }
    const classes = useStyles();
    return (
        //style={{width:"700px",backgroundColor:"#ffcc00",padding:"1px" }}
        <div id="appButton" className={classes.root}>
            <Button style={{ border: "1px solid black" }} size="small">임시저장</Button>
            <Button style={{ border: "1px solid black" }} size="small" onClick={handleAppLine}>결재선</Button>
            <Button style={{ border: "1px solid black" }} size="small">수신처지정</Button>
            <Button style={{ border: "1px solid black", backgroundColor: "gray", color: "white" }} size="small">상신</Button>
            <Button style={{ border: "1px solid black", align: "right" }} size="small">미리보기</Button>
            <AppLineSelect open={open} handleClose={handleClose} />
        </div>
    )
}

export default AppButton
