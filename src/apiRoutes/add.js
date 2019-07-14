const express = require('express');
const { Exercise, Username } = require('../models');
const { enforceDateFormat } = require('../verify');
const router = express.Router();


router.post('/', (req, res) => {
  // Get values from the body and create new document with it
  const { userId, description, duration, date } = req.body;
  const newExercise = new Exercise({
    userId,
    description,
    duration,
    date,
  })
  // Check that id is in database, then if found add to collection
  Username.findOne({ _id: userId }, (err, found) => {
    if (err) res.json({ error: err });
    else if (found) {
      const { username } = found;
      newExercise.save((err, data) => {
        if (err) res.json({ error: err });
        const { description, duration, _id, date } = data;
        if (!date) {
          const today = new Date();
          res.json({ username, description, duration, _id, date: today.toDateString() });
        }
        // If date value given and fails regex, return error
        else if (!enforceDateFormat(date)) {
          res.json({ error: 'invalid date string format (must be YYYY-MM-DD)'});
        }
        else {
          const today = new Date(date);
          res.json({ username, description, duration, _id, date: today.toDateString() });
        }
      })
    }
  })
})

module.exports = router;