import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import MWEditor from 'components/editor/MWEditor'
import Button from '@material-ui/core/Button';
import './ArticlePreview.css'
const useStyles = makeStyles(theme => ({
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
        display: 'flex',
        justifyContent: 'flex-end'
    },
    button: {
        margin: theme.spacing(1),
    },

}));
export default function ArticlePreview({ open, handleClose, bbsId, userName, deptName, title, content }) {
    const classes = useStyles();
    // const [open, setOpen] = React.useState(false);
    const handlePrint = (e) => {
        e.preventDefault();
        window.print();
    }
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
                <Fade in={open}>
                    <div className={classes.paper}>
                        <TextField
                            id="bbsName"
                            name="bbsName"
                            label="게시판"
                            value={bbsId}
                            className={classes.textFieldInput}
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                readOnly: true,
                            }}
                        />&nbsp;
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
                            id="deptName"
                            name="deptName"
                            label="부서명"
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
                                label="제목"
                                value={title}
                                className={classes.title}
                                margin="normal"
                                variant="outlined"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />&nbsp;
                        </div>
                        <div id="preview_editor" className={classes.editor}>
                            <MWEditor mode={false} content={content} />
                        </div>
                        <div class={classes.btnInc}>
                            <Button variant="contained" color="default" className={classes.button} onClick={handlePrint}>인쇄</Button>
                            <Button variant="contained" color="default" className={classes.button} onClick={handleClose}>닫기</Button>
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
