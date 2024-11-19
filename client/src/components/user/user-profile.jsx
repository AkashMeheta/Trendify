import React from 'react'
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDetails,
  updateUserDetails
} from "@/store/user/UserDetails";
import {
  addFriend,
  getFriendList,
  deleteFriend
} from "@/store/Friend/friends"
import ProductImageUpload from '../admin-view/image-upload';
import Friendstabs from '../Friends/Friends-tabs';
import { Badge } from "../ui/badge";
import { userFormControls } from '@/config';
import CommonForm from "../common/form";

const initialUserDetails = {
  userName: "",
  description: "",
}

const UserProfile = () => {
  const [formData, setFormData] = useState(initialUserDetails);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const userDetails = useSelector((state) => state.userSlice);
  const { userName, userRole, userDescription } = useSelector((state) => state.userSlice);
  const {friendsList} = useSelector((state)=> state.friends);
  const dispatch = useDispatch();

  const handleEditUserDetails = (event) => {
    event.preventDefault();
    dispatch(updateUserDetails({
      userName: formData.userName,
      userDescription: formData.description,
      userId: user.id,
      userImg: uploadedImageUrl
    }));
    setFormData(initialUserDetails);
    setImageFile(null);
  }

  const isFormValid = () => {
    return Object.keys(formData)
      .map((key) => formData[key].trim() !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(getUserDetails(user?.id));
    dispatch(getFriendList(user?.id));
  }, [userName, userDescription])
  return (
    <div className='mb-4'>
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-between'>
            <div className='flex justify-items-start items-center gap-9'>
              <div>
                <img src={userDetails?.userImg ? userDetails?.userImg : '/vite.svg'} alt="" className='w-44 h-44' />
              </div>
              <div className='flex flex-col'>
                <div className='flex gap-7'>
                  <h1 className='text-2xl font-bold text-black'>{`${userName}`}</h1>
                  <Badge
                    className={`py-1 px-1 ${userRole === "user"
                        ? "bg-green-500"
                        : userRole === "admin"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                  >
                    {userRole}
                  </Badge>
                </div>

                <h2 className='text-xl font-semibold text-black'>{`${userDescription ? userDescription : 'No Description Available'}`}</h2>
                <div className='flex flex-col justify-center items-center w-fit mt-6'>
                <Dialog>
                <DialogTrigger asChild>
                  <button
                    onClick={() => {
                      setCurrentEditedId(user?._id);
                    }}
                  >
                    <div className='text-xl font-semibold text-black'>{friendsList ?  friendsList.length : 0}</div>
                    <div className='text-xl font-semibold text-black'>Following</div>
                  </button>
                </DialogTrigger>
                <DialogContent className="w-fit h-fit p-5">
                  <DialogHeader>
                    <DialogTitle>Friend List</DialogTitle>
                    <DialogDescription>
                      looking for New Friends?
                    </DialogDescription>
                  </DialogHeader>
                  <Friendstabs/>
                </DialogContent>
              </Dialog>
                  
                </div>
              </div>
            </div>
            <div className='m-7'>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setCurrentEditedId(user?._id);
                    }}
                  >
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-fit h-fit p-5">
                  <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <ProductImageUpload
                    imageFile={imageFile}
                    setImageFile={setImageFile}
                    uploadedImageUrl={uploadedImageUrl}
                    setUploadedImageUrl={setUploadedImageUrl}
                    setImageLoadingState={setImageLoadingState}
                    imageLoadingState={imageLoadingState}
                    isEditMode={false}
                  />
                  <CommonForm
                    formControls={userFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? "Save" : "Add"}
                    onSubmit={handleEditUserDetails}
                    isBtnDisabled={!isFormValid()}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>

        </CardContent>
      </Card>
    </div>

  )
}

export default UserProfile;