const { Router } = require('express');
const { GameNights } = require('../database');

const gameNightsRouter = Router();

// End point starts with '/api/game-nights'
// gameNightsRouter.get('/')

gameNightsRouter.get('/', (req, res) => {
  // Retrieve the GameNights from the database
  GameNights.find({})
    .then((gameNights) => {
      // Send back the GameNights and correct status codes
      res.status(200).send(gameNights);
    }).catch((err) => {
      // Handle any errors
      console.error('Error GETting the GameNights from db: ', err);
      res.sendStatus(500);
    });
});

gameNightsRouter.post('/', (req, res) => {
  // Grab the request body
  const { formValues } = req.body;
  console.log('FormValues: ', formValues);
  // Add the new gamenight to the database
  GameNights.create(formValues).then((event) => {
    // Send back the proper status codes
    res.status(201).send(event);
  }).catch((err) => {
    console.error('Error adding game night to database: ', err);
    res.sendStatus(500);
  });
});
module.exports = {
  gameNightsRouter,
};
