
const express = require("express")
const router = express.Router()
const { auth, isDoctor } = require("../middleware/auth")
const {
  deleteAccount,
  updateProfile,
  getAllUserDetails,
  updateDisplayPicture,

} = require("../controllers/profile")
const UserController = require('../controllers/profile');

router.delete("/deleteProfile", auth, deleteAccount)

router.put("/updateProfile", auth, updateProfile)

router.get("/getUserDetails", auth, getAllUserDetails)

router.get("/users",UserController.getUsers );

router.put("/updateDisplayPicture", auth, updateDisplayPicture)

router.get('/count', UserController.countUsersByAccountType);



module.exports = router
