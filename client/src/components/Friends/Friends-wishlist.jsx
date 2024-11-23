import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useDispatch, useSelector } from "react-redux";
import { getFriendWishlist, getFriendDetails } from "@/store/Friend/friends"
import { useToast } from "../ui/use-toast";

function FriendWishlist({friendId}) {
  const {toast} = useToast();
  const dispatch = useDispatch();

  const {friendWishlist, friendsList, friendPrivacy} = useSelector((state)=> state.friends);

  useEffect(() => {
    dispatch(getFriendWishlist(friendId));
    dispatch(getFriendDetails(friendId));
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>SalePrice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {friendPrivacy ? <TableRow>
                    <TableCell>
                        Wishlist is Private
                    </TableCell>
                </TableRow> :friendWishlist && friendWishlist.length > 0
              ? friendWishlist.map((ListItem) => (
                  <TableRow key={ListItem?.productId}>
                    <TableCell><img src={`${ListItem?.image}`} alt="" className="w-12 h-12 object-cover rounded-md md:w-16 md:h-16"/></TableCell>
                    
                    <TableCell>{ListItem?.title}</TableCell>
                    <TableCell>${ListItem?.price}</TableCell>
                    <TableCell>${ListItem?.salePrice}</TableCell>
                  </TableRow>
                ))
              : <TableRow>
                    <TableCell>
                        No Product added Yet!
                    </TableCell>
                </TableRow>}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default FriendWishlist;
