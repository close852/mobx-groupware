import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import stores from './stores';
import App from './App';

ReactDOM.render(
    <Provider {...stores}>
        <BrowserRouter>
            <Switch>
                <App />
            </Switch>
        </BrowserRouter>
    </Provider>, document.getElementById('root'));
