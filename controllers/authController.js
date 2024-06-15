const bcrypt = require('bcrypt');
const userModel = require("../models/user-model");
const jwt = require('jsonwebtoken');
const { registerSchema } = require('../validations/authValidation');
const {generateToken} = require("../utils/generateToken");
module.exports.registerUser = async (req, res) => {
    try {
      // Validate the request body against the schema
      const { error } = registerSchema.validate(req.body);
  
      // If validation fails, return a 400 error with the validation message
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      // Destructure validated fields from request body
      let { email, password, fullname } = req.body;
let user = await userModel.findOne({email: email});
if(user) return res.status(401).send("You already have an account, please login.");
bcrypt.genSalt(10, function(err, salt){
    bcrypt.hash(password, salt, async function(err, hash){
        if(err) return res.send(err.message);
        else {
 // Create a new user
 let user = await userModel.create({
    email,
    password: hash,
    fullname,
  });
  let token = generateToken(user);
  res.cookie("token",token);
  res.send("user created successfully");
        }
    })
})


//   // Send the created user as a response
//   res.status(201).json(user);
} catch (err) {
  
  res.send(err.message);
}
}

module.exports.loginUser = async (req, res) => {
    let {email, password} = req.body;
   let user = await userModel.findOne({email:email});

   if(!user){
    req.flash("error", "Email or Password incorrect");
    return res.redirect("/");
   }
   bcrypt.compare(password, user.password, function(err, result){
    if(result){
       let token = generateToken(user);
       res.cookie("token", token);
       res.redirect("/shop");
    
    }
    else{
        req.flash("error", "Email or Password incorrect");
        return res.redirect("/");

    }
})
}

module.exports.logout= function(req, res){
    res.cookie("token", "");
    res.redirect("/");
}
    
    
    
    
    
 
