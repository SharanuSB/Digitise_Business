import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from "react-router-dom"
import {Provider} from "react-redux"
import configureStore from './Redux/Store/configureStore';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store = {store}>
        <BrowserRouter> 
            <App />
        </BrowserRouter>
    </Provider>
);

