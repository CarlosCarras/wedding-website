import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar/Navbar';
import Home from './views/Home/Home';
import Footer from './components/Footer/Footer';
import NotFound from './views/NotFound/NotFound';

function App() {
    const sections = {
        "Home": '#home',
        "Our Story": '#our-story',
        "Venue": '#venue',
        "Registry": '#registry',
        "Gallery": '#gallery'
    };

    return (
        <Router>
            <div className={"App"}>
                <Navbar sections={sections} />
                <Routes>
                    <Route exact path="/" element={<Home/>} />   
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer/>
            </div>
        </Router>
  );
}

export default App;
