const express = require("express");
const router = express.Router();


router.get("/add", async (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Item added",
    })
})

module.exports =  router;