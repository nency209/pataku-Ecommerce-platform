import Wishlist from '../model/Wishlist.js';
import redisClient from '../config/redis.js';
import mongoose from 'mongoose';


const cacheKey = (userId) => `wishlist:${userId}`;


const getAndCacheWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ userId }).populate({
    path: 'items.productId',
    model: 'Product',
    select: 'name price image', 
  });

  if (!wishlist || !wishlist.items) {
    await redisClient.del(cacheKey(userId)); 
    return [];
  }

  const formattedWishlist = wishlist.items.map((item) => ({
    productId: item.productId._id,
    name: item.productId.name,
    price: item.productId.price,
    image: item.productId.image,
    addedAt: item.addedAt,
  }));

  // Update the Redis cache
  await redisClient.set(cacheKey(userId), JSON.stringify(formattedWishlist), { EX: 3600 }); // Expire in 1 hour

  return formattedWishlist;
};

// --- Controller Functions ---

export const getWishlist = async (req, res) => {
  try {
    const userId = req.userId;

    // 1. Check Redis cache first
    const cachedWishlist = await redisClient.get(cacheKey(userId));
    if (cachedWishlist) {
      return res.json(JSON.parse(cachedWishlist));
    }

    // 2. If not in cache, fetch using our helper
    const wishlist = await getAndCacheWishlist(userId);
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params; 
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).json({ message: "Invalid Product ID" });
    }


    await Wishlist.findOneAndUpdate(
      { userId },
      { $addToSet: { items: { productId } } },
      { upsert: true, new: true }
    );

  
    const updatedWishlist = await getAndCacheWishlist(userId);

   

    res.status(200).json(updatedWishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.params;


    await Wishlist.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
    );

  
    const updatedWishlist = await getAndCacheWishlist(userId);
    

    res.json({ message: 'Removed from wishlist', wishlist: updatedWishlist });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};