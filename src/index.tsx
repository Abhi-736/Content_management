import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Sidebar from './components/Sidebar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Footer from './components/Footer';
import Contacts from './components/Contact';
import { Provider } from 'react-redux';
import ChartsMaps from './components/ChartsMaps';
import "./App.css";
import store from './Redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router><Sidebar/>
    <Routes>
    <Route path="/" element={<Contacts />} />
        <Route path="/ChartsMaps" element={<ChartsMaps />} />
    </Routes><Footer/>
    </Router>
    </Provider>
  </React.StrictMode>
  
);
reportWebVitals();
