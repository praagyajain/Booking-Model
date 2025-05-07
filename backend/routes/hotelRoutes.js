const express = require('express');
const { allRooms, getRoom, addRooms,updateRoom, deleteRoom} = require('../controller/hotelController');
const { rate } = require('../controller/bookingController');
const router = express.Router();

router.post('/add',addRooms)   // adding new rooms

router.get('/',allRooms)   // get all rooms

router.route("/:id").put(updateRoom).get(getRoom).delete(deleteRoom) // get single room by ID
router.post("/:id/rating",rate) // Rate the hotel rooms
module.exports = router;
