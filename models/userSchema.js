const { Timestamp } = require("mongodb");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    role: { type: String, enum: ["admin", "organisation", "user","service"], default: 'user' },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Inventory",
    }]
},
    { timestamps: true }

)

const User = mongoose.model('User', userSchema);

module.exports = User;