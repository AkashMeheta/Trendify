import React from 'react'
import { IoPersonAddOutline } from "react-icons/io5";
import { getSearchResult, resetSearchResults} from "../../store/Friend/Search-friend"
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import {Input} from "../ui/input"
import { Button } from '../ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table";
import {
    addFriend
} from "@/store/Friend/friends"
import { useToast } from '../ui/use-toast';

const Friendssearch = () => {
    const {toast} = useToast();
    const [keyword, setKeyword] = useState("");
    const searchResults = useSelector((state) => state.searchFriend);
    const {userId} = useSelector((state)=>state.userSlice);
    const [searchParams, setSearchParams] = useSearchParams();
    const dispatch = useDispatch();

    const handelAddFriend = (friendId) => {
        dispatch(addFriend({
            userId: userId, 
            friendId: friendId
        })).then((data) => {
            if(data?.payload.success){
                toast({
                    title: "Friend Added"
                })
            }else if(data?.payload.toast){
                console.log("message", data?.payload.message)
                toast({
                    title: data?.payload.message
                })
            }
        })
    }


    useEffect(() => {
        if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
          setTimeout(() => {
            setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
            dispatch(getSearchResult(keyword));
          }, 1000);
        } else {
          setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
          dispatch(resetSearchResults());
        }
      }, [keyword]);
    console.log("Search Friends: ", searchResults.searchResult);
  return (
    <>
        <div className="w-full flex items-center">
            <Input
                value={keyword}
                name="keyword"
                onChange={(event) => setKeyword(event.target.value)}
                className="py-6 w-fit"
                placeholder="Search Products..."
            />
        </div>
        <div>
            {searchResults.searchResult && searchResults.searchResult.length > 0 ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>
                                <span className="sr-only">Details</span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            searchResults.searchResult.map((friend) => (
                                <TableRow key={friend?._id}>
                                    <TableCell><img src={friend?.image ? friend?.image : "/vite.svg"} alt="" className="w-8 h-8 object-cover rounded-md md:w-10 md:h-10"/></TableCell>
                                    <TableCell className="text-xl font-semibold text-black shadow-lime-50">{friend?.userName}</TableCell>
                                    <TableCell className="text-xl font-semibold text-black shadow-lime-50">
                                        <Button onClick={()=>handelAddFriend(friend?._id)}>
                                            <IoPersonAddOutline />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))   
                        }
                    </TableBody>
                </Table>
            ) : (
                <p className='text-xl text-black font-semibold m-6'>No friends found.</p>
            )}
        </div>
    </> 

  )
}

export default Friendssearch