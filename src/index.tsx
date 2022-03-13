import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './app/store';
import App from './app/App';

import { history } from './utils/helpers';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

ReactDOM.render(
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Provider store={store}>
            <Router history={history}>
                <App />
            </Router>
        </Provider>
    </MuiPickersUtilsProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();