const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

const app = express();

connectDB()

app.use(cors())

app.use(express.json({ extended: true }))

const PORT = process.env.PORT || 4000;

app.use('/api/user', require('./routes/user'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/projects', require('./routes/projects'))
app.use('/api/tasks', require('./routes/tasks'))

app.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
})