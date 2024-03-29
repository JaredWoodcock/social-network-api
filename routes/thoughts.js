const express = require('express');
const router = express.Router();
const { getAllThoughts, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction } = require('../controllers/thoughtController');

// Routes for /api/thoughts
router.get('/', getAllThoughts);
router.get('/:thoughtId', getThoughtById);
router.post('/', createThought);
router.put('/:thoughtId', updateThought);
router.delete('/:thoughtId', deleteThought);
router.post('/:thoughtId/reactions', addReaction);
router.delete('/:thoughtId/reactions/:reactionId', removeReaction);

module.exports = router;