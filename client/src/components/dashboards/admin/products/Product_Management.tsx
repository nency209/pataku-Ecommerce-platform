"use client";
import React, { useState, useEffect } from "react";
import {
  Card, CardContent, DropdownMenu, Button, Input, Label,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Dialog, DialogContent, DialogHeader, DialogTitle,
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  Badge,
} from "../../../ui"; // Adjust your import path
import {
  Plus, MoreHorizontal,
  IndianRupee,
  Download,
  Package,
  CheckCircle,
  AlertTriangle,
  XCircle,

} from "lucide-react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import api from "@/utils/api";
import { Product } from "@/types/Product";
import { AxiosResponse } from "axios";

// --- Main Product Management Component ---
export function ProductsManagement() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showProductDialog, setShowProductDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Add or Update Product
  const handleSaveProduct = async (
    values: Product,
    { resetForm, setSubmitting }: FormikHelpers<Product>
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("price", String(values.price));
      formData.append("stock", String(values.stock));
      formData.append("status", values.status);
      if (values.oldprice) formData.append("oldprice", String(values.oldprice));

      // ✅ Append image only if it's a new File
      if (values.image && (values.image as any) instanceof File) {
        formData.append("image", values.image);
      }

      let res: AxiosResponse<any, any>;
      if (values._id) {
        // ✅ Update product
        res = await api.put(`/products/${values._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) =>
          prev.map((p) => (p._id === values._id ? res.data : p))
        );
        toast.success("Product updated successfully");
      } else {
        // ✅ Create product
        res = await api.post("/products", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        setProducts((prev) => [...prev, res.data]);
        toast.success("Product added successfully");
      }

      resetForm();
      setShowProductDialog(false);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Delete Product
  const handleDeleteProduct = async () => {
    if (!productToDelete) return;
    try {
      await api.delete(`/products/${productToDelete._id}`);
      setProducts((prev) => prev.filter((p) => p._id !== productToDelete._id));
      toast.success(`Product "${productToDelete.name}" deleted successfully`);
      setProductToDelete(null);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      toast.error(error.response?.data?.message || "Failed to delete product");
    }
  };

  const openAddDialog = () => {
    setEditingProduct(null);
    setShowProductDialog(true);
  };

  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setShowProductDialog(true);
  };

  return (
    <div className="space-y-6 p-4 md:p-6">

            <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between ">
              <div>
                <p className="text-sm text-muted-foreground">Total Products</p>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <div className="w-8 h-8 bg-blue-100 rounded-lg  flex items-center justify-center">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">In Stock</p>
                <p className="text-2xl font-bold text-green-600">
                  {products.filter((p) => p.status === "in_stock").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {products.filter((p) => p.status === "low_stock").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Out of Stock</p>
                <p className="text-2xl font-bold text-red-600">
                  {products.filter((p) => p.status === "out_of_stock").length}
                </p>
              </div>
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <XCircle className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">

        <div>
          <h1 className="text-2xl font-bold">Products Management</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and inventory
          </p>
        </div>

        {/* Add/Edit Product Dialog */}
        <Dialog open={showProductDialog} onOpenChange={setShowProductDialog}>
          <DialogContent className="sm:max-w-2xl max-h-[90vh] bg-white overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm
              product={editingProduct}
              onSave={handleSaveProduct}
              onCancel={() => setShowProductDialog(false)}
            />
          </DialogContent>
        </Dialog>

        <Button onClick={openAddDialog}>
          <Plus className="w-4 h-4 mr-2" /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  Loading products...
                </TableCell>
              </TableRow>
            ) : products.length > 0 ? (
              products.map((p) => (
                <TableRow key={p._id}>
                  <TableCell>
                    <img
                      src={p.image || "/placeholder.png"}
                      alt={p.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell className="font-medium max-w-xs truncate">
                    {p.name}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        p.status === "in_stock"
                          ? "default"
                          : p.status === "low_stock"
                          ? "secondary"
                          : "destructive"
                      }
                      className="capitalize"
                    >
                      {p.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
  {p.oldprice ? (
    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
      <span className="text-muted-foreground line-through">₹{p.oldprice}</span>
      <span className="text-green-600 font-semibold">₹{p.price}</span>
    </div>
  ) : (
    <span className="text-green-600 font-semibold">₹{p.price}</span>
  )}
</TableCell>

                  <TableCell>{p.stock}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" >
                        <DropdownMenuItem onClick={() => openEditDialog(p)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setProductToDelete(p)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center h-24">
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete "{productToDelete?.name}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteProduct}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

// --- Product Form ---
interface ProductFormProps {
  product: Product | null;
  onSave: (values: Product, actions: FormikHelpers<Product>) => void;
  onCancel: () => void;
}

function ProductForm({ product, onSave, onCancel }: ProductFormProps) {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    category: Yup.string().required("Category is required"),
    price: Yup.number().required("Price is required").min(0),
    stock: Yup.number().required("Stock is required").min(0).integer(),
    oldprice: Yup.number().min(0).nullable(),
    status: Yup.string().required("Status is required"),
  });

  const initialValues: Product = {
    _id: product?._id || "",
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    oldprice: product?.oldprice,
    status: product?.status || "in_stock",
    image: product?.image,
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSave}
      enableReinitialize
    >
      {({ setFieldValue, isSubmitting }) => (
        <Form className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Field as={Input} name="name" id="name" />
              <ErrorMessage name="name" component="p" className="text-sm text-destructive" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Field as="select" name="category" id="category" className="w-full border rounded p-2 h-10">
                <option value="">Select a category</option>
                <option value="Shoes">Shoes</option>
                <option value="Furniture">Furniture</option>
                <option value="Jewellery & Accessories">Jewellery & Accessories</option>
                <option value="Home & Garden">Home & Garden</option>
              </Field>
              <ErrorMessage name="category" component="p" className="text-sm text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
  <Label htmlFor="image">Product Image</Label>

 
  {product?.image && typeof product.image === "string" && (
    <div className="mb-2">
      <img
        src={product.image}
        alt="Current Product"
        className="w-24 h-24 object-cover rounded border"
      />
      <p className="text-sm text-muted-foreground mt-1">
        Current image — you can upload a new one to replace it
      </p>
    </div>
  )}

  <Input
    id="image"
    name="image"
    type="file"
    accept="image/*"
    onChange={(e) => setFieldValue("image", e.currentTarget.files?.[0])}
  />
  <ErrorMessage name="image" component="p" className="text-sm text-destructive" />
</div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Price (₹)</Label>
              <Field as={Input} type="number" name="price" id="price" />
              <ErrorMessage name="price" component="p" className="text-sm text-destructive" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="oldprice">Old Price (₹)</Label>
              <Field as={Input} type="number" name="oldprice" id="oldprice" />
              <ErrorMessage name="oldprice" component="p" className="text-sm text-destructive" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Field as={Input} type="number" name="stock" id="stock" />
              <ErrorMessage name="stock" component="p" className="text-sm text-destructive" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Field as="select" name="status" id="status" className="w-full border rounded p-2 h-10">
              <option value="in_stock">In Stock</option>
              <option value="low_stock">Low Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </Field>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" type="button" onClick={onCancel} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : product ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
