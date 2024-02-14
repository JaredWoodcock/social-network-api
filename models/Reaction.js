const mongoose = require('mongoose');

// Define schema for Reaction model
const reactionSchema = new mongoose.Schema({
    // Unique identifier for the reaction
    reactionId: {
        type: mongoose.Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    // Body content of the reaction
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    // Username of the user who created the reaction
    username: {
        type: String,
        required: true
    },
    // Timestamp when the reaction was created
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    }
});

const Reaction = mongoose.model('Reaction', reactionSchema);

module.exports = Reaction;