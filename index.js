require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import Express
const app = express(); // Initialize Express

// Middleware
app.use(express.json()); // Parses incoming JSON requests

// Placeholder for routes
app.get('/', (req, res) => {
  res.send('Welcome to the Collectible Card Game API!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const authRoutes = require('./routes/authRoutes');

// Use the authentication routes
app.use('/auth', authRoutes);


const cardRoutes = require('./routes/cardRoutes');

// Use the card management routes
app.use('/cards', cardRoutes);

