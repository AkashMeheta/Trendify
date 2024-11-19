import React from 'react'
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import {getFriendDetails, getFriendWishlist} from "@/store/Friend/friends"
import { Badge } from "../ui/badge";
import FriendWishlist from '../Friends/Friends-wishlist';

const FriendProfile = ({friendId}) => {

  const {friendsList, friendDetails, friendWishlist} = useSelector((state)=> state.friends);
  const dispatch = useDispatch();
//incompelete
  useEffect(() => {
    dispatch(getFriendDetails(friendId));
    dispatch(getFriendWishlist(friendId));
    console.log("Friend Details", friendDetails)
  }, [])
  return (
      <Card className='card'> 
        <CardContent className="w-fit CardContent">
            <div className='flex justify-around items-center gap-9'>
              <div>
                <img src={friendDetails?.userDetails.image ? friendDetails?.userDetails.image : '/vite.svg'} alt="" className='w-28 h-28' />
              </div>
              <div className='flex flex-col mt-9'>
                <div className='flex gap-7'>
                  <h1 className='text-2xl font-bold text-black'>{`${friendDetails.userDetails.userName}`}</h1>
                  <Badge
                    className={`py-1 px-1 ${friendDetails.userDetails.role === "user"
                        ? "bg-green-500"
                        : friendDetails.role === "admin"
                          ? "bg-red-600"
                          : "bg-black"
                      }`}
                  >
                    {friendDetails.userDetails.role}
                  </Badge>
                </div>

                <h2 className='text-lg font-semibold text-black'>{`${friendDetails.userDetails.description ? friendDetails.userDetails.description : 'No Description Available'}`}</h2>
                <div className='flex flex-col justify-center items-center w-fit mt-6'>

                <div className='text-xl font-semibold text-black'>{friendDetails.friendInfo.friends ?  friendDetails.friendInfo.friends.length : 0}</div>
                <div className='text-xl font-semibold text-black'>Following</div>
                
                </div>
              </div>
            </div>
            
            <Tabs className='table' defaultValue="Wishlist">
                    <TabsList>
                        <TabsTrigger value="wishlist">Wishlist</TabsTrigger>{/* new */}
                    </TabsList>
                    <TabsContent value="wishlist">{/* new */}
                        <FriendWishlist friendId={friendId}/>
                    </TabsContent>
            </Tabs>
            
        </CardContent>
      </Card>
  )
}

export default FriendProfile;