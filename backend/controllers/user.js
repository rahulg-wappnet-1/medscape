const cloudinary = require("cloudinary");
const User = require("../models/user");
const cookies = require("../utils/cookieToken")
const {invalid,
        missing,
        notFound} = require("../utils/response");
const { async } = require("rxjs");
exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password, gender, city, date_of_birth } = req.body;

  if (!email || !name || !password || !gender || !city || !date_of_birth) {
    return next(missing(res, "All fields required"));
  } else if (!req.files) {
    return next(missing(res, "Image required to sign up"));
  }
  console.log('here ');
  let file = req.files.photo;
  const result = await cloudinary.v2.uploader.upload(file.tempFilePath, {
    folder: "users",
    width: 150,
    crop: "scale",
  });
  console.log('here2');
  const user2 = await User.findOne({ email });
  console.log(user2);
  if(user2){
    invalid(res, 'Email already exist');
  }  
  if (!user2) {
    console.log('enteru');
   
    const user = await User.create({
      name,
      email,
      password,
      gender, 
      city,
      date_of_birth,
      photo: {
        id: result.public_id,
      },
    });
    console.log('here');
    cookies(user, res);
  } 
  } catch (error) {
    console.log(error);
  }
  
  
};

exports.logIn = async (req,res,next) =>{
    const {email, password} = req.body
    if(!email || !password){
        return next(missing(res,`All fields are required`));
    } 

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(notFound(res,`User does not exist`))
    }

    const isPasswordCorrect = await user.isValidatedPassword(password,user);

    if(!isPasswordCorrect){
        return next(missing(res,`Email or password does not match`))
    }

    cookies(user,res)
}

