const asyncHandler = require('express-async-handler');
const Booking = require("../models/bookingModel")
const Hotel = require('../models/hotelModel');
const { Double } = require('mongodb');


const newBooking = asyncHandler(async (req, res) => {
    const { room, userid, fromDate, toDate, totalDays, totalAmount } = req.body;

    const booking = Booking.create({
        room: room.name,
        roomid: room._id,
        userid,
        fromDate,
        toDate,
        totalDays,
        totalAmount,
        transactionID: "12345678",
    })
    if (booking) {
        res.status(201).json({ _id: room.id, room: room.name, fromDate: fromDate, toDate: toDate, totalDays: totalDays, totalAmount: totalAmount, transactionID: transactionID })
    } else {
        res.status(400);
        throw new Error("Booking failed");
    }

    const _room = await Hotel.findOne({ _id: room._id });

    _room.bookings.push({ bookingID: booking._id, fromDate: fromDate, toDate: toDate, userid: userid, status: booking.status });
    await _room.save();
    res.status(200).json("Room Booked Successfully")
})


const getAllBookings = asyncHandler(async (req,res)=> {
    const bookings = await Booking.find({});
    res.status(200).json(bookings);
})


const cancelBooking = asyncHandler(async (req, res) => {
    const { bookingid, roomid } = req.body;

    const booking = await Booking.findOne({ _id: bookingid })

    booking.status = "Cancelled"
    await booking.save();
    const room = await Hotel.findOne({_id: roomid});
    if(room){

        const currentBookings = room.bookings
        
        const currentBooking = currentBookings.filter(booked => booked.bookingID.toString() !== bookingid)
        
        room.bookings = currentBooking;
        await room.save();
        res.status(200).json("Booking Cancelled Successfully");
    }else {
        throw new Error("Booking not found");
    }

})

const rate = asyncHandler(async (req,res)=> {
    const {roomid,userid,num} = req.body;

    const room = await Hotel.findOne({ _id: roomid });
    const rated = room.ratings;
    rated.push({user_id: userid, rating: num});
    await room.save();
    const len = rated.length();
    let sum = 0;
    const add = rated.forEach(r => sum + r.rating);
    const avg = sum(Double)/len(Double);
    room.avgRating = avg;
    room.totalRatings = len;
    room.save();
})


module.exports = { newBooking,cancelBooking,getAllBookings,rate}