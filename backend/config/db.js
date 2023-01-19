const mongoose = require('mongoose')

mongoose.set('strictQuery', false)
const connectWithDb = () =>{
    mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log('Database connected'))
    .catch(error=>{
        console.log('Database connection failed');
        console.log(error);
    })
}
   
module.exports = connectWithDb