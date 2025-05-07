const express = require('express');
const connectDB = require('./config/dbConnection');
const errorHandler = require('./middleware/errorHandler');
const dotenv = require('dotenv').config();
const cookieParser = require("cookie-parser")
connectDB();

const app = express();
app.use(cookieParser);
const port = process.env.PORT || 5050;

app.use(express.json());
app.use("/api/users", require("./routes/userRoutes"))
app.use("/api/hotels",require("./routes/hotelRoutes"))
app.use("/api/booking",require('./routes/bookingsRoutes'))
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is listening on port ${port}`);
})