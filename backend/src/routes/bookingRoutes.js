// routes/bookingRoutes.js
import express from 'express';
import {
 createBooking,
 getBookingsByCustomer,
 cancelBooking,
} from '../controllers/bookingController.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = express.Router();

// Define routes
router.post('/createBooking', verifyToken, createBooking);
router.get('/customerBooking', getBookingsByCustomer);
router.delete('/deleteBooking/:id', cancelBooking);

export default router;
