import React from 'react';
import { Route, Switch } from 'react-router-dom'
import SampleBbsView from './components/sample/BbsView'
import CssBaseline from '@material-ui/core/CssBaseline';

import { makeStyles } from '@material-ui/core/styles';
import { Header, LeftMenu, RightMenu, Footer } from 'containers'
import { SignIn, SignUp, AppList, BbsList, FormList, AppView, BbsView, ArticleView } from 'components';
// const drawerWidth = 240;
const useStyles = makeStyles(theme => ({

  root: {
    display: 'flex',
    minHeight: '100vh',
    flexDirection: "column"
  },
  content: {
    padding: theme.spacing(2),
    marginLeft: theme.spacing(30),
    marginTop: theme.spacing(6),
  },
  toolbar: theme.mixins.toolbar,
  footer: {
    display: 'flex',
    marginTop: 'auto',
    backgroundColor: 'gray',
    marginLeft: `calc(${theme.spacing(30)})`,
    alignItems: 'center',
    height: theme.spacing(5),
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Route component={({ history }) => (<Header history={history} />)} />
      <Route component={({ history }) => (<LeftMenu history={history} />)} />
      <Route component={({ history }) => (<RightMenu history={history} />)} />
      App.js
      <main className={classes.content}>

        <Switch>
          <Route path="/bbsView" component={SampleBbsView}></Route>
          <Route path="/signin" component={SignIn}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route exact path="/app/view" component={AppView}></Route>
          <Route path="/app/forms" component={FormList}></Route>
          <Route path="/app/todolist" component={AppList}></Route>
          <Route path="/app/processlist" component={AppList}></Route>
          <Route path="/app/endlist" component={BbsList}></Route>
          <Route path="/bbs/list" component={BbsList}></Route>
          <Route exact path="/article" component={ArticleView}></Route>
          <Route path="/article/:id" component={ArticleView}></Route>

          <Route exact path="/bbs/view" component={BbsView}></Route>
        </Switch>
      </main>

      <footer className={classes.footer}>
        {<Footer />}
      </footer>
    </div>
  );
}

export default App;
