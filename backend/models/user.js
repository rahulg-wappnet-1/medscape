const mongoose  = require('mongoose')
const bcrypt = require('bcryptjs')
const validator = require('validator')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required : [true,`Please enter the name`],
        maxlength : 30
    },
    date_of_birth:{
        type:String,
        required: [true,`Please select date of birth`]
    },
    email:{
        type:String,
        required : [true,`Please enter the email`],
        //validate: [validator.isEmail, `Please provide proper email`],
        unique:true 
    },
    gender:{
        type:String,
        required: [true,`Please enter the gender`]
    },

    city:{
        type:String,
        required:[true,`Please enter the address`],
    },
    password:{
        type:String,
        minlength:[8,`Password must be of atleast 8 char length`]
    },
    photo:{
        id:{
            type: String,
            required: true
        }
    },
    disease_record:[
        {
            disease_name:{
                type: String,
                default:'No disease'
            },
            dignosed_on :{
                type: Date,
                default: Date.now()
            }
        }
    ],
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: String
})


userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
  });

  userSchema.methods.getJwtToken = function (){
    return jwt.sign({
        id: this._id
    },
    process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRY
    })
  }

  userSchema.methods.isValidatedPassword = async function(userSentPassword, user){
    //console.log(typeof userSentPassword);
    return await bcrypt.compare(userSentPassword, this.password)
  }


module.exports = mongoose.model('User',userSchema)

