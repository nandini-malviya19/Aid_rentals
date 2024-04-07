const mongoose = require("mongoose");


const serviceSchema = new mongoose.Schema({
    name: {                        ////// 
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    bio: {             //////
        type: String
    },
    gender: {     ///     
        type: String,
        enum: ["male", "female", "other"],
        required: true,
    },
    pic: {////
        type: String,
        default: "https://www.nicepng.com/png/full/933-9332131_profile-picture-default-png.png",
    },
    age: {           ////       
        type: String,
        default: "23"
    },
    price: {
        type: String,
        default: "Free"
    },
    phoneNumber: [{       ///        
        type: String,
        required: true
    }],
    yoe: {           //////
        type: String,
        required: true
    },
    specialty: [{         ///////
        type: String,
        required: true,
    }],
    email: {             ////////
        type: String,
        required: true
    },
    city: {             /////////
        type: String,
        required: true
    },
    preferredAreas: [{     ///////       
        type: String
    }],
    reviews: [{
        type: String
    }],
    workingHours: {   //////            
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
);

const Service = mongoose.model('Service', serviceSchema);

module.exports = { Service };