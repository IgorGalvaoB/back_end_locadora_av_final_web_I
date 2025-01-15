require('dotenv').config() 
const express = require('express')
const cors = require('cors')
const connect = require('./config/db.config.js')
const app = express()

app.use(express.json()) 
app.use(cors())

connect()


app.use('/auth', require('./routes/user.routes.js'))
app.use(require('./middlewares/auth.js'))
app.use('/adminCar', require('./routes/car_del_post.route.js'))
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`)
})
