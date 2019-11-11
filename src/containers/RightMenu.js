import React, { Fragment } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AccountCircle from '@material-ui/icons/AccountCircle';

function RightMenu({ history }) {

    const drawerWidth = 240;
    const useStyles = makeStyles(theme => ({
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        toolbar: theme.mixins.toolbar,
        nested: {
            paddingLeft: theme.spacing(4),
        },

    }));

    // const [open, setOpen] = React.useState(true);
    const [open2, setOpen2] = React.useState(true);

    // function handleClick() {
    //     setOpen(!open);
    // }
    function handleClick2() {
        setOpen2(!open2);
    }

    const menus = [
        {
            menuGroup: "TopMenu",
            menuId: "menu1",
            menuName: "전자결재",
            sortno: 1,
            link: '/app/todolist',
            default: '',
            count: 1
        },
        {
            menuGroup: "TopMenu",
            menuId: "menu2",
            menuName: "게시판",
            sortno: 1,
            link: '/bbs/list',//default 설정
            default: '?bbs_id=1',
            count: 2
        },
        {
            menuGroup: "TopMenu",
            menuId: "menu3",
            menuName: "대화함",
            sortno: 1,
            default: '',
            link: '/chatbox/list',
            count: 2
        },
    ]


    const classes = useStyles();

    return (
        <Fragment>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="right"
            >
                <div className={classes.toolbar} />
                <List>
                    {menus.map((menu, index) => (
                        <ListItem button key={menu.menuId} onClick={() => { history.push(menu.link + '' + menu.default) }}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={menu.menuName} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                {['강가을', '강민준', '김서준', '김현준', '나예준', '도주원', '박민재', '변현제', '신길동', '이시우', '주지호', '최준서', '최준우', '황하리'].map((text, index) => (
                    <div>
                        <ListItem button key={text} onClick={handleClick2}>
                            <ListItemIcon><AccountCircle /> </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </div>
                ))}
            </Drawer>
        </Fragment>
    )
}

export default RightMenu
