const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const http = require('http');


// options
const app = express();
app.use(express.json());
dotenv.config();
const corsOptions = {
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan('common'));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads/images', express.static('uploads/images'));
app.use('/public', express.static(path.join(__dirname, 'public')));




// Routes
const contactRoute = require('./Routes/contactRoutes')



// route urls
app.use('/api/contact', contactRoute)



// MongoDB connection
 const dbUsername = process.env.DB_USERNAME;
 const dbPassword = process.env.DB_PASSWORD;
const url = `mongodb+srv://${dbUsername}:${dbPassword}@sxr-constructions.e3vyn02.mongodb.net/`
const port = process.env.PORT || 8000;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	serverSelectionTimeoutMS: 30000,
	socketTimeoutMS: 45000
}).then(() => {
	console.log('MongoDB connected')
	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
 }).catch(err => console.log(err));


