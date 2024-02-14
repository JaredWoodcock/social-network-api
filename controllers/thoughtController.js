const { Thought, User } = require('../models');

// Function for the thought controller
const thoughtController = {
    // GET all thoughts
    getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // GET one thought by ID
  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST a new thought linked to the user
  createThought: async (req, res) => {
    try {
      const { thoughtText, username, userId } = req.body;
      const newThought = await Thought.create({ thoughtText, username, user: userId });
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.thoughts.push(newThought._id);
      await user.save();
      res.status(201).json(newThought);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },

  // PUT update a thought by ID
  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(updatedThought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE a thought by ID
  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const user = await User.findById(deletedThought.user);
      if (user) {
        user.thoughts.pull(deletedThought._id);
        await user.save();
      }
      res.json({ message: 'Thought deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // POST reaction to the thought
  addReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.push(req.body);
      await thought.save();
      res.status(201).json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  // DELETE reaction to the thought
  removeReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      const filteredReactions = thought.reactions.filter(reaction => reaction._id != req.params.reactionId);
      thought.reactions = filteredReactions;
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = thoughtController;