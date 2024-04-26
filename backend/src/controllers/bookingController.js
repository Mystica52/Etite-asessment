// controllers/bookingController.js
// const Booking = require('../models/booking');
// const Event = require('../models/event');
import Booking from "../models/booking.js";
import Event from "../models/event.js"
import jwt from 'jsonwebtoken';

// Create a new booking
export const createBooking = async (req, res) => {
 try {
    const { eventId, ticketsBooked } = req.body;
    console.log(`siednuidh ${eventId}`)
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    if (event.ticket_availability < ticketsBooked) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }
    const booking = new Booking({
      user_id: req.userId, 
      event_id: eventId,
      tickets_booked: ticketsBooked,
    });
    await booking.save();
    // Update event ticket availability
    event.ticket_availability -= ticketsBooked;
    await event.save();
    res.status(201).json({ message: 'Booking created successfully' });
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
};

// Get bookings by a customer
export const getBookingsByCustomer = async (req, res) => {
 try {
    const bookings = await Booking.find({ user_id: req.user.id }).populate('event_id');
    res.status(200).json(bookings);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
 try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    if (booking.user_id.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to cancel this booking' });
    }
    // Update event ticket availability
    const event = await Event.findById(booking.event_id);
    event.ticket_availability += booking.tickets_booked;
    await event.save();
    await booking.remove();
    res.status(200).json({ message: 'Booking cancelled successfully' });
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
};
