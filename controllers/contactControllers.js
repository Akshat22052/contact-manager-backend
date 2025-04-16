
// const asyncHandler = require("express-async-handler");
// const { constants } = require("../constants");


// //@desc Get all Contacts
// //@route GET /api/v1/contact
// //@access Public
// const getContact = (req,res) => {
//     res.status(200).json({
//         message: "Hello from the contact route"
//     })
// }

// //@desc POST single Contact
// //@route POST /api/v1/contact/:id
// //@access Public



// const createContact = (req,res) => {
//     console.log("the request body is ", req.body);
//     const {name,email} = req.body;
//     if (!name || !email){
//         res.status(400);
//         throw  new Error("Please provide all fields");  
//     }
//     res.status(201).json({
//         message: "Contact created successfully",
//         data: req.body
//     })
// }



// const updateContact = (req,res) => {
//     res.status(200).json({
//         message: "Contact updated successfully",
//     })
// }
// const deleteContact = (req,res) => {
//     res.status(200).json({
//         message: "Contact deleted successfully",
//     })
// }





// module.exports = { getContact, createContact , updateContact, deleteContact };
// //@desc Get single Contact;




const asyncHandler = require("express-async-handler"); // Import async handler


const Contact = require("../models/contactModels"); // Import the Contact model 





//@desc Get all Contacts
//@route GET /api/v1/contact
//@access Public
// const getContact = asyncHandler(async (req, res) => {
//     const contacts = await Contact.find(); // Find all contacts
//     if (!contacts || contacts.length === 0) {
//         res.status(404);
//         throw new Error("No contacts found"); // If no contacts are found, throw an error
//     }
//     res.status(200).json(contacts); // Send the contacts as a response

//     // res.status(200).json({
//     //     message: "Hello from the contact route",

//     // });
// });

const getContact = asyncHandler(async (req, res) => {
   const contact = await Contact.find({user_id : req.user.id}); // Find all contacts for the user
   if (!contact) {
        res.status(404);
        throw new Error("Contact not found!");
   }
   res.status(200).json(contact);
});




//@desc POST single Contact
//@route POST /api/v1/contact/:id
//@access Public
const createContact = asyncHandler(async (req, res) => {
    console.log("The request body is ", req.body);
    const { name, email,phone  } = req.body;
    // Check if required fields are missing
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("Please provide all fields"); // This will be caught by the async handler
    }
    contact = await Contact.create({
        name,
        email,
        phone,
        user_id : req.user.id
    }); // Create a new contact using the Contact model
    // If the contact is created successfully, send a success response
    // If validation passes, send a success response
    res.status(201).json(contact);
});



//@desc Update single Contact
//@route PUT /api/v1/contact/:id
//@access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
         res.status(404);
         throw new Error("Contact not found!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true, // Return the updated document
        }
    );
    res.status(200).json(updatedContact);
});



//@desc Delete single Contact
//@route DELETE /api/v1/contact/:id
//@access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
         res.status(404);
         throw new Error("Contact not found!");
    }
    await Contact.findByIdAndDelete(req.params.id); // Delete the contact
    res.status(200).json({ message: "Contact deleted successfully" }); // Send a success response
});

module.exports = { getContact, createContact, updateContact, deleteContact };



