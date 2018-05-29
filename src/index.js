import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'

axios.defaults.baseURL = 'https://react-posts-cf3c3.firebaseio.com/'

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
