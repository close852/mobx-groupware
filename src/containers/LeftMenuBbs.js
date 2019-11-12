import React, { Fragment } from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
// import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
//tree-util 이걸로 해결 할 수 있을지도 모름.
import Button from '@material-ui/core/Button';
function LeftMenuBbs({ history }) {

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
        writeMenu: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center'
        },
        button: {
            width: '100%',
            margin: theme.spacing(1),
        },
    }));

    const WriteMenu = {
        menuGroup: "App",
        menuId: "qweasdasdasd0",
        menuName: "게시글작성",
        sortno: 1,
        link: '/article',
        divider: 'N'
    }
    const menus = [
        {
            menuGroup: "App",
            menuId: "qweasdasdasd1",
            menuName: "공지사항",
            sortno: 1,
            link: '/bbs/list?bbs_id=1',
            divider: 'N'
        },
        {
            menuGroup: "App",
            menuId: "test2",
            menuName: "자유게시판",
            divider: 'N',
            link: '/bbs/list?bbs_id=2',

        }
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
            >
                <div className={classes.toolbar} />
                <List>
                    <div className={classes.writeMenu}>
                        <Button variant="contained" color="secondary" size="large" className={classes.button} onClick={() => { history.push(WriteMenu.link) }}>
                            {WriteMenu.menuName}
                        </Button>
                    </div>
                    {menus.map((menu, index) => (
                        <div>
                            {menu.divider === "N" &&
                                <ListItem button key={menu.menuId} onClick={() => { history.push(menu.link) }}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={menu.menuName} />
                                </ListItem>
                            }
                        </div>
                    ))}
                </List>
            </Drawer>
        </Fragment>
    )
}

export default LeftMenuBbs
