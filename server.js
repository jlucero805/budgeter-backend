const express = require('express');
const app = express();

const mongoose = require('mongoose');

const cors = require('cors');

require('dotenv').config();

app.use(cors());
app.use(express.json());

//routers
const authRouter = require('./src/routers/authRouter');
const purchaseRouter = require('./src/routers/purchaseRouter');
const userRouter = require('./src/routers/userRouter');

// models
const Purchase = require('./src/models/Purchase');

// db connection
mongoose.connect(process.env.MONGOOSE_CON, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false})
	.then(() => {console.log('connected to mongo!')})
	.catch((err) => {console.log('mongo connection failed!')});

// user routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/purchase', purchaseRouter);
app.use('/api/v1/user', userRouter);

// logger
app.use((req, res, next) => {
	console.log("req.method, req.origninalUrl");
	next();
});

// port connection
const PORT = 8080;
app.listen(PORT, () => {console.log(`running on port ${PORT}`)}); 