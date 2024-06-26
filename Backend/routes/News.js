// routes/newsEvents.js

const express = require('express');
const router = express.Router();

const { createNewsEvent, getAllNewsEvents, getNewsEventById, updateNewsEvent, deleteNewsEvent } = require('../controllers/NewsEvent');

// Create a new news event
router.post('/', createNewsEvent);

// Get all news events
router.get('/', getAllNewsEvents);

// Get a news event by ID
router.get('/:id', getNewsEventById);

// Update a news event by ID
router.put('/:id',  updateNewsEvent);

// Delete a news event by ID
router.delete('/:id', deleteNewsEvent);

module.exports = router;
