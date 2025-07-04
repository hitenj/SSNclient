import './App.css';
import React from 'react';
import Home from './components/Home';
import Header from './components/Header';
import AboutUs from './components/AboutUs';
import Footer from './components/Footer';
import MemberApply from './components/MemberApply';
import UpcomingEvents from './components/UpcomingEvents';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Donation from './components/Donation';
import ComplaintSuggestion from './components/ComplaintSuggestion';
import Donors from './components/Donors';
import CrowdFunding from './components/CrowdFunding';
import RegisterCampaign from './components/RegisterCampaign';
import Login from './components/Login';
import SignUp from './components/SignUp';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<AboutUs />} />
          <Route path='/apply' element={<MemberApply />} />
          <Route path='/event' element={<UpcomingEvents />} />
          <Route path='/donate' element={<Donation />} />
          <Route path='/complaint' element={<ComplaintSuggestion />} />
          <Route path='/donors' element={<Donors />} />
          <Route path='/crowd-funding' element={<CrowdFunding />} />
          <Route path='/register-campaign' element={<RegisterCampaign />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
