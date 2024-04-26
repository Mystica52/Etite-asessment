import React from 'react';
import axios from 'axios';

const CancelBooking = ({ bookingId }) => {
 const handleCancel = async () => {
    try {
      const response = await axios.delete(`/api/bookings/${bookingId}`);
      alert(response.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
 };

 return (
    <div>
      <button onClick={handleCancel}>Cancel Booking</button>
    </div>
 );
};

export default CancelBooking;
