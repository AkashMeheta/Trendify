const User = require("../../models/User");
const Friends = require("../../models/Friends");
const mongoose = require("mongoose")
const addFriend = async (req, res) => {
    try {
      const { userId, friendId } = req.body;
  
      if (!userId || !friendId) {
        return res.status(400).json({
          success: false,
          message: "Both userId and friendId are required.",
        });
      }
      
      if (userId === friendId) {
        return res.status(200).json({
          success: false,
          toast: true,
          message: "You cannot add yourself as a friend.",
        });
      }
      
      if (!mongoose.Types.ObjectId.isValid(userId) || !mongoose.Types.ObjectId.isValid(friendId)) {
        return res.status(400).json({
          success: false,
          message: "Invalid userId or friendId provided.",
        });
      }
  

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found.",
        });
      }
  
      const friend = await User.findById(friendId);
      if (!friend) {
        return res.status(404).json({
          success: false,
          message: "Friend not found.",
        });
      }

      let friendsList = await Friends.findOne({ userId });
      if (!friendsList) {
        friendsList = new Friends({ userId, friends: [] });
      }
  

      const isAlreadyFriend = friendsList.friends.some(
        (friend) => friend.friendId.toString() === friendId
      );
  
      if (isAlreadyFriend) {
        return res.status(200).json({
          success: true,
          toast: true,
          message: "Friend is already added.",
        });
      }
  
    
      friendsList.friends.push({ friendId });
      await friendsList.save();
  
      res.status(200).json({
        success: true,
        message: "Friend added successfully.",
        friendsList,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "An error occurred while adding the friend.",
        data: error.message || error,
      });
    }
  };
  

const getAllUserFriend = async (req, res) => {
    try {
        const { userId } = req.params;
        if(!userId){
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const friendsList = await Friends.findOne({userId}).populate({
            path: "friends.friendId",
            select: "image userName"
        });
        if(!friendsList){
            return res.status(200).json({
                success: true,
                message: "No Friends Yet",
                data: []
            })
        }else{
            return res.status(200).json({
                success: true,
                message: "Friend List sended",
                data: friendsList
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
            data: error
        })
    }
}

const deleteFriend = async (req, res) => {
 try {
    const { userId, friendId } = req.params;
    if(!userId || !friendId){
        return res.status(400).json({
            success: false,
            message: "Invalid data provided!",
        }); 
    }

    const friendList = await Friends.findOne({userId});
    if (!friendList) {
        return res.status(404).json({ message: "Friends list not found" });
    }

    friendList.friends = friendList.friends.filter(
        (friend) => friend.friendId.toString() !== friendId
    );
  
    await friendList.save();
    res.status(200).json({ 
      success: true,
      message: "Friend removed successfully", 
      friendList 
    });
 } catch (error) {
    return res.status(500).json({
        success: false,
        message: "Some error occured",
        data: error
    })
 }
}

const getSearchResult = async (req, res) => {
  try{
    const { keyword } = req.params;
    if (!keyword || typeof keyword !== "string") {
      return res.status(400).json({
        succes: false,
        message: "Keyword is required and must be in string format",
      });
    }

    const regEx = new RegExp(keyword, "i");
    const createSearchQuery = {
      $or: [
        {userName: regEx},
        {description: regEx},
        {role: regEx},
      ],
    }

    const searchResults = await User.find(createSearchQuery);
    res.status(200).json({
      success: true,
      data: searchResults,
    });
  }catch(error){
    res.status(500).json({
      success: false,
      message: "Error",
      data: error
    });
  }
}
module.exports = {
    addFriend,
    getAllUserFriend,
    deleteFriend,
    getSearchResult
}

