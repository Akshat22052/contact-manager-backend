const express = require('express');

const router = express.Router();


const {  RegisterUser,LoginUser,CurrentUser } = require("../controllers/userControllers");


router.put("/register", RegisterUser);


router.post("/login" , LoginUser);

router.get("/current",CurrentUser);



router.post("/logout",(req,res) => {
    res.status(200).json({
        message: "logout successful"
    })
});





module.exports = router;

