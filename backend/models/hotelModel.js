const { Double } = require('mongodb');
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    
    hotelname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price : {
        type: Number,
        required: true
    },
    room_type: {
        type: String,
        requierd: true
    },
    hotel_img : [],
    maxGuests : {
        type: Number,
        required : true
    },
    bookings: [],
    ratings: [{
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "H_user"
        },
        rating: {
            type: Number
        }
    }],
    avgRating: {
        type: Double,
        default: 0,
    },
    totalRatings: {
        type: Number,
        default: 0
    },
    facilities: [{
        type: String
    }]
})



module.exports = mongoose.model('Hotel', hotelSchema);