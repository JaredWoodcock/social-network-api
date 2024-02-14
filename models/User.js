const mongoose = require('mongoose');

// Define schema for User model
const userSchema = new mongoose.Schema({
    // Username of the User
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // Email of the user
    email: {
        type: String,
        required: true,
        unique: true,
        // Validate email format
        match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
    },
    // Array of thought IDs referencing the Thought model
    thoughts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Thought'
    }],
    // Array of user IDs referencing other users
    friends: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { toJSON: { virtuals: true }, id: false });

// Virtual to retrieve the length of the user's friends array
userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = mongoose.model('User', userSchema);

module.exports = User;