const { validationResult } = require('express-validator');
const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid'); // To generate unique IDs
const mongoose=  require('mongoose');
const Details   =require('../models/details');

const User = require('../models/user');
/*let DUMMY_DETAILS= [{
  id:'p1',
  place:'coimbatore',
  message:"Suddenly get fire accident",
  contact:"6238612757",
  creator:"u1"
}];  */


const getDetailsById =async (req,res,next) =>{
  const detailsId = req.params.pid;

    let detail
    try{
      detail =await  Details.findById(detailsId)
    }
    catch(err){
   const error = new HttpError("Something went wrong",500);
    return next(error);
    }
    if(!detail){
      const error = new HttpError("Could not find details",404);
    return next(error);

    }
    res.json({detail:detail.toObject({getters: true})});
    
}

const getDetailsByUserId = async (req, res, next) => {
  const userId = req.params.uid;

  let userWithPlaces;
  try {
    userWithPlaces = await Details.find({ creator: userId });
  } catch (err) {
    const error = new HttpError("Fetching details failed, please try again later.", 500);
    return next(error);
  }

  if (!userWithPlaces || userWithPlaces.length === 0) {
    return next(new HttpError("No details found for the provided user ID.", 404));
  }

  res.json({ userWithPlaces: userWithPlaces.map(det => det.toObject({ getters: true })) });
};

const createDetails = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 404));
  }

  const { place, message, contact, creator, address } = req.body;

  const createdD = new Details({
    place,
    message,
    contact,
    address,
    image: "https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?cs=srgb&dl=pexels-souvenirpixels-414612.jpg&fm=jpg",
    creator
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError("Creating details failed, please try again later", 404);
    return next(error);
  }

  if (!user) {
    const error = new HttpError("Could not find user for provided id", 404);
    return next(error);
  }

  try {
    await createdD.save();
    user.details.push(createdD);
    await user.save();
  } catch (err) {
    const error = new HttpError("Creating details failed", 500);
    return next(error);
  }

  res.status(201).json({ details: createdD });
};




const updateDetails = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid inputs passed, please check your data", 404));
  }

  const { place, address } = req.body;
  const detailId = req.params.pid;

  let details;
  try {
    details = await Details.findById(detailId);
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update details", 500);
    return next(error);
  }

  if (!details) {
    const error = new HttpError("Could not find details for this id", 404);
    return next(error);
  }

  details.place = place;
  details.address = address;

  try {
    await details.save();
  } catch (err) {
    const error = new HttpError("Something went wrong, could not update details", 500);
    return next(error);
  }

  res.status(200).json({ details: details.toObject({ getters: true }) });
};

const deleteDetails = async(req,res,next) =>{
 const details = req.params.pid;

 let detail;
try{
  detail = await Details.findByIdAndDelete(details);


}
catch(err){
    const error = new HttpError("Deleting details failed", 500);
    return next(error);
}
if(!detail){
  const error = new HttpError("Could not find details for this id", 404);
  return next(error);
}
 res.status(200).json({message:"Deleted successfully"});
}
exports.getDetailsById = getDetailsById;
exports.getDetailsByUserId = getDetailsByUserId;
exports.createDetails = createDetails;
exports.updateDetails = updateDetails;
exports.deleteDetails = deleteDetails;