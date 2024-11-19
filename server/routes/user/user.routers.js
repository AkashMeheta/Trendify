const express = require("express");
const {getUserDetails, updateUserDetails} = require("../../controllers/User/user-controller")
const router = express.Router();
const User = require("../../models/User");

router.get("/userDetails/:userId", getUserDetails);
router.put("/update/:userId", updateUserDetails)

module.exports = router;