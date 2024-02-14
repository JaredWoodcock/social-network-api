const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const thoughtsRouter = require('./thoughts');

// Use user routes
router.use('/users', usersRouter);

// Use thought routes
router.use('/thoughts', thoughtsRouter);

module.exports = router;