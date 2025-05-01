//const { v4: uuidv4 } = require('uuid');
const{validationResult} = require('express-validator');

const HttpError = require('../models/http-error');
const User= require('../models/user');
/*const DUMMY_USERS =[{
  id:"u1",
  name:"Dharshan",
  email:"dharshann2004@gmail.com",
  password:"Sbt5251"
}]*/


const getUser = async(req,res,next)=>{
  let users;
  try{
   users = await User.find({},
    '-password'
   );
  }
  catch(err){
   const error = new HttpError("Fetching users failed,please try again later",403);
   return next(error);
  }
  res.json({users:users.map(user => user.toObject({getters: true}))})
;}


const  signup = async(req,res,next)=>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return next(new HttpError("Invalid inputs please try again later,",404));
  }
  const {name,email,password} = req.body;

  let existingUser;
  try{
    existingUser = await User.findOne({email:email})
;  }
catch(err){
  const error = new HttpError("Signup failed,please try again later",404);
  return next(error);
}

const createdUser = new User({
  name,
  email,
  image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9YYh5Fk1u9VsWWr1MhkyQeOzeNbtnnMO96g&s",
  password,
  details:[],
})

try{
  await createdUser.save();
}
catch(err){
  const error= new HttpError("Saving details failed",404);
  return next(error);
}
res.status(201).json({user:createdUser.toObject({getters: true})});
}

const login = async(req,res)=>{
  const error = validationResult(req);
  if(!error.isEmpty()){
    return next(new HttpError("Invalid inputs please try again later,",404));
  }

  const{email,password} = req.body;

  let existingUser;
  try{
  existingUser = await User.findOne({email:email});
  }
  catch(err){
    const error = new HttpError("login failed",500);
  return next(error);
  }
  if(!existingUser || existingUser.password !==  password){
    const error = new HttpError("Invalid credentails please try again later",404);
    return next(error);
  }
  res.json({message:"Logged in"});
}
exports.getUser = getUser;
exports.signup = signup;
exports.login  = login;