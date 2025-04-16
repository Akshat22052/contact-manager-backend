const express = require('express');

const router = express.Router();

const {getContact,createContact,deleteContact,updateContact} = require('../controllers/contactControllers');
const validateToken = require('../middlewares/validateTokenHandler');


// router.get('/:id', (req, res) => {
//     const id2  = req.params.id;
//     res.status(200).json({
//         message: `Hello from the contact route ${id2}`,
//     });
// }); 


router.use(validateToken); // Apply token validation middleware to all routes in this router


router.route("/").get(getContact).post(createContact);


router.route("/:id").delete(deleteContact).put(updateContact);


router.route("/:id").put(updateContact);


// router.post("/",(req,res) =>{
//     res.status(200).json({
//         message: "Hello from the contact post route"
//     })
// })



// router.put("/",(req,res) => {
    
//     res.status(200).json({
//         message: "Hello from the contact put route"
//     })
// })


// router.delete("/",(req,res) =>{
    
//     res.status(200).json({
//         message: "Hello from the contact delete route"
//     })
// })

module.exports = router;

