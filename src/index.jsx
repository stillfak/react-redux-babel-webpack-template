import React from "react";
import ReactDOM from "react-dom";
import App from "./component/common";
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

// import * as reducers from './store/reducers';
// const store = createStore(combineReducers(reducers), applyMiddleware(thunk));

ReactDOM.render(
    // <Provider store={store}>
        <App />
    // </Provider>
    ,
    document.getElementById('root')
);