const express = require('express')
const router = express.Router();
const { Username } = require('../models');

router.post('/', (req, res) => {
  const { username } = req.body;
  const newUsername = new Username({ username });
  Username.findOne({ username }, (err, found) => {
    if (err) res.json({ error: err });
    else if (found) res.json({ error: 'User already in database' });
    else {
      newUsername.save((err, data) => {
        if (err) res.json({ error: err });
        const { username, _id } = data;
        res.json({ username, _id });
      })
    }
  })
})

module.exports = router;