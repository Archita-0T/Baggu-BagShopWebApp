const express = require('express');

const router = express.Router();
const {registerUser, loginUser, logout} = require("../controllers/authController");
router.get("/",function(req,res){
    res.send("hey");
})


// Registration route with validation
router.post('/register', registerUser );
router.post("/login", loginUser);
router.get("/logout", logout);



// 1st CODE 
// router.post("/register",async function(req,res){
//     try{
//         let {email, password, fullname}=req.body;
//         let user = await userModel.create({
//              email,
//              password,
//              fullname
//          });
//          res.send(user);
//     }catch(err){
//         console.log(err.message);
//     }
 
    
// });
module.exports = router;