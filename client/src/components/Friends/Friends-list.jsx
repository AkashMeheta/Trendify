import React, { useEffect, useState } from 'react'
import { MdAutoDelete } from "react-icons/md";
import {Table,TableBody,TableCell,TableHead,TableHeader,TableRow,} from "../ui/table";
import {Dialog,DialogContent,DialogDescription,DialogHeader,DialogTitle,DialogTrigger,} from "@/components/ui/dialog"
import { Button } from '../ui/button';
import {deleteFriend,} from "@/store/Friend/friends"
import { useDispatch, useSelector } from 'react-redux';
import { getFriendList } from "../../store/Friend/friends/index"
import { useToast } from '../ui/use-toast';
import FriendProfile from "../Friends/Friend-Profile"

const Friendslist = () => {
    const {toast} = useToast()
    const dispatch = useDispatch();
    const { friendsList } = useSelector((state) => state.friends);
    const { userId } = useSelector((state) => state.userSlice);
    const [CurrentEditedId, setCurrentEditedId] = useState("")
    const handelDeleteFriend = (friendId) => {
        dispatch(deleteFriend({
            userId: userId, 
            friendId: friendId
        })).then((data) => {
            dispatch(getFriendList(userId))
            if(data?.payload.success){
                toast({
                    title: "Friend Removed"
                })
            }
        })
    }

    useEffect(()=>{
        dispatch(getFriendList(userId))
       
    }, [])
  return (
    <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Since</TableHead>
                <TableHead>
                    <span className="sr-only">Details</span>
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {
                friendsList && friendsList.length > 0 ? 
                friendsList.map((friend) => (
                    <TableRow key={friend?.friendId._id}>
                        <TableCell><img src={friend?.friendId.image ? friend?.friendId.image : "/vite.svg"} alt="" className="w-8 h-8 object-cover rounded-md md:w-10 md:h-10"/></TableCell>
                        <Dialog className="w-full">
                            <DialogTrigger asChild>
                            <button
                                onClick={() => {
                                setCurrentEditedId(friend?.friendId._id);
                                }}
                            >
                                <TableCell className="text-xl font-semibold text-black shadow-lime-50">{friend?.friendId.userName}</TableCell>
                            </button>
                            </DialogTrigger>
                            <DialogContent >
                                <DialogHeader>
                                    <DialogTitle>{friend?.friendId.userName + " Profile"}</DialogTitle>
                                    <DialogDescription></DialogDescription>
                                </DialogHeader>
                                
                                <FriendProfile friendId={friend?.friendId._id}/>
                            </DialogContent>
                        </Dialog>
                        
                        <TableCell className="text-xl font-semibold text-black shadow-lime-50">{friend?.addedAt.split("T")[0]}</TableCell>
                        <TableCell className="text-xl font-semibold text-black shadow-lime-50">
                                <Button onClick={()=>handelDeleteFriend(friend?.friendId._id)}>
                                    <MdAutoDelete />
                                </Button>
                        </TableCell>
                    </TableRow>
                    )) : <TableRow>
                            <TableCell className="text-xl font-semibold text-black shadow-lime-50">"No Friends Yet"</TableCell>
                        </TableRow>
            }
        </TableBody>
    </Table>
  )
}

export default Friendslist