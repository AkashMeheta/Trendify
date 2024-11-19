const Wishlist = require("../../models/Wishlist");
const Product = require("../../models/Product");


const addToList = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        
        if (!userId || !productId || quantity <= 0) {
            return res.status(400).json({
              success: false,
              message: "Invalid data provided!",
            });
        }

        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({
              success: false,
              message: "Product not found",
            });
        }

        let list = await Wishlist.findOne({userId});

        if(!list){
            list = new Wishlist({userId, items: []});
        }

        const findCurrentProductIndex = list.items.findIndex(
            (item) => item.productId.toString() === productId
        );

        if(findCurrentProductIndex === -1){
            list.items.push({productId, quantity});
        }else{
            list.items[findCurrentProductIndex].quantity += quantity;
        }

        await list.save();
        res.status(200).json({
            success: true,
            message: "Product Added to the Wishlist",
            data: list,
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Some error occured",
            data: error
        })
    }
}

const fetchListItems = async (req, res) => {
    try{
        const { userId } = req.params;
        if(!userId){
            return res.status(400).json({
                success: false,
                message: "User id is manadatory!",
              });
        }

        const list = await Wishlist.findOne({ userId }).populate({
            path: "items.productId",
            select: "image title price salePrice",
          });
        if (!list) {
            return res.status(404).json({
              success: false,
              message: "list not found!",
            });
        }

        const validItems = list.items.filter(
            (productItem) => productItem.productId
        )
        
        if (validItems.length < list.items.length) {
            list.items = validItems;
            await list.save();
        }

        const populateListItems = validItems.map((item) => ({
            productId: item.productId._id,
            image: item.productId.image,
            title: item.productId.title,
            price: item.productId.price,
            salePrice: item.productId.salePrice,
            quantity: item.quantity,
        }))
        res.status(200).json({
            success: true,
            data: {
              ...list._doc,
              items: populateListItems,
            },
          });
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Wishlist not Found",
            data: error
        })
    }
}

const updateListItemQty = async (req, res) => {
// {Maybe Implement Later}
}

const deleteListItem = async (req, res) => {
  try{
    const { userId, productId } = req.params;
    if (!userId || !productId) {
        return res.status(400).json({
          success: false,
          message: "Invalid data provided!",
        });
    }

    const list = await Wishlist.findOne({userId});
    if(!list){
        return res.status(404).json({
            success: false,
            message: "List not found!",
        });
    }

    list.items = list.items.filter((item) => item.productId.toString() !== productId)

    await list.save();

    await list.populate({
        path: "items.productId",
        select: "image title price salePrice",
    })

    const populatelistItems = list.items.map((item) => ({
        productId: item.productId ? item.productId._id : null,
        image: item.productId ? item.productId.image : null,
        title: item.productId ? item.productId.title : "Product not found",
        price: item.productId ? item.productId.price : null,
        salePrice: item.productId ? item.productId.salePrice : null,
        quantity: item.quantity,
    }));
    res.status(200).json({
        success: true,
        data: {
          ...list._doc,
          items: populatelistItems,
        },
    });
  }catch(error){
    return res.status(500).json({
        success: false,
        message: "Some Error Occured",
        data: error
    })
  }
}


module.exports = {
    addToList,
    fetchListItems,
    updateListItemQty,
    deleteListItem,
}