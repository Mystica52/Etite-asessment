// const express = require('express');
// const router = express.Router();
// const eventController = require('../controllers/eventController');
// const  { isAdmin }= require("../middlewares/routerProtection");

import express from 'express';
import {
    getEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent 
}from '../controllers/eventController.js';
import { isAdmin } from '../middlewares/routerProtection.js';
const router = express.Router();


// Routes for events
router.get('/event', getEvents);
router.get('/eventId/:id', getEventById);
router.post('/addEvent',  isAdmin, createEvent);
router.put('/updateId/:id', isAdmin, updateEvent);
router.delete('/deleteId/:id', isAdmin, deleteEvent);

export default  router;
