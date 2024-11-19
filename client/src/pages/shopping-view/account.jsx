import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import accImg from "../../assets/account.jpg";
import Address from "@/components/shopping-view/address";
import ShoppingOrders from "@/components/shopping-view/orders";
import UserProfile from "@/components/user/user-profile";
import Wishlist from "@/components/user/Wishlist";

// {new}

function ShoppingAccount() {
  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={accImg}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="container mx-auto grid grid-cols-1 gap-8 py-8">
        <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
          <UserProfile></UserProfile> {/* new */}
          
          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="wishlist">Wishlist</TabsTrigger>{/* new */}
              <TabsTrigger value="address">Address</TabsTrigger>
            </TabsList>
            <TabsContent value="orders">
              <ShoppingOrders />
            </TabsContent>
            <TabsContent value="wishlist">{/* new */}
              <Wishlist />
            </TabsContent>
            <TabsContent value="address">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
    </div>
  );
}

export default ShoppingAccount;
