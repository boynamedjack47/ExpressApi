const express = require('express');
const { getCards, createCard, updateCard, deleteCard } = require('../controllers/cardController');
const authenticateJWT = require('../middleware/authenticateJWT'); // Protect routes

const router = express.Router();

// GET /cards - Retrieve all cards with optional filters
router.get('/', getCards);

// POST /cards/create - Create a new card
router.post('/create', authenticateJWT, createCard);

// PUT /cards/:id - Update an existing card
router.put('/:id', authenticateJWT, updateCard);

// DELETE /cards/:id - Delete a card
router.delete('/:id', authenticateJWT, deleteCard);

module.exports = router;
