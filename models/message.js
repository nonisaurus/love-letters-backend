// Require NPM mongoose
const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: `User`,
        required: true
    },
    comment: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 200
    }
}, {
    timestamps: true
  });
// Compile model on schema
const Message = mongoose.model('Message', messageSchema);

//Export
module.exports = Message;