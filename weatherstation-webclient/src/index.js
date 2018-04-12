import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store.js'
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router'
import registerServiceWorker from './registerServiceWorker';
import MainPage from './components/MainPage.jsx';
import SecondPage from './components/SecondPage.jsx';

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/Second" component={SecondPage}/>
    </Switch>
</BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
