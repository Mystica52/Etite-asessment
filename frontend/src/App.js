import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import SignUp from './components/signUp';
import Home from './components/Home'
import './tailwind.css';
import AddPage from './components/adminDashboard';
import Event from './components/SingleEvent';
import BookingPage from './components/eventComponent';


function App() {
 return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AddPage />} />
        <Route path="/event:id" element={<Event />} />
        <Route path="/bookedTicket" element={<BookingPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
 );
}

export default App;
