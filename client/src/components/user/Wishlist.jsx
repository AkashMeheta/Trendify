import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Dialog } from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Toggle from "../ui/toggle";
import { useDispatch, useSelector } from "react-redux";
import {
    getListItems,
    deleteListItems
} from "../../store/user/wishlist"
import { useToast } from "../ui/use-toast";

function Wishlist() {
  const {toast} = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { listitems } = useSelector((state) => state.wishList);

  const handelDeleteItem = (userId, productId) => {
    dispatch(deleteListItems({
        userId: userId,
        productId: productId
    })).then((data) => {  
      if (data?.payload?.success) {
        dispatch(getListItems({
          userId: user.id
        }));
        toast({
          title: "Product Deleted From Wishlist",
        });
      }
    });
  }

  useEffect(() => {
    dispatch(getListItems({
        userId: user.id
    }));
  }, [dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl text-black font-semibold">Wishlist</h1>
            <Toggle userID={user.id}/>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>SalePrice</TableHead>
              <TableHead>
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {listitems && listitems.length > 0
              ? listitems.map((ListItem) => (
                  <TableRow key={ListItem?.productId}>
                    <TableCell><img src={`${ListItem?.image}`} alt="" className="w-12 h-12 object-cover rounded-md md:w-16 md:h-16"/></TableCell>
                    
                    <TableCell>{ListItem?.title}</TableCell>
                    <TableCell>${ListItem?.price}</TableCell>
                    <TableCell>${ListItem?.salePrice}</TableCell>
                    <TableCell>
                      <Button onClick={()=> handelDeleteItem(user?.id, ListItem?.productId)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default Wishlist;
