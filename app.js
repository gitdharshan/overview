const express = require('express');
const UpdateRoutes=  require('./routes/Update-route');
const UserRoutes = require('./routes/User-route');
const mongoose = require('mongoose');

const PORT=  6000;
const app = express();
app.use(express.json());


app.use('/api/details',UpdateRoutes);
app.use('/api/users',UserRoutes)
app.use((error,req,res,next) =>{
  if(res.headerSent){
    return next(error);
  }

  res.status(error.code || 500);
  res.json({message:error.message ||"An unkonwn error occured"});

})

mongoose.connect('mongodb://localhost:27017/fire-db').then(() =>{
  console.log("Connected successfully");
})
.catch((err) =>{
  console.log(err,"Error to connect");
})

app.listen(PORT);