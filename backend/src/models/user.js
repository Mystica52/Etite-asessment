import mongoose from'mongoose';

const UserSchema = new mongoose.Schema({
 name: {
    type: String,
    required: true,
 },
 email: {
    type: String,
    required: true,
    unique: true,
 },
 password: {
    type: String,
    required: true,
 },
 role: {
    type: String,
    enum: ["admin", "customer"],
    default: "customer",
  },
 bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
 }],
});
const User =  mongoose.model('User', UserSchema);
export default User
