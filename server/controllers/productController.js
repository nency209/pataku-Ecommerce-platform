import Product from "../model/Product.js";
import redisClient from "../config/redis.js";
import mongoose from "mongoose";


export const createProduct = async (req, res) => {
  try {
    const data = req.body;

    delete data.image;


    if (req.file) {
      data.image = req.file.path; 
    }

    const product = await Product.create(data);

    await redisClient.del("products:all");
    res.status(201).json(product);
  } catch (error) {
    // This will help you see Mongoose validation errors more clearly.
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    console.error("Create Product Error:", error);
    res.status(500).json({ message: "Server error during product creation." });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const cachedProducts = await redisClient.get("products:all");
    if (cachedProducts) {
      return res.json(JSON.parse(cachedProducts));
    }

    const products = await Product.find().sort({ createdAt: -1 });

    await redisClient.set("products:all", JSON.stringify(products), {
      EX: 3600,
    }); // Expire in 1 hour

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const cachedProduct = await redisClient.get(`product:${id}`);
    if (cachedProduct) {
      return res.json(JSON.parse(cachedProduct));
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await redisClient.set(`product:${id}`, JSON.stringify(product), {
      EX: 3600,
    }); 

    res.json(product);
  } catch (err) {
    console.error("❌ getProduct error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    if (req.file) {
      data.image = req.file.path;
    }

    
    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Promise.all([
      redisClient.del("products:all"),
      redisClient.del(`product:${id}`),
    ]);

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Promise.all([
      redisClient.del("products:all"),
      redisClient.del(`product:${id}`),
    ]);

    res.json({ message: "Product deleted successfully", id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
