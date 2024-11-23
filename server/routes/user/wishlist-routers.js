const express = require("express");
const {
    addToList,
    fetchListItems,
    updateListItemQty,
    deleteListItem,
    updatePrivacy
} = require("../../controllers/User/user-wishlist-controller")
const router = express.Router();

router.post("/add", addToList)
router.get("/get/:userId", fetchListItems)
router.put("/update-list", updateListItemQty)
router.delete("/:userId/:productId", deleteListItem)
router.put("/update/privacy", updatePrivacy)
module.exports = router;