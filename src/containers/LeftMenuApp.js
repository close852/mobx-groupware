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
import Collapse from '@material-ui/core/Collapse';
import StarBorder from '@material-ui/icons/StarBorder';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
//tree-util 이걸로 해결 할 수 있을지도 모름.

function LeftMenu({ history }) {

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
            menuGroup: "App",
            menuId: "qweasdasdasd0",
            menuName: "문서작성",
            sortno: 1,
            link: '/app/forms',
            divider: 'N'
        },
        {
            menuGroup: "App",
            menuId: "qweasdasdasd1",
            menuName: "미결함",
            sortno: 1,
            link: '/app/todolist',
            divider: 'N'
        },
        {
            menuGroup: "App",
            menuId: "qweasdasdasd2",
            menuName: "진행함",
            sortno: 1,
            link: '/app/processlist',
            count: 2,
            divider: 'N'
        },
        {
            menuGroup: "App",
            menuId: "qweasdasdasd3",
            menuName: "완료함",
            sortno: 1,
            link: '/app/endlist',
            count: 2,
            divider: 'N'
        },
        {
            divider: 'Y'
        },
        {
            menuGroup: "App",
            menuId: "test2",
            menuName: "테스트",
            divider: 'N',
            children: {
                menuGroup: "App",
                menuId: "test21",
                menuName: "테스트2",
                divider: 'N',
            }
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
                    {menus.map((menu, index) => (
                        <div>
                            {menu.divider === "Y" && <Divider />}
                            {menu.divider === "N" &&
                                <ListItem button key={menu.menuId} onClick={() => { history.push(menu.link) }}>
                                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                    <ListItemText primary={menu.menuName} />
                                </ListItem>
                            }
                            {menu.children !== undefined &&
                                <div>
                                    <Collapse in={true} >
                                        <List component="div" disablePadding>
                                            <ListItem button className={classes.nested} key={menu.children.menuId} onClick={() => { history.push(menu.link) }}>
                                                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                                                <ListItemText primary={menu.children.menuName} />
                                            </ListItem>
                                        </List>
                                    </Collapse>
                                </div>}
                        </div>
                    ))}
                </List>
                {['보관함'].map((text, index) => (
                    <div>
                        <ListItem button key={text} onClick={handleClick2}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                            {open2 ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={open2} >
                            <List component="div" disablePadding>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary="운영부문" />
                                </ListItem>
                                <ListItem button className={classes.nested}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary="고객지원팀" />
                                </ListItem>
                            </List>
                        </Collapse>
                    </div>
                ))}
                {['접수함'].map((text, index) => (
                    <div>
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    </div>
                ))}
            </Drawer>
        </Fragment>
    )
}

export default LeftMenu
