import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "react-bootstrap";
import { ToastContainer } from "react-toastify";
import './index.css';
import App from './App';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';


const rootElement = document.getElementById('root');
const root = createRoot(rootElement);


root.render(
   <>
    <BrowserRouter>
    <App />
    <ToastContainer/>
    </BrowserRouter>
   </>,
);

// ReactDOM.render(
//    <BrowserRouter>
//         <App />
//         <ToastContainer />
//     </BrowserRouter>,
//     document.getElementById("root")
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
