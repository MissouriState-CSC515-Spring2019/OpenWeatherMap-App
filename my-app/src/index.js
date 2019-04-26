import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './components/App/App';
import UVIndex from './components/UVIndex/UVIndex';
import * as serviceWorker from './serviceWorker';
import FDForecast from './components/FDForecast/FDForecast';

ReactDOM.render(
    <div>
        <App />
        <UVIndex />
        <FDForecast />
    </div>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
