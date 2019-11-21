import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function MWDialog({ open, handleClose, handleOk, title, content, okLabel, closeLabel }) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {content}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        {closeLabel}
                    </Button>
                    <Button onClick={handleOk} color="primary" >
                        {okLabel}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
MWDialog.defaultProps = {
    title: 'Alert',
    content: '첨부파일을 삭제하시겠습니까?',
    okLabel: '삭제',
    closeLabel: '닫기'
}