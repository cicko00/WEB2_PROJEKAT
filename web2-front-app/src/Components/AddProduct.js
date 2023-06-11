import React, { useState, useEffect } from 'react';
import './Styles/AddProduct.css';
import axios from 'axios';
import { Product } from '../Models/Product';

const AddProduct = () => {
  const user = JSON.parse(sessionStorage["User"]);

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(new Product(0, "", "", 0, 1, "", user.userId,""));
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isAddProductVisible, setIsAddProductVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://localhost:7108/api/products/seller/' + user.userId);
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleAddProduct = () => {
    setIsAddProductVisible((prevState) => !prevState);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (selectedProduct) {
      setSelectedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    } else {
      setNewProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (selectedProduct) {
        setSelectedProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result,
        }));
      } else {
        setNewProduct((prevProduct) => ({
          ...prevProduct,
          image: reader.result,
        }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddProduct = async () => {
    try {
        console.log(newProduct);
        newProduct.price=Number(newProduct.price);
      const response = await axios.post('https://localhost:7108/api/products', newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      setNewProduct(new Product(0, "", "", 0, 1, "", user.userId,""));
    } catch (error) {
      console.error(error);
    }
  };

  const handleIncreaseQuantity = async (productId) => {
    try {
      const response = await axios.put(`https://localhost:7108/api/products/${productId}/increase-quantity`);
      const updatedProduct = response.data;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === updatedProduct.productId ? updatedProduct : product
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleModifyProduct = (product) => {
    setSelectedProduct(product);
    setNewProduct(new Product(0, "", "", 0, 1, "", user.userId,""));
  };

  const handleSaveProduct = async () => {
    try {
      const response = await axios.put(
        `https://localhost:7108/api/products/${selectedProduct.productId}`,
        selectedProduct
      );
      const updatedProduct = response.data;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.productId === updatedProduct.productId ? updatedProduct : product
        )
      );
      setSelectedProduct(null);
      setNewProduct(new Product(0, "", "", 0, 1, "", user.userId,""));
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelModify = () => {
    setSelectedProduct(null);
    setNewProduct(new Product(0, "", "", 0, 1, "", user.userId,""));
  };

  return (
    <div className="add-product-container">

        <div className="add-product-dropdown">
        <button className='productbutton' onClick={toggleAddProduct}>Add Product</button>
        {isAddProductVisible && (
          <div className="add-product-content">

      <h2>Add Product</h2>
      <div className="product-form">
        <div className="form-group">
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image:</label>
          <div className="image-preview">
            {newProduct.image && <img src={newProduct.image} alt="Product Preview" />}
          </div>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
          >
            <option value="man">Man</option>
            <option value="woman">Woman</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea className='description'
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
          />
        </div>

        {!selectedProduct && (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>
      </div>
      
       )}
       </div>

      <h2>Your Products</h2>
      <div className="product-grid">
        {products.map((product) => (
          <div className="product" key={product.productId}>
            {product.image && <img src={product.image} alt={product.name} />}
            {!selectedProduct || selectedProduct.productId !== product.productId ? (
              <div>
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <p>Seller: {user.userName}</p>
                <p>Category: {product.category}</p>
                <p className='desc'>Description: {product.description}</p>
                {product.quantity && (
                  <p>
                    Quantity: {product.quantity}{' '}
                    <button onClick={() => handleIncreaseQuantity(product.productId)}>+</button>
                  </p>
                )}
                <button onClick={() => handleModifyProduct(product)}>Modify</button>
              </div>
            ) : (
              <div>
                <div className="form-group">
                  <label htmlFor="name">Product Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={selectedProduct.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="price">Price:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={selectedProduct.price}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="image">Image:</label>
                  <div className="image-preview">
                    {selectedProduct.image && (
                      <img src={selectedProduct.image} alt="Product Preview" />
                    )}
                  </div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="category">Category:</label>
                  <select
                    id="category"
                    name="category"
                    value={selectedProduct.category}
                    onChange={handleInputChange}
                  >
                    <option value="man">Man</option>
                    <option value="woman">Woman</option>
                    <option value="unisex">Unisex</option>
                  </select>
                </div>

                <div className="form-group">
                  <label  htmlFor="description">Description:</label>
                  <textarea className='description'
                    id="description"
                    name="description"
                    value={selectedProduct.description}
                    onChange={handleInputChange}
                  />
                </div>

                <button onClick={handleSaveProduct}>Save</button>
                <button onClick={handleCancelModify}>Cancel</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddProduct;
