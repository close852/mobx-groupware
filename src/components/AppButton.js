import React from 'react'
import { Button } from '@material-ui/core';

function AppButton() {
    return (
        <div id="appButton" style={{width:"700px",backgroundColor:"#ffcc00",padding:"1px" }}>
            <Button style={{border:"1px solid black"}} size="small">임시저장</Button>
            <Button style={{border:"1px solid black"}} size="small">결재선</Button>
            <Button style={{border:"1px solid black", backgroundColor:"gray", color:"white"}} size="small">상신</Button>
            <Button style={{border:"1px solid black", align:"right"}} size="small">미리보기</Button>
        </div>
    )
}

export default AppButton
