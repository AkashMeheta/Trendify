import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePrivacy } from "../../store/user/wishlist"

const Toggle = ({userID}) => {
  
    const dispatch = useDispatch();
    const {privacy} = useSelector((state)=> state.wishList)


    const [isPrivate, setIsPrivate] = useState(false); // false = Public, true = Private
    useEffect(()=>{
        setIsPrivate(privacy);
    }, [])
    const togglePrivacy = () => {
        setIsPrivate((prev) => !prev);
        dispatch(updatePrivacy({
            userId: userID,
            privacy: isPrivate
        }));
    };

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={togglePrivacy}
        className={`px-4 py-2 rounded-md text-white ${
          isPrivate ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {isPrivate ? "Public" : "Private"}
      </button>
    </div>
  );
};

export default Toggle;
