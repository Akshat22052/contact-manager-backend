const express = require('express');

const router = express.Router();


const {  RegisterUser,LoginUser,CurrentUser } = require("../controllers/userControllers");
const validateToken = require('../middlewares/validateTokenHandler');





router.put("/register", RegisterUser);


router.post("/login" , LoginUser);

router.get("/current",validateToken, CurrentUser);



router.post("/logout",(req,res) => {
    res.status(200).json({
        message: "logout successful"
    })
});





module.exports = router;

