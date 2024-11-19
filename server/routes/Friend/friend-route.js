const express = require("express");
const router= express.Router();
const {
    addFriend,
    getAllUserFriend,
    deleteFriend,
    getSearchResult
} = require("../../controllers/Friend/friend-controller")


router.get("/:userId", getAllUserFriend)
router.post("/add", addFriend)
router.delete("/:userId/:friendId", deleteFriend)
router.get("/search/:keyword", getSearchResult)


module.exports = router;