const User = require("../../models/User");
const getUserDetails = async (req, res) => {
    try{
       const { userId } = req.params;
       const details = await User.findById({_id: userId});
       if(details){
           return res.status(200).json({
               success: true,
               message: "User Details found",
               userDetails: details,
           });
       }else{
           return res.status(404).json({
               success: false,
               message: "User not found!",
             });
       }
    }catch (e) {
       console.log(e);
       res.status(500).json({
         success: false,
         message: "Some error occured!",
       });
    }
   }

const updateUserDetails = async (req, res) => {
    try {
        const { userName, userDescription, userImg} = req.body;
        const {userId} = req.params;
        if (!userId || !userName || !userDescription || !userImg) {
            return res.status(400).json({
              success: false,
              message: "Invalid data provided!",
            });
          }
        
        const userData = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          {userName: userName,
            description: userDescription,
            image: userImg
          },
          { new: true }
        );
        if (!userData) {
            return res.status(404).json({
              success: false,
              message: "user Data not found!",
            });
          } 
          res.status(200).json({
            success: true,
            message: "Profile Updated",
            data: userData
          });
    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured",
        })
    }
}

module.exports = {
    getUserDetails,
    updateUserDetails
}