require('dotenv').config()

const mongoose = require('mongoose')

const app = require('./src/app')

async function connectToDb() {
    await mongoose.connect(process.env.MONGO_URI)
    try {
        console.log('Connected to Database')
    }
    catch (err) {
        console.log(err)
    }
}

connectToDb();


app.listen(3000, () => {
    console.log("Server running on port 3000")
})