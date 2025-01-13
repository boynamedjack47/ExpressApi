# ExpressApi

Collectible Card Game API

This project is a Node.js and Express.js-based API server for a fictional collectible card game. It supports card management through various endpoints, token-based authentication, and offers filtering and querying features. The server is modular, scalable, and uses JSON files for data storage.

Features

User Authentication: Authenticate users and generate JWT tokens.

Card Management: Create, update, retrieve, and delete cards.

Filter and Query: Retrieve cards with filters like set, type, and rarity.

Predefined Data Endpoints: Retrieve available sets, types, rarities, and other metadata.

Random Card Retrieval: Fetch a randomly selected card.

Data Storage: Cards and users are stored in JSON files for simplicity.

Prerequisites

Node.js: v14 or higher.

npm: v6 or higher.

Installation

Clone the repository:

git clone <repository-url>
cd <repository-folder>

Install dependencies:

npm install

Set up environment variables:

Create a .env file in the root directory.

Add the following variables:

JWT_SECRET=your_secret_key
PORT=3000

File Structure

project-root/
├── controllers/           # Business logic for handling requests
│   ├── authController.js  # Authentication logic
│   └── cardController.js  # Card management logic
|
├── middleware
|   └── authenticateJWT.js # Create JWT tokens 
├── models/                # JSON files for data storage
│   ├── cards.json         # Stores card data
│   └── users.json         # Stores user data
├── routes/                # Route definitions
│   ├── authRoutes.js      # Routes for authentication
│   └── cardRoutes.js      # Routes for card operations
├── .env                   # Environment variables
├── package.json           # Project metadata and dependencies
└── index.js              # Entry point for the server

Usage

Starting the Server

Start the server:

npm start

The server will run on the port specified in your .env file (default is 3000).

API Endpoints

Authentication

POST /getToken: Generate a JWT token for a user.

Request Body:

{
  "username": "user1",
  "password": "password123"
}

Response:

{
  "token": "<jwt_token>"
}

Cards

GET /cards: Retrieve all cards with optional filters.

Query Parameters: set, type, rarity.

Response: List of cards matching the filters.

POST /cards/create: Create a new card.

Headers: Authorization: Bearer <jwt_token>.

Request Body:

{
  "name": "Dragon",
  "set": "Base Set",
  "type": "Creature",
  "rarity": "Rare"
}

Response:

{
  "successMessage": "Card created successfully.",
  "card": { ... }
}

PUT /cards/:id: Update an existing card.

Headers: Authorization: Bearer <jwt_token>.

Request Body: Fields to update.

DELETE /cards/:id: Delete a card.

Headers: Authorization: Bearer <jwt_token>.

Metadata Endpoints

GET /sets: Retrieve a list of all available card sets.

GET /types: Retrieve a list of all card types.

GET /rarities: Retrieve a list of all card rarities.

GET /cards/count: Retrieve the total number of cards.

GET /cards/random: Retrieve a randomly selected card.

Testing the API

You can test the API using tools like:

Postman: Create requests for each endpoint.

curl: Command-line tool for API testing.

Example Requests

Create a Card:

curl -X POST http://localhost:3000/cards/create \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <jwt_token>" \
-d '{
  "name": "Dragon",
  "set": "Base Set",
  "type": "Creature",
  "rarity": "Rare"
}'

Retrieve All Cards:

curl -X GET http://localhost:3000/cards

Update a Card:
curl -X PUT http://localhost:3000/cards/<card_id> \
-H "Content-Type: application/json" \
-H "Authorization: Bearer <jwt_token>" \
-d '{
  "name": "Updated Dragon",
  "set": "Base Set",
  "type": "Creature",
  "rarity": "Epic"
}'