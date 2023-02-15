/*configures the backend express server */

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')
const cors = require('cors')

dotenv.config()

//set up database connection
mongoose.connect(process.env.DB_ACCESS, () => console.log("Database connected"))

//set up port to listen on
const port = process.env.PORT || 8080

app.use(express.json())

//enable CORS to prevent CORS-related errors
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

//handle routes
app.use('/todos', authRoutes)
app.use('/todos', taskRoutes)
app.listen(port, () => console.log(`Listening on port ${port}...`))