const mongoose = require('mongoose');
const Reaction = require('./Reaction');

// Define schema for Thought model
const thoughtSchema = new mongoose.Schema({
    // Text content of the thought
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    // Username of the user who created the thought
    username: {
        type: String,
        required: true
    },
    // Timestamp when the thought was created
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    // Timestamp when the thought was updated
    updatedAt: {
        type: Date,
        default: Date.now
    },
    // Array of reactions associated with the thought
    reactions: [Reaction.schema]
}, { toJSON: { virtuals: true }, id: false });

// Virtual to retrieve the length of the thought's reactions array
thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;