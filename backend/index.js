const app = require('./app')
require('dotenv').config()
const cloudinary = require('cloudinary')
const connectionWithDb = require('./config/db')
connectionWithDb()
cloudinary.config({
    cloud_name : 'codersstay',
    api_key : '245156686657848',
    api_secret : 'aVxXZ5QjeqqShsbGplOaVSE_WqA'
})

app.listen(process.env.PORT, () =>{
    console.log('Server listening at port 3000');
})