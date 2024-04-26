import mongoose from'mongoose';

const EventSchema = new mongoose.Schema({
 title: {
    type: String,
    required: true,
 },
 date: {
    type: Date,
    required: true,
 },
 location: {
    type: String,
    required: true,
 },
 ticket_availability: {
    type: Number,
    required: true,
 },
});

const Event = mongoose.model('Event', EventSchema);
export default Event;
