const express = require('express')
const { Username, Exercise } = require('../models');
const { enforceDateFormat, checkBoundaries } = require('../verify');
const router = express.Router();

router.get('/', (req, res) => {
  if (!req.query.userId) {
    res.json({ error: 'userId is a required parameter' });
  }

  if (from || to) {
    if (!enforceDateFormat(from) || !enforceDateFormat(to)) {
      res.json({ error: 'Invalid format for from/to (must be YYYY-MM-DD)'})
    }
  }

  let userId = req.query.userId;
  let from = req.query.from ? new Date(req.query.from) : null;
  let to = req.query.to ? new Date(req.query.to) : null;
  let limit = req.query.limit ? parseInt(req.query.limit) : 0

  // Check that id is in database
  Username.findOne({ _id: userId }, (err, found) => {
    if (err) res.json({ error: err});
    else if (found) {
      Exercise.find({ userId })
        .limit(limit)
        .exec((err, data) => {
          if (err) res.json({ err });
          const log = [];
          for (let item of data) {
            log.push({
              description: item.description,
              duration: item.duration,
              date: item.date,
            })
          }
          // Check optional from / to parameters
          if (!from && !to) {
            res.json({
              _id: found._id,
              username: found.username,
              count: log.length,
              log, 
            });
          }
          else {
            const filteredLog = checkBoundaries(from, to, log);
            res.json({
              _id: found._id,
              username: found.username,
              count: log.length,
              filteredLog, 
            });
          }
        })
    }
  })
})

module.exports = router;