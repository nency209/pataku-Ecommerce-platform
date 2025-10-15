import Cart from "../model/Cart.js";
import redisClient from "../config/redis.js";

const findAndCacheCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate({
    path: "items.product",
    model: "Product",
  });

  if (cart) {
    await redisClient.set(`cart:${userId}`, JSON.stringify(cart), {
      EX: 3600,
    });
  } else {
    await redisClient.del(`cart:${userId}`);
  }
  return cart;
};

// --- Controller Functions ---

export const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    const cachedCart = await redisClient.get(`cart:${userId}`);
    if (cachedCart) {
      console.log("📦 Cart from Redis Cache");
      return res.json(JSON.parse(cachedCart));
    }

    const cart = await findAndCacheCart(userId);
    res.json(cart);
  } catch (err) {
    console.error("Get cart failed:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    const cart = await Cart.findOne({ user: userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(
        (p) => p.product.toString() === productId
      );

      if (itemIndex > -1) {
        await Cart.updateOne(
          { user: userId, "items.product": productId },
          { $inc: { [`items.${itemIndex}.quantity`]: quantity } }
        );
      } else {
        await Cart.updateOne(
          { user: userId },
          { $push: { items: { product: productId, quantity } } }
        );
      }
    } else {
      await Cart.create({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    }

    const updatedCart = await findAndCacheCart(userId);
    res.json(updatedCart);
  } catch (err) {
    console.error("Add to cart failed:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    if (quantity < 1) {
      return res.status(400).json({ error: "Quantity must be at least 1" });
    }

    await Cart.findOneAndUpdate(
      { user: userId, "items.product": productId },
      { $set: { "items.$.quantity": quantity } }
    );

    const updatedCart = await findAndCacheCart(userId);
    res.json(updatedCart);
  } catch (err) {
    console.error("Update cart failed:", err);
    res.status(500).json({ error: "Failed to update cart" });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.userId;

    await Cart.updateOne(
      { user: userId },
      { $pull: { items: { product: productId } } }
    );

    const updatedCart = await findAndCacheCart(userId);
    res.json(updatedCart);
  } catch (err) {
    console.error("Remove from cart failed:", err);
    res.status(500).json({ error: "Failed to remove item from cart" });
  }
};
