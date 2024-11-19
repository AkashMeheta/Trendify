const express = require("express");
const {
    addToList,
    fetchListItems,
    updateListItemQty,
    deleteListItem,
} = require("../../controllers/User/user-wishlist-controller")
const router = express.Router();

router.post("/add", addToList)
router.get("/get/:userId", fetchListItems)
router.put("/update-list", updateListItemQty)
router.delete("/:userId/:productId", deleteListItem)

module.exports = router;