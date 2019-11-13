import React from 'react';
import AppButton from './AppButton';
import { makeStyles } from '@material-ui/core/styles';

function AppView({ location }) {
    const content = '';
    // async componentDidMount() {
    //     console.log('query', this.query)
    //     const result = await axios.get(`/api/app?formid=${this.query.formid}&appid=${this.query.appid}`)
    //         .then(res => res.data)
    //         .catch(e => e.response.data);
    //     // this.content = result.data.content;
    //     if (result.error) {
    //         alert(result.error);
    //     } else {
    //         console.log(result, result.query, result.content);
    //         this.setState({
    //             content: result.content
    //         })
    //     }
    // }
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

    // const { classes } = this;
    console.log('content', content);

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <AppButton />
                <div className={classes.content}>
                    <div id="appContent" dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        </div>
    );
}

export default AppView;