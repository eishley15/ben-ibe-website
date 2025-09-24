import React, { useState, useEffect } from "react";

// You'll need to install shadcn/ui for these components in a React project
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { CheckCircle2, XCircle } from "lucide-react";

const ProductAdmin = () => {
  const [products, setProducts] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // State for the form inputs
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [flowerType, setFlowerType] = useState("");
  const [color, setColor] = useState("");
  const [file, setFile] = useState(null);

  // Computed property to check if we're in editing mode
  const isEditing = editingId !== null;

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/products");
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setErrorMessage("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  // Start editing a product
  const editProduct = (product) => {
    setEditingId(product._id);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description || "");
    setFlowerType(product.flowerType || "");
    setColor(product.color || "");
    setFile(null); // Clear file input
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Cancel editing and reset form
  const cancelEdit = () => {
    setEditingId(null);
    setName("");
    setPrice("");
    setDescription("");
    setFlowerType("");
    setColor("");
    setFile(null);
    setSuccessMessage("");
    setErrorMessage("");
  };

  // Handle file upload
  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  // Submit function
  const submitForm = async (event) => {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // Basic validation
    if (!name || !price || (!isEditing && !file)) {
      setErrorMessage("Name, price, and an image are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("flowerType", flowerType);
    formData.append("color", color);

    if (file) {
      formData.append("image", file);
    }

    try {
      let res;
      if (isEditing) {
        // Update existing product
        res = await fetch(`http://localhost:3000/api/products/${editingId}`, {
          method: "PUT",
          body: formData,
        });
      } else {
        // Create new product
        res = await fetch("http://localhost:3000/api/products", {
          method: "POST",
          body: formData,
        });
      }

      if (res.ok) {
        setSuccessMessage(
          isEditing
            ? "Product updated successfully!"
            : "Product added successfully!"
        );
        // Reset form and editing state
        cancelEdit();
        // Refresh the table
        await fetchProducts();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const data = await res.json();
        setErrorMessage(
          data.message || "Something went wrong. Please try again."
        );
      }
    } catch (err) {
      console.error("Submit error:", err);
      setErrorMessage("Server error. Please try again later.");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setSuccessMessage("Product deleted successfully!");
        setErrorMessage("");
        await fetchProducts();
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const data = await res.json();
        setErrorMessage(data.message || "Delete failed.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      setErrorMessage("Server error while deleting.");
    }
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#FFF8F0] p-6">
      <div className="flex items-center justify-between mb-6">
        <a
          href="/"
          className="text-sm !text-[9C332A] !m-10 text-muted-foreground hover:underline"
        >
          Back to Home
        </a>
        <h1 className="text-2xl font-bold text-center flex-1">
          Product Management
        </h1>
        <div className="w-12"></div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <Alert className="mb-4 border-green-500 text-green-700 bg-green-50">
          <CheckCircle2 className="h-5 w-5 text-green-600" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      )}

      {errorMessage && (
        <Alert className="mb-4 border-red-500 text-red-700 bg-red-50">
          <XCircle className="h-5 w-5 text-red-600" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Product Form */}
      <div className="w-full flex flex-col items-center !m-10">
        <div className="w-full max-w-md mx-auto border border-border rounded-xl !p-6 shadow-md bg-card mb-8">
          <h2 className="text-xl font-semibold text-center mb-6">
            {isEditing ? "Edit Product" : "Add New Product"}
          </h2>
          <form onSubmit={submitForm} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Product Name
              </label>
              <Input
                type="text"
                placeholder="Product Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price</label>
              <Input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <Input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* New form fields */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Flower Type
              </label>
              <select
                value={flowerType}
                onChange={(e) => setFlowerType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#7a9d7a]"
              >
                <option value="">Select a type</option>
                <option value="Fresh Flowers">Fresh Flowers</option>
                <option value="Dried Flowers">Dried Flowers</option>
                <option value="Balloon">Balloon</option>
                <option value="Personalized Gift">Personalized Gift</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Color</label>
              <select
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#7a9d7a]"
              >
                <option value="">Select a color</option>
                <option value="Red">Red</option>
                <option value="Pink">Pink</option>
                <option value="Yellow">Yellow</option>
                <option value="Purple">Purple</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Select Product Image {isEditing ? "(Optional)" : "(Required)"}
              </label>
              <Input type="file" onChange={handleFileUpload} accept="image/*" />
            </div>

            <div className="flex gap-2 mt-4">
              <Button type="submit" className="flex-1">
                {isEditing ? "Update Product" : "Add Product"}
              </Button>
              {isEditing && (
                <Button
                  type="button"
                  variant="secondary"
                  className="flex-1"
                  onClick={cancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Product Table */}
      <div className="w-full flex flex-col items-center">
        <div className="w-full max-w-[60rem] mx-auto border border-border rounded-xl !p-6 shadow-md bg-card mb-8">
          {loading ? (
            <div className="text-center py-8 text-muted-foreground">
              Loading products...
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No products found. Add your first product above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-b border-black">
                  <TableHead className="w-[100px] font-bold">Image</TableHead>
                  <TableHead className="font-bold">Name</TableHead>
                  <TableHead className="font-bold">Price</TableHead>
                  <TableHead className="font-bold">Flower Type</TableHead>
                  <TableHead className="font-bold">Color</TableHead>
                  <TableHead className="font-bold">Description</TableHead>
                  <TableHead className="text-right font-bold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product._id}
                    className="border-b border-black"
                    style={{
                      backgroundColor:
                        editingId === product._id ? "#e0f2fe" : "transparent",
                    }}
                  >
                    <TableCell>
                      <img
                        v-if="product.image"
                        src={`http://localhost:3000/${product.image}`}
                        className="h-16 w-16 object-cover border"
                        alt={product.name}
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>₱{product.price}</TableCell>
                    <TableCell>{product.flowerType}</TableCell>
                    <TableCell>{product.color}</TableCell>
                    <TableCell className="truncate max-w-xs">
                      {product.description}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2 gap-2">
                        <Button
                          size="sm"
                          onClick={() => editProduct(product)}
                          variant={
                            editingId === product._id ? "secondary" : "default"
                          }
                          className="!p-2"
                        >
                          {editingId === product._id ? "Editing..." : "Edit"}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteProduct(product._id)}
                          disabled={editingId === product._id}
                          className="!p-2"
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductAdmin;
