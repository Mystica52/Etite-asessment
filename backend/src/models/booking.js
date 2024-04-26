import mongoose from'mongoose';

const BookingSchema = new mongoose.Schema({
 user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
 },
 event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
 },
 tickets_booked: {
    type: Number,
    required: true,
 },
});
const Booking =  mongoose.model('Booking', BookingSchema);

export default Booking
