Payment Accout Email = "sb-w7jin33822459@personal.example.com"

Payment Accout Password = "rEh#cL(4"

APIs:

1) Auth:
	/api/auth/register (add user to the database)
	/api/auth/login (create a token and login)
	/api/auth/logout (logout and delete token & session)
	/api/auth/check-auth (check user is logedin/authenticated or not)
2) Admin Products:
	/api/admin/products/upload-image (upload product image)
	/api/admin/products/add (add a product details)
	/api/admin/products/edit/:id (edit a product details)
	/api/admin/products/delete/:id (delete a product)
	/api/admin/products/get (fetch all products)
3) Admin Orders:
	/api/admin/orders/get (get all orders of all user)
	/api/admin/orders/details/:id (get order details)
	/api/admin/orders/update/:id (update order status)
4) Shop Products:
	/api/shop/products/get (Filter Products using QUERY as ?category=accessories)
	/api/shop/products/get/:id (Product Details using Product ID)
5) Shop Cart:
	/api/shop/cart/add (add to cart)
	/api/shop/cart/get/:userId (fetch user cart details)
	/api/shop/cart/update-cart (update cart Item)
	/api/shop/cart/:userId/:productid (Delete Cart item)
6) Shop Address:
	/api/shop/address/add (add a address)
	/api/shop/address/get/:userId (fetch all address of a user)
	/api/shop/address/delete/:userId/:addressId (delete user address)
	/api/shop/address/update/:userId/:addressId (edit a user address)
7) Shop Order:
	/api/shop/order/create (Create/Place a order)
	/api/shop/order/capture (Capture Payment using Paypal sandbox sdk)
	/api/shop/order/list/:userId (fetch all orders of a user)
	/api/shop/order/details/:id (get a order item details)
8) Shop Search Filter
	/api/shop/search/:keyword (Search using the keyword)
9) Shop Review:	
	/api/shop/review/add (add a review)
	/api/shop/review/:productid (get all product reviews)
10) Add Feature Image:
	/api/common/feature/add (add image)
	/api/common/feature/get (get all image)
