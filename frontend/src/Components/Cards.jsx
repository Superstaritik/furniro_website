import React, { useEffect, useState } from "react";
import filterIcon from "../assets/system-uicons_filtering.svg";
import gridIcon from "../assets/ci_grid-big-round.svg";
import listIcon from "../assets/bi_view-list.svg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { BACKEND_URL } from "../../Utils/utils";

const Cards = () => {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(16);
    const [total, setTotal] = useState(0);
    const [sortBy, setSortBy] = useState("createdAt");
    const [order, setOrder] = useState("desc");
    const [showCreatePopup, setShowCreatePopup] = useState(false);
    const [showUpdatePopup, setShowUpdatePopup] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [filterOpen, setFilterOpen] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        originalPrice: "",
        isNewProduct: false,
    });

    // Filters state
    const [filters, setFilters] = useState({
        brand: "",
        category: "",
        minPrice: "",
        maxPrice: "",
    });

    // Build params and fetch products
    const fetchProducts = async () => {
        try {
            const params = {
                page,
                limit,
                sortBy,
                order,
            };

            if (filters.brand) params.brand = filters.brand;
            if (filters.category) params.category = filters.category;
            if (filters.minPrice !== "") params.minPrice = filters.minPrice;
            if (filters.maxPrice !== "") params.maxPrice = filters.maxPrice;

            const response = await axios.get(`${BACKEND_URL}/product/get`, {
                params,
                withCredentials: true,
            });
            setProducts(response.data.products);
            setTotal(response.data.total);
        } catch (error) {
            toast.error("Error fetching products");
            console.log(error);
        }
    };

    // auto-fetch when page/limit/sort/order/filters change
    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, limit, sortBy, order, filters]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    // Create product
    const handleCreate = async () => {
        try {
            // convert numeric fields to Number to be safe
            const payload = {
                ...formData,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
            };

            await axios.post(`${BACKEND_URL}/product/create`, payload, {
                withCredentials: true,
            });
            toast.success("Product created successfully!");
            setShowCreatePopup(false);
            setFormData({
                name: "",
                description: "",
                brand: "",
                category: "",
                price: "",
                originalPrice: "",
                isNewProduct: false,
            });
            setPage(1);
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error creating product");
            console.log(error);
        }
    };

    // Update product
    const handleUpdate = async () => {
        try {
            const payload = {
                ...formData,
                price: Number(formData.price),
                originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
            };

            await axios.put(
                `${BACKEND_URL}/product/update/${currentProduct._id}`,
                payload,
                { withCredentials: true }
            );
            toast.success("Product updated successfully!");
            setShowUpdatePopup(false);
            setCurrentProduct(null);
            setFormData({
                name: "",
                description: "",
                brand: "",
                category: "",
                price: "",
                originalPrice: "",
                isNewProduct: false,
            });
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating product");
            console.log(error);
        }
    };

    // Delete product
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${BACKEND_URL}/product/delete/${id}`, {
                withCredentials: true,
            });
            toast.success("Product deleted successfully!");
            fetchProducts();
        } catch (error) {
            toast.error(error.response?.data?.message || "Error deleting product");
            console.log(error);
        }
    };

    const totalPages = Math.ceil(total / limit);
    const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    // Helper: clear filters
    const clearFilters = () => {
        setFilters({ brand: "", category: "", minPrice: "", maxPrice: "" });
        setPage(1);
    };

    return (
        <div className="">
            <Toaster position="top-center" />
            {/* Top Filter / Sort Section */}
            <div className="w-full bg-[#F9F1E7] -mt-2 px-4 sm:px-6 md:px-10 py-4 sm:py-6 relative">
                <div className="w-full flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                    {/* Left Section */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 w-full lg:w-auto">
                        <div className="flex items-center gap-4">

                            {/* Filter Toggle */}
                            <div className="relative">
                                <div
                                    className="flex items-center gap-2 cursor-pointer"
                                    onClick={() => setFilterOpen(prev => !prev)}
                                >
                                    <img src={filterIcon} alt="Filter" className="w-6 h-6" />
                                    <h1 className="font-medium text-sm sm:text-base">Filter</h1>
                                </div>

                                {/* Filter Panel */}
                                {filterOpen && (
                                    <div className="absolute left-0 top-full mt-3 bg-white p-3 shadow rounded z-40 flex flex-col sm:flex-row items-start sm:items-center gap-3 w-60 sm:w-auto">

                                        {/* Brand */}
                                        <select
                                            className="h-10 px-2 bg-white shadow rounded cursor-pointer w-full sm:w-auto"
                                            value={filters.brand}
                                            onChange={(e) => setFilters(prev => ({ ...prev, brand: e.target.value }))}
                                        >
                                            <option value="">All Brands</option>
                                            <option value="Durian">Durian</option>
                                            <option value="IKEA">IKEA</option>
                                            <option value="Godrej Interio">Godrej Interio</option>
                                            <option value="Urban Ladder">Urban Ladder</option>
                                            <option value="Home Centre">Home Centre</option>
                                            <option value="Pepperfry">Pepperfry</option>
                                        </select>

                                        {/* Category */}
                                        <select
                                            className="h-10 px-2 bg-white shadow rounded cursor-pointer w-full sm:w-auto"
                                            value={filters.category}
                                            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                                        >
                                            <option value="">All Categories</option>
                                            <option value="chair">Chair</option>
                                            <option value="Table&Stools">Table & Stools</option>
                                            <option value="Sofa">Sofa</option>
                                        </select>

                                        {/* Min / Max Price */}
                                        <input
                                            type="number"
                                            placeholder="Min"
                                            className="h-10 w-full sm:w-24 px-2 border rounded"
                                            value={filters.minPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="h-10 w-full sm:w-24 px-2 border rounded"
                                            value={filters.maxPrice}
                                            onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                        />

                                        {/* Buttons */}
                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <button
                                                className="flex-1 sm:flex-none px-3 py-2 bg-[#c78437] text-white rounded cursor-pointer"
                                                onClick={() => {
                                                    setPage(1);
                                                    setFilterOpen(false);
                                                }}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                className="flex-1 sm:flex-none px-3 py-2 bg-gray-200 rounded cursor-pointer"
                                                onClick={() => {
                                                    clearFilters();
                                                    setFilterOpen(false);
                                                }}
                                            >
                                                Clear
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Grid/List Icons */}
                            <img src={gridIcon} alt="Grid View" className="w-6 h-6 cursor-pointer hidden sm:block" />
                            <img src={listIcon} alt="List View" className="w-6 h-6 cursor-pointer hidden sm:block" />

                        </div>

                        {/* Results Info */}
                        <div className="sm:pl-6 sm:border-l sm:border-gray-400 mt-2 sm:mt-0">
                            <h1 className="text-gray-700 font-medium text-sm sm:text-base">
                                Showing {startItem}–{endItem} of {total} results
                            </h1>
                        </div>
                    </div>

                    {/* Center Section (Add Product) */}
                    <div className="w-full sm:w-auto flex justify-center lg:justify-start">
                        <button
                            className="px-5 py-2 bg-white text-[#c78437] font-bold shadow cursor-pointer w-full sm:w-auto"
                            onClick={() => setShowCreatePopup(true)}
                        >
                            Add Product
                        </button>
                    </div>

                    {/* Right Section (Show & Sort) */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full lg:w-auto">

                        {/* Show Limit */}
                        <div className="flex items-center gap-3">
                            <h1 className="font-medium text-sm sm:text-base">Show</h1>
                            <select
                                className="h-10 w-16 bg-white text-gray-400 shadow px-2 cursor-pointer"
                                value={limit}
                                onChange={(e) => {
                                    setLimit(Number(e.target.value));
                                    setPage(1);
                                }}
                            >
                                <option value={2}>2</option>
                                <option value={4}>4</option>
                                <option value={16}>16</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="flex items-center gap-3">
                            <h1 className="font-medium text-sm sm:text-base">Sort by</h1>
                            <select
                                className="h-10 w-36 bg-white text-gray-400 shadow px-2 cursor-pointer"
                                value={`${sortBy}-${order}`}
                                onChange={(e) => {
                                    const [field, sortOrder] = e.target.value.split("-");
                                    setSortBy(field);
                                    setOrder(sortOrder);
                                }}
                            >
                                <option value="brand-asc">Brand Asc</option>
                                <option value="brand-desc">Brand Desc</option>
                                <option value="price-asc">Price Low to High</option>
                                <option value="price-desc">Price High to Low</option>
                            </select>
                        </div>

                    </div>
                </div>
            </div>


            {/* Products */}
            <div className="flex flex-wrap gap-8 p-15">
                {products.map((product, index) => (
                    <div key={index} className="relative w-72 sm:w-80 md:w-80 bg-gray-100 overflow-hidden shadow-lg group cursor-pointer">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-opacity-0 group-hover:backdrop-brightness-50 flex items-center justify-center gap-3 transition duration-300 z-20 pointer-events-none">
                            <button
                                className="px-4 py-2 bg-[#f1e7cf] text-[#c78437] font-bold opacity-0 group-hover:opacity-100 transition pointer-events-auto cursor-pointer"
                                onClick={() => {
                                    setCurrentProduct(product);
                                    setFormData({
                                        name: product.name,
                                        description: product.description,
                                        brand: product.brand,
                                        category: product.category,
                                        price: product.price,
                                        originalPrice: product.originalPrice,
                                        isNewProduct: product.isNewProduct || false,
                                    });
                                    setShowUpdatePopup(true);
                                }}
                            >
                                Update
                            </button>
                            <button
                                className="px-4 py-2 bg-[#f1e7cf] text-[#c78437] font-bold opacity-0 group-hover:opacity-100 transition pointer-events-auto cursor-pointer"
                                onClick={() => handleDelete(product._id)}
                            >
                                Delete
                            </button>
                        </div>

                        {/* Discount / New Badge */}
                        <div className="absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold z-30">
                            {product.isNewProduct ? (
                                <div className="bg-green-500 w-full h-full flex items-center justify-center rounded-full">
                                    New
                                </div>
                            ) : product.discountPercent ? (
                                <div className="bg-red-400 w-full h-full flex items-center justify-center rounded-full">
                                    -{product.discountPercent}%
                                </div>
                            ) : (
                                <div className="bg-red-400 w-full h-full flex items-center justify-center rounded-full">
                                    -30%
                                </div>
                            )}
                        </div>

                        {/* Product Image */}
                        <img
                            src={`https://furniro-website.onrender.com${product.imageUrl}`}
                            alt={product.name}
                            className="object-cover w-full h-48 sm:h-60 md:h-72 transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Product Info */}
                        <div className="p-4 bg-white relative z-10">
                            <h1 className="font-bold text-xl sm:text-2xl">{product.name}</h1>
                            <p className="text-gray-500 mt-1">{product.description}</p>
                            <h1 className="mt-1">{product.brand}</h1>
                            <div className="flex justify-between mt-2 items-center">
                                <h1 className="font-bold text-lg sm:text-xl text-red-600">
                                    Rp {product.price}.000
                                </h1>
                                <h1 className="line-through text-gray-400">
                                    Rp {product.originalPrice}.000
                                </h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mb-10">
                    {page > 1 && (
                        <button
                            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                            className="px-4 py-3 bg-[#f1e7cf] text-black rounded cursor-pointer"
                        >
                            Prev
                        </button>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPage(i + 1)}
                            className={`px-4 py-3 rounded cursor-pointer ${page === i + 1 ? "bg-[#c78437] text-black" : "bg-[#f1e7cf]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {page < totalPages && (
                        <button
                            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                            className="px-4 py-3 bg-[#f1e7cf] text-black rounded cursor-pointer"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}

            {/* Create Product Popup */}
            {showCreatePopup && (
                <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 w-96 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add Product</h2>
                        {["name", "description", "brand", "category", "price", "originalPrice"].map((field) => (
                            <input
                                key={field}
                                type={field.includes("Price") ? "number" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field}
                                className="w-full mb-2 p-2 border rounded"
                            />
                        ))}
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={formData.isNewProduct}
                                onChange={handleChange}
                            />
                            <label>Is New Product</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer" onClick={() => setShowCreatePopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-[#e88411]  hover:bg-[#f79c33] text-white rounded cursor-pointer" onClick={handleCreate}>Add</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Product Popup */}
            {showUpdatePopup && (
                <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 w-96 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Update Product</h2>
                        {["name", "description", "brand", "category", "price", "originalPrice"].map((field) => (
                            <input
                                key={field}
                                type={field.includes("Price") ? "number" : "text"}
                                name={field}
                                value={formData[field]}
                                onChange={handleChange}
                                placeholder={field}
                                className="w-full mb-2 p-2 border rounded"
                            />
                        ))}
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={formData.isNewProduct}
                                onChange={handleChange}
                            />
                            <label>Is New Product</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer" onClick={() => setShowUpdatePopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-[#e88411] hover:bg-[#f79c33] text-white rounded cursor-pointer" onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cards;
