const asynchandler = require('express-async-handler');


const Hotel = require('../models/hotelModel')

const addRooms = asynchandler(async (req,res)=> {
    const {hotelname,email,phone,address,price,hotel_img,facilities,room_type,guests} = req.body;
    if(!hotelname || !email || !phone || !address || !price || !room_type || !guests) {
        res.status(400);
        throw new Error("All Field are mandatory!!!")
    };
    const room = Hotel.create({
        hotelname,email,phone,address,price,hotel_img,facilities,room_type,guests
    });
    if(room) {
        res.status(201).json({_id: room.id, name: room.name, phone: room.phone})
    } else {
        res.status(400);
        throw new Error("data is not valid")
    }
    res.json("hotel added")
})

const updateRoom = asynchandler(async (req, res) => {
    const room = await Contact.findById(req.params.id);
    if (!room) {
        res.status(404);
        throw new Error("Room not Found")
    }

    const updatedRoom = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedRoom);
})

const allRooms = asynchandler(async (req,res)=>{
    const rooms = await Hotel.find({});
    res.status(200).json(rooms)
})

const getRoom = asynchandler(async (req,res)=>{
    
    const room = await Hotel.findById(req.params.id);
    if(!room) {
        res.status(404);
        throw new Error("Room not found");
    }
    res.status(200).json(room);
})


const deleteRoom = asynchandler(async (req, res) => {
    const room = await Hotel.findById(req.params.id);
    if (!room) {
        res.status(404);
        throw new Error("Room not Found")
    }
    await Hotel.deleteOne({ _id: req.params.id });
    res.status(200).json(room);
})

module.exports = {allRooms,getRoom,addRooms,updateRoom,deleteRoom}