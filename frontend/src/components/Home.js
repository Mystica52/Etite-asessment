import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
 const [events, setEvents] = useState([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [showSearch, setShowSearch] = useState(false);
 const [isLoggedIn, setIsLoggedIn] = useState(false);




 useEffect(() => {
  const token = localStorage.getItem('token');
  setIsLoggedIn(!!token);
}, []); useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/event');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
 }, []);

 // Filter events based on the search query
 const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
 );

 // Toggle search visibility
 const toggleSearch = () => {
    setShowSearch(!showSearch);
 };

 // Handle search input change
 const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
 };

 return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl"><Link to="/" className="text-white"><h2>Event Management system</h2> </Link></div>
          <div className="flex items-center">
            {showSearch ? (
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
                <input
                 className="border rounded-lg p-2 mr-2 flex-grow"
                 type="text"
                 placeholder="Search"
                 value={searchQuery}
                 onChange={handleSearchChange}
                />
                <button className="bg-white text-blue-500 px-4 py-2 rounded-lg" type="submit">Search</button>
              </form>
            ) : (
              <button className="bg-white text-blue-500 px-4 py-2 rounded-lg ml-4" onClick={toggleSearch}>Search</button>
            )}
 {isLoggedIn ? (
              <>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-lg ml-4" onClick={() => {
                 localStorage.removeItem('token'); // Remove the token from localStorage
                 setIsLoggedIn(false); // Update the login status
                }}><Link to="/login" className="text-blue-500 hover:text-blue-800">Logout</Link></button>
                <button className="bg-white text-blue-500 px-4 py-2 rounded-lg ml-4"><Link to="/bookedTicket" className="text-blue-500 hover:text-blue-800">Booked Ticket</Link></button>
              </>
            ) : (
              <button className="bg-white text-blue-500 px-4 py-2 rounded-lg ml-4"><Link to="/login" className="text-blue-500 hover:text-blue-800">Login</Link></button>
            )}
            
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          {/* Display Filtered Events */}
          <div className="grid grid-cols-3 gap-4">
            {filteredEvents.map((event) => (
              <div key={event._id} className="bg-blue-500 shadow-lg rounded-lg p-6 mb-4 max-w-md mx-auto">
                <h2 className="text-xl text-white font-bold mb-2">{event.title}</h2>
                <p className="text-white mb-2">Location: {event.location}</p>
                <p className="text-white mb-2">Date: {event.date}</p>
                <p className="text-white mb-2">Tickets Available: {event.ticket_availability}</p>
                <button className="bg-black text-white px-4 py-2 rounded-lg mt-4 "><Link to="/bookedTicket" className="text-white hover:text-blue-800">Book now</Link></button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 p-4">
        <div className="container mx-auto text-white text-center">
          <p>&copy; 2023 Event Finder. All rights reserved.</p>
        </div>
      </footer>
    </div>
 );
};

export default Home;
