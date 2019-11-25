import React, { useState, useEffect, useCallback } from 'react';
import AppButton from './AppButton';
import { makeStyles } from '@material-ui/core/styles';
import MWEditor from 'components/editor/MWEditor'
import queryString from 'query-string'
import { AppContent } from '.';
function AppView({ history, location, match }) {
    const [content, setContent] = useState('test123123 <editor/>222');
    let editMode = true;
    const initEditor = "test";
    console.log('content >>', content)
    const [formId, setFormId] = useState('')
    const [appId, setAppId] = useState('')
    const [appLine, setAppLine] = useState([])

    // const repalceEditor = useCallback(() => {
    //     return content.replace('<editor/>',<MWEditor mode={editMode} content={initEditor} setContent={setContent}/>);
    // }, [content, editMode]);  // ✅ 콜백 deps는 OK

    useEffect(() => {
        if (location.search) {
            const query = queryString.parse(location.search);
            console.log('location,match>> ', query)
            setFormId(query.formid)
            setAppId(query.appid)
        }
    }, [location, match]); // ✅ 이펙트의 deps는 OK

    const drawerWidth = 240;
    const useStyles = makeStyles(theme => ({
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
            backgroundColor: 'white',
            border: '1px solid #e5e5e5',
        },
        content: {
            width: '700px',
            minHeight: '1200px',
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
    }));
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <AppButton appLine={appLine} setAppLine={setAppLine} />
                <div className={classes.content}>
                    <AppContent formId={formId} appId={appId} history={history} location={location} match={match} />
                </div>
            </div>
        </div>
    );
}

export default AppView;