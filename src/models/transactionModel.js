const mongoose = require('mongoose');

// Mixed for IV and Encrypted Data

const transactionSchema = new mongoose.Schema({
    amount: {
        type: mongoose.Schema.Types.Mixed, // {iv: string, encryptedData: string}
        required: [true, 'Amount is required'],
    },
    category: {
        type: mongoose.Schema.Types.Mixed,
        required: [true, 'Category is required'],
    },
    date: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: mongoose.Schema.Types.Mixed,
        trim: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
});

module.exports = mongoose.model('Transaction', transactionSchema);
