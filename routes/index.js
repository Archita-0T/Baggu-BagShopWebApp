const express = require("express");
const router = express.Router();
router.get("/",function(req,res){
    const error = [];
    res.render("index", { error: error });
});

module.exports=router;