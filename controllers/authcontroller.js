const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

// Load user data from a JSON file
const usersFilePath = path.join(__dirname, '../models/users.json');

// POST /getToken - Authenticate user and return a JWT
const getToken = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ errorMessage: 'Username and password are required.' });
  }

  // Read the users JSON file
  fs.readFile(usersFilePath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ errorMessage: 'Error reading user data.' });
    }

    const users = JSON.parse(data);

    // Find the user
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
      return res.status(401).json({ errorMessage: 'Invalid username or password.' });
    }

    // Generate a JWT
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  });
};

module.exports = { getToken };
