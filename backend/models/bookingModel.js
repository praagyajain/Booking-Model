const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
    {
        room: {
            type: String,
            required: true
        },
        roomid: {
            type: String,
            required: true
        },
        userid: {
            type: String,
            required: true
        },
        fromDate: {
            type: Date,
            required: true
        },
        toDate: {
            type: Date,
            required: true
        },
        totalDays: {
            type: Number,
            required: true
        },
        totalAmount: {
            type: Number,
            required: true
        },
        transactionID: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true,
            default: "Booked"
        }
    },{
        timestamps: true
    }
)

module.exports = mongoose.model("Booking",bookingSchema)