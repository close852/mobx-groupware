import React, { useState, Fragment } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
// import NotificationsIcon from '@material-ui/icons/Notifications';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { IconButton, InputBase, Menu, MenuItem } from '@material-ui/core';



function Header({ auth, history }) {

    const [keyword] = useState(null);
    const menuName = '메인화면';
    const useStyles = makeStyles(theme => ({

        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
            fontWeight: 'bold'
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200,
                },
            },
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            backgroundColor: '#ffcc00',
            color: 'black',
        },

    }));


    const handleEnter = (event) => {
        // setKeyword(event.currentTarget.value);
        if (event.key === 'Enter') {
            console.log('event.key', event.key, event.currentTarget.value);
        }
    }

    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);


    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
            <MenuItem onClick={handleLogin} >Sign In</MenuItem>
            <MenuItem onClick={handleSignUp} >Sign Up</MenuItem>
            <MenuItem onClick={handleLogout} >Sign out</MenuItem>
        </Menu>
    );

    function handleLogin() {
        console.log(history);
        history.push('/signin');
        handleMenuClose();
    }
    function handleLogout() {
        history.push('/logout')
        handleMenuClose();
    }
    function handleSignUp() {
        history.push('/signup')
        handleMenuClose();
    }
    function handleProfileMenuOpen(event) {
        setAnchorEl(event.currentTarget);
    }
    function handleMenuClose() {
        setAnchorEl(null);
    }

    return (
        <Fragment >
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    {/* 메뉴 트리 */}
                    {/*
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
                        <MenuIcon />
                    </IconButton>
                    */}
                    {/* 메뉴 이름 */}
                    <Typography variant="h6" className={classes.title}>
                        {menuName}
                    </Typography>
                    {/* 검색기능 */}
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            value={keyword}
                            onKeyDown={handleEnter}
                        />
                    </div>
                    {/* 사용자 정보 */}
                    <IconButton
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        onClick={handleProfileMenuOpen}
                        color="inherit"
                    >
                        <AccountCircle />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Fragment>
    );
}

export default Header
