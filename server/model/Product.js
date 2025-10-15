import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: [
      "Shoes",
      "Jewellery & Accessories",
      "Furniture",
      "Home & Garden",
    ],
  },
  stock: {
    type: Number,
    required: true,
    min: 0,
  },
  oldprice: {
    type: Number,
  },
  discount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  image: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  status: {
    type: String,
    enum: ["in_stock", "out_of_stock", "low_stock"],
    default: "in_stock",
  },
  created: { type: Date, default: Date.now },
});

// 🔹 Auto-generate SKU before saving
productSchema.pre("save", async function (next) {
  if (!this.sku) {
    const lastProduct = await mongoose
      .model("Product")
      .findOne({})
      .sort({ created: -1 });

    let nextNumber = 1;
    if (lastProduct && lastProduct.sku) {
      const lastNumber = parseInt(lastProduct.sku.replace("PROD-", ""), 10);
      if (!isNaN(lastNumber)) {
        nextNumber = lastNumber + 1;
      }
    }

    this.sku = `PROD-${String(nextNumber).padStart(4, "0")}`; // PROD-0001 format
  }

  // 🔹 Calculate discount
  if (this.oldprice && this.oldprice > this.price) {
    this.discount = Math.round(
      ((this.oldprice - this.price) / this.oldprice) * 100
    );
  }

  // 🔹 Update stock status
  if (this.stock === 0) {
    this.status = "out_of_stock";
  } else if (this.stock > 0 && this.stock <= 10) {
    this.status = "low_stock";
  } else {
    this.status = "in_stock";
  }

  next();
});

export default mongoose.model("Product", productSchema);
