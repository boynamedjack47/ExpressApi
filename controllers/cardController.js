const fs = require('fs');
const path = require('path');
const uuid = require('uuid'); // To generate unique card IDs

// Path to the cards JSON file
const cardsFilePath = path.join(__dirname, '../models/cards.json');

// GET /cards - Retrieve all cards with optional filters
const getCards = (req, res) => {
  const { set, type, rarity } = req.query; // Filters

  fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: 'Error reading card data.' });
    }

    const cards = JSON.parse(data);
    let filteredCards = cards;

    // Apply filters
    if (set) {
      filteredCards = filteredCards.filter(card => card.set === set);
    }
    if (type) {
      filteredCards = filteredCards.filter(card => card.type === type);
    }
    if (rarity) {
      filteredCards = filteredCards.filter(card => card.rarity === rarity);
    }

    res.json(filteredCards);
  });
};

// POST /cards/create - Create a new card
const createCard = (req, res) => {
  // Log the request body for debugging
  console.log("Request Body:", req.body);

  const { name, set, type, rarity } = req.body;

  if (!name || !set || !type || !rarity) {
    return res.status(400).json({ errorMessage: 'All card fields are required.' });
  }

  fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: 'Error reading card data.' });
    }

    const cards = JSON.parse(data);
    const newCard = {
      id: uuid.v4(), // Generate unique ID
      name,
      set,
      type,
      rarity,
    };

    cards.push(newCard);

    fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error saving card.' });
      }

      res.status(201).json({ successMessage: 'Card created successfully.', card: newCard });
    });
  });
};

// PUT /cards/:id - Update an existing card
const updateCard = (req, res) => {
  const { id } = req.params;
  const { name, set, type, rarity } = req.body;

  if (!name || !set || !type || !rarity) {
    return res.status(400).json({ errorMessage: 'All card fields are required.' });
  }

  fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: 'Error reading card data.' });
    }

    let cards = JSON.parse(data);
    const cardIndex = cards.findIndex(card => card.id === id);

    if (cardIndex === -1) {
      return res.status(404).json({ errorMessage: 'Card not found.' });
    }

    cards[cardIndex] = { id, name, set, type, rarity };

    fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error saving updated card.' });
      }

      res.json({ successMessage: 'Card updated successfully.', card: cards[cardIndex] });
    });
  });
};

// DELETE /cards/:id - Delete a card
const deleteCard = (req, res) => {
  const { id } = req.params;

  fs.readFile(cardsFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: 'Error reading card data.' });
    }

    let cards = JSON.parse(data);
    const cardIndex = cards.findIndex(card => card.id === id);

    if (cardIndex === -1) {
      return res.status(404).json({ errorMessage: 'Card not found.' });
    }

    const deletedCard = cards.splice(cardIndex, 1);

    fs.writeFile(cardsFilePath, JSON.stringify(cards, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ errorMessage: 'Error deleting card.' });
      }

      res.json({ successMessage: 'Card deleted successfully.', card: deletedCard[0] });
    });
  });
};

module.exports = { getCards, createCard, updateCard, deleteCard };
