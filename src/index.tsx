import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Sidebar from './components/Sidebar'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import Footer from './components/Footer';
import Contacts from './components/Contact';
import ChartsMaps from './components/ChartsMaps';
import "./App.css";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router><Sidebar/>
    <Routes>
    <Route path="/" element={<Contacts />} />
        <Route path="/ChartsMaps" element={<ChartsMaps />} />
    </Routes><Footer/>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
