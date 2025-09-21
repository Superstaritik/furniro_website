import React, { useEffect, useState } from "react";
import filterIcon from "../assets/system-uicons_filtering.svg";
import gridIcon from "../assets/ci_grid-big-round.svg";
import listIcon from "../assets/bi_view-list.svg";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { BACKEND_URL } from "../../Utils/utils";


const ProductCatalog = () => {
    const [items, setItems] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(16);
    const [totalItems, setTotalItems] = useState(0);
    const [sortField, setSortField] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [showAddPopup, setShowAddPopup] = useState(false);
    const [showEditPopup, setShowEditPopup] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);

    const [formInput, setFormInput] = useState({
        name: "",
        description: "",
        brand: "",
        category: "",
        price: "",
        originalPrice: "",
        isNewProduct: false,
    });
    
    const [appliedFilters, setAppliedFilters] = useState({
        brand: "",
        category: "",
        minPrice: "",
        maxPrice: "",
    });

    const retrieveItems = async () => {
        try {
            const queryParams = {
                page: pageNumber,
                limit: itemsPerPage,
                sortBy: sortField,
                order: sortOrder,
            };

            if (appliedFilters.brand) queryParams.brand = appliedFilters.brand;
            if (appliedFilters.category) queryParams.category = appliedFilters.category;
            if (appliedFilters.minPrice !== "") queryParams.minPrice = appliedFilters.minPrice;
            if (appliedFilters.maxPrice !== "") queryParams.maxPrice = appliedFilters.maxPrice;

            const response = await axios.get(`${BACKEND_URL}/product/get`, {
                params: queryParams,
                withCredentials: true,
            });
            setItems(response.data.products);
            setTotalItems(response.data.total);
        } catch (error) {
            toast.error("Items couldn't be fetched!");
            console.log(error);
        }
    };

    useEffect(() => {
        retrieveItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, itemsPerPage, sortField, sortOrder, appliedFilters]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormInput({
            ...formInput,
            [name]: type === "checkbox" ? checked : value,
        });
    };
    
    // Create item
    const handleAdd = async () => {
        try {
            const payload = {
                ...formInput,
                price: Number(formInput.price),
                originalPrice: formInput.originalPrice ? Number(formInput.originalPrice) : undefined,
            };

            await axios.post(`${BACKEND_URL}/product/create`, payload, {
                withCredentials: true,
            });
            toast.success("Item added successfully!");
            setShowAddPopup(false);
            setFormInput({
                name: "",
                description: "",
                brand: "",
                category: "",
                price: "",
                originalPrice: "",
                isNewProduct: false,
            });
            setPageNumber(1);
            retrieveItems();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add item");
            console.log(error);
        }
    };

    // Update item
    const handleEdit = async () => {
        try {
            const payload = {
                ...formInput,
                price: Number(formInput.price),
                originalPrice: formInput.originalPrice ? Number(formInput.originalPrice) : undefined,
            };

            await axios.put(
                `${BACKEND_URL}/product/update/${selectedItem._id}`,
                payload,
                { withCredentials: true }
            );
            toast.success("Item updated successfully!");
            setShowEditPopup(false);
            setSelectedItem(null);
            setFormInput({
                name: "",
                description: "",
                brand: "",
                category: "",
                price: "",
                originalPrice: "",
                isNewProduct: false,
            });
            retrieveItems();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update item");
            console.log(error);
        }
    };

    // Delete item
    const handleRemove = async (id) => {
        try {
            await axios.delete(`${BACKEND_URL}/product/delete/${id}`, {
                withCredentials: true,
            });
            toast.success("Item removed successfully!");
            retrieveItems();
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to remove item");
            console.log(error);
        }
    };

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startItem = totalItems === 0 ? 0 : (pageNumber - 1) * itemsPerPage + 1;
    const endItem = Math.min(pageNumber * itemsPerPage, totalItems);

    const resetFilters = () => {
        setAppliedFilters({ brand: "", category: "", minPrice: "", maxPrice: "" });
        setPageNumber(1);
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
                                    onClick={() => setIsFilterPanelOpen(prev => !prev)}
                                >
                                    <img src={filterIcon} alt="Filter" className="w-6 h-6" />
                                    <h1 className="font-medium text-sm sm:text-base">Filter</h1>
                                </div>

                                {/* Filter Panel */}
                                {isFilterPanelOpen && (
                                    <div className="absolute left-0 top-full mt-3 bg-white p-3 shadow rounded z-40 flex flex-col sm:flex-row items-start sm:items-center gap-3 w-60 sm:w-auto">

                                        {/* Brand */}
                                        <select
                                            className="h-10 px-2 bg-white shadow rounded cursor-pointer w-full sm:w-auto"
                                            value={appliedFilters.brand}
                                            onChange={(e) => setAppliedFilters(prev => ({ ...prev, brand: e.target.value }))}
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
                                            value={appliedFilters.category}
                                            onChange={(e) => setAppliedFilters(prev => ({ ...prev, category: e.target.value }))}
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
                                            value={appliedFilters.minPrice}
                                            onChange={(e) => setAppliedFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max"
                                            className="h-10 w-full sm:w-24 px-2 border rounded"
                                            value={appliedFilters.maxPrice}
                                            onChange={(e) => setAppliedFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                                        />

                                        {/* Buttons */}
                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <button
                                                className="flex-1 sm:flex-none px-3 py-2 bg-[#261b0f] text-white rounded cursor-pointer"
                                                onClick={() => {
                                                    setPageNumber(1);
                                                    setIsFilterPanelOpen(false);
                                                }}
                                            >
                                                Apply
                                            </button>
                                            <button
                                                className="flex-1 sm:flex-none px-3 py-2 bg-gray-200 rounded cursor-pointer"
                                                onClick={() => {
                                                    resetFilters();
                                                    setIsFilterPanelOpen(false);
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
                                Showing {startItem}–{endItem} of {totalItems} results
                            </h1>
                        </div>
                    </div>

                    {/* Center Section (Add Product) */}
                    <div className="w-full sm:w-auto flex justify-center lg:justify-start">
                        <button
                            className="px-5 py-2 bg-white text-[#c78437] font-bold shadow cursor-pointer w-full sm:w-auto"
                            onClick={() => setShowAddPopup(true)}
                        >
                            Add New Item
                        </button>
                    </div>

                    {/* Right Section (Show & Sort) */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 w-full lg:w-auto">

                        {/* Show Limit */}
                        <div className="flex items-center gap-3">
                            <h1 className="font-medium text-sm sm:text-base">Show</h1>
                            <select
                                className="h-10 w-16 bg-white text-gray-400 shadow px-2 cursor-pointer"
                                value={itemsPerPage}
                                onChange={(e) => {
                                    setItemsPerPage(Number(e.target.value));
                                    setPageNumber(1);
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
                                value={`${sortField}-${sortOrder}`}
                                onChange={(e) => {
                                    const [field, order] = e.target.value.split("-");
                                    setSortField(field);
                                    setSortOrder(order);
                                }}
                            >
                                <option value="brand-asc">Brand A-Z</option>
                                <option value="brand-desc">Brand Z-A</option>
                                <option value="price-asc">Price Low to High</option>
                                <option value="price-desc">Price High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>


            {/* Products */}
            <div className="flex flex-wrap gap-8 p-15">
                {items.map((item, index) => (
                    <div key={index} className="relative w-72 sm:w-80 md:w-80 bg-gray-100 overflow-hidden shadow-lg group cursor-pointer">
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-opacity-0 group-hover:backdrop-brightness-50 flex items-center justify-center gap-3 transition duration-300 z-20 pointer-events-none">
                            <button
                                className="px-4 py-2 bg-[#f1e7cf] text-[#c78437] font-bold opacity-0 group-hover:opacity-100 transition pointer-events-auto cursor-pointer"
                                onClick={() => {
                                    setSelectedItem(item);
                                    setFormInput({
                                        name: item.name,
                                        description: item.description,
                                        brand: item.brand,
                                        category: item.category,
                                        price: item.price,
                                        originalPrice: item.originalPrice,
                                        isNewProduct: item.isNewProduct || false,
                                    });
                                    setShowEditPopup(true);
                                }}
                            >
                                Edit
                            </button>
                            <button
                                className="px-4 py-2 bg-[#f1e7cf] text-[#c78437] font-bold opacity-0 group-hover:opacity-100 transition pointer-events-auto cursor-pointer"
                                onClick={() => handleRemove(item._id)}
                            >
                                Remove
                            </button>
                            <button
                                className="px-4 py-2 bg-[#c78437] text-white font-bold opacity-0 group-hover:opacity-100 transition pointer-events-auto cursor-pointer"
                                onClick={() => addToCart(item)}
                            >
                                Add to Cart
                            </button>
                        </div>

                        {/* Discount / New Badge */}
                        <div className="absolute top-4 right-4 h-10 w-10 rounded-full flex items-center justify-center text-white font-bold z-30">
                            {item.isNewProduct ? (
                                <div className="bg-green-900 w-full h-full flex items-center justify-center rounded-full">
                                    New
                                </div>
                            ) : item.discountPercent ? (
                                <div className="bg-red-600 w-full h-full flex items-center justify-center rounded-full">
                                    -{item.discountPercent}%
                                </div>
                            ) : (
                                <div className="bg-red-500 w-full h-full flex items-center justify-center rounded-full">
                                    -30%
                                </div>
                            )}
                        </div>

                        {/* Product Image */}
                        <img
                            src={`https://furniro-website.onrender.com${item.imageUrl}`}
                            alt={item.name}
                            className="object-cover w-full h-48 sm:h-60 md:h-72 transition-transform duration-300 group-hover:scale-105"
                        />

                        {/* Product Info */}
                        <div className="p-4 bg-white relative z-10">
                            <h1 className="font-bold text-xl sm:text-2xl">{item.name}</h1>
                            <p className="text-gray-500 mt-1">{item.description}</p>
                            <h1 className="mt-1">{item.brand}</h1>
                            <div className="flex justify-between mt-2 items-center">
                                <h1 className="font-bold text-lg sm:text-xl text-red-600">
                                    Rp {item.price}.000
                                </h1>
                                <h1 className="line-through text-gray-400">
                                    Rp {item.originalPrice}.000
                                </h1>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center gap-2 mb-10">
                    {pageNumber > 1 && (
                        <button
                            onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                            className="px-4 py-3 bg-[#f1e7cf] text-black rounded cursor-pointer"
                        >
                            Prev
                        </button>
                    )}

                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setPageNumber(i + 1)}
                            className={`px-4 py-3 rounded cursor-pointer ${pageNumber === i + 1 ? "bg-[#c78437] text-black" : "bg-[#f1e7cf]"
                                }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    {pageNumber < totalPages && (
                        <button
                            onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
                            className="px-4 py-3 bg-[#f1e7cf] text-black rounded cursor-pointer"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}

            {/* Create Product Popup */}
            {showAddPopup && (
                <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 w-96 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                        {["name", "description", "brand", "category", "price", "originalPrice"].map((field) => (
                            <input
                                key={field}
                                type={field.includes("Price") ? "number" : "text"}
                                name={field}
                                value={formInput[field]}
                                onChange={handleInputChange}
                                placeholder={field}
                                className="w-full mb-2 p-2 border rounded"
                            />
                        ))}
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={formInput.isNewProduct}
                                onChange={handleInputChange}
                            />
                            <label>Is This a New Product?</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer" onClick={() => setShowAddPopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-[#e88411]  hover:bg-[#f79c33] text-white rounded cursor-pointer" onClick={handleAdd}>Add Item</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Update Product Popup */}
            {showEditPopup && (
                <div className="fixed inset-0 backdrop-brightness-25 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 w-96 rounded shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Edit Item</h2>
                        {["name", "description", "brand", "category", "price", "originalPrice"].map((field) => (
                            <input
                                key={field}
                                type={field.includes("Price") ? "number" : "text"}
                                name={field}
                                value={formInput[field]}
                                onChange={handleInputChange}
                                placeholder={field}
                                className="w-full mb-2 p-2 border rounded"
                            />
                        ))}
                        <div className="flex items-center gap-2 mb-2">
                            <input
                                type="checkbox"
                                name="isNewProduct"
                                checked={formInput.isNewProduct}
                                onChange={handleInputChange}
                            />
                            <label>Is This a New Product?</label>
                        </div>
                        <div className="flex justify-end gap-2">
                            <button className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded cursor-pointer" onClick={() => setShowEditPopup(false)}>Cancel</button>
                            <button className="px-4 py-2 bg-[#e88411] hover:bg-[#f79c33] text-white rounded cursor-pointer" onClick={handleEdit}>Update Item</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductCatalog;