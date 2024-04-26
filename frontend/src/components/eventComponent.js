import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookingPage = ({ eventId }) => {
 const [ticketsBooked, setTicketsBooked] = useState(1);
 const [bookings, setBookings] = useState([]);
 const [bookingIdToCancel, setBookingIdToCancel] = useState(null);

 // Fetch bookings
 useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings');
        setBookings(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBookings();
 }, []);

 // Book an event
 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/bookings', { eventId, ticketsBooked });
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
 };

 // Cancel a booking
 const handleCancel = async () => {
    try {
      const response = await axios.delete(`/api/bookings/${bookingIdToCancel}`);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
 };

 return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <nav className="bg-blue-500 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl"><Link to="/" className="text-white"><h2>Event Management system</h2></Link></div>
          <div className="flex items-center">
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg ml-4"><Link to="/login" className="text-blue-500 hover:text-blue-800">Login</Link></button>
            <button className="bg-white text-blue-500 px-4 py-2 rounded-lg ml-4"><Link to="/bookedTicket" className="text-blue-500 hover:text-blue-800">Booked Ticket</Link></button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="container mx-auto p-4">
          {/* Card Wrapper */}
          <div className="bg-gray-200 shadow-lg rounded-lg p-6 mb-4 max-w-md mx-auto">
            <h2>Book Event</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Tickets:
                <input
                 type="number"
                 value={ticketsBooked}
                 onChange={(e) => setTicketsBooked(e.target.value)}
                 min="1"
                />
              </label>
              <button type="submit">Book</button>
            </form>

            <h2>Your Bookings</h2>
            <ul>
              {bookings.map((booking) => (
                <li key={booking._id}>
                 {booking.event_id.title} - {booking.tickets_booked} tickets
                 <button onClick={() => setBookingIdToCancel(booking._id)}>Cancel</button>
                </li>
              ))}
            </ul>

            {bookingIdToCancel && (
              <div>
                <h2>Cancel Booking</h2>
                <button onClick={handleCancel}>Confirm Cancellation</button>
              </div>
            )}
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

export default BookingPage;
