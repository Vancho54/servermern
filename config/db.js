const mongoose = require('mongoose')

require('dotenv').config({path: '.env'})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB, { useNewUrlParser:true, useUnifiedTopology:true, useFindAndModify: false, useCreateIndex: true })
        console.log('database connected')
    } catch (e) {
        console.log(e)
        process.exit(1)
    }
}

module.exports = connectDB