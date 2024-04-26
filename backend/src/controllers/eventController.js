// controllers/eventController.js
// const Event = require('../models/event');
import Event from "../models/event.js"

// Get all events
export const getEvents = async (req, res) => {
 try {
    const events = await Event.find();
    res.status(200).json(events);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
};

// Get a single event by ID
export const getEventById = async (req, res) => {
 try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(event);
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
};

// Create a new event
export const createEvent = async (req, res) => {
 const event = new Event(req.body);
 try {
    const savedEvent = await event.save();
    res.status(201).json(savedEvent);
 } catch (err) {
    res.status(400).json({ message: err.message });
 }
};

// Update an event by ID
export const updateEvent = async (req, res) => {
 try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
 } catch (err) {
    res.status(400).json({ message: err.message });
 }
};

// Delete an event by ID
export const deleteEvent = async (req, res) => {
 try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted' });
 } catch (err) {
    res.status(500).json({ message: err.message });
 }
};
