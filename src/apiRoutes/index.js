const express = require("express");
const newUserRoute = require('./new-user');
const newExerciseRoute = require('./add');
const logRoute = require('./log');
const router = express.Router();

router.use('/new-user', newUserRoute);
router.use('/add', newExerciseRoute);
router.use('/log', logRoute);

module.exports = router;