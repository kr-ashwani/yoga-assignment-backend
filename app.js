const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const authRoutes = require('./routes/authRoutes/authRoutes');
const yogaEnrollRoutes = require('./routes/yogaEnrollRoutes');
const authenticateUser = require('./midddleware/authenticateUser/authenticateUser');

const app = express();
const PORT = process.env.PORT || 3301;

mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('connected to mongodb server.'))
  .catch(() => console.error.bind(console, 'MongoDB connection error.'));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// enabling anyone to access api resources
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//  authenticates user and populates userInfo property in req
app.use(authenticateUser);

// routes for authentication(login,signup etc)
app.use(authRoutes);

app.use(yogaEnrollRoutes);

app.listen(PORT, () => console.log(`server running on ${PORT}`));
