require('dotenv').config();
const express = require('express');
const connectToDb = require('./database/db')
const imageRouter = require('./routes/imageRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use('/api/v0/image',imageRouter);
app.use('/api/v0/user',userRouter);
app.use('/api/v0/auth',authRouter);

const PORT = process.env.PORT;


connectToDb();

app.listen(PORT,() => {
    console.log(`The server is running on port ${PORT}`)
})