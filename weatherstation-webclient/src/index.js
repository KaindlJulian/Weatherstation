import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from './store.js'
import {BrowserRouter} from 'react-router-dom';
import {Route, Switch} from 'react-router'
import registerServiceWorker from './registerServiceWorker';
import MainPage from './components/MainPage.jsx';
import SecondPage from './components/SecondPage.jsx';
import ThirdPage from './components/ThirdPage.jsx';

ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
    <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/MonthReport" component={SecondPage}/>
        <Route exact path ="/YearReport" component={ThirdPage}/>
        <Route component={MainPage}/>
    </Switch>
</BrowserRouter>
</Provider>, document.getElementById('root'));
registerServiceWorker();
