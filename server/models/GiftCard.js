const mongoose = require("mongoose");

const GiftCardSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    expiryDate: {
        type: Date,
        required: true,
    },
    cardImage: String,
    codeImage: String,
});

module.exports = mongoose.model("GiftCard", GiftCardSchema);
