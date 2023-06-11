import React, { useState, useEffect } from 'react';
import './Styles/Home.css';
import axios from 'axios';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://localhost:7108/api/products/all');
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const filterArticles = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

  const getProductDetails = async (productId) => {
    try {
      const response = await axios.get(`https://localhost:7108/api/products/${productId}`);
      setSelectedProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = (product) => {
    // Implement your logic to add the product to the cart
    console.log('Product added to cart:', product);
  };

  const closeProductDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="fragrance-shop-home">
      <div className="search-bar">
        <input type="text" placeholder="Search by name..." />
        <button>Search</button>
      </div>
      <div className="fragrance-categories">
        <button onClick={() => filterArticles('all')}>All</button>
        <button onClick={() => filterArticles('man')}>For Man</button>
        <button onClick={() => filterArticles('woman')}>For Woman</button>
        <button onClick={() => filterArticles('unisex')}>Unisex</button>
      </div>
      <div className="separator-line"></div>
      <div className="fragrance-articles-rendered">
        {filteredArticles.map((article) => (
          <div className="article-rendered" key={article.productId}>
            <img src={article.image} alt={article.name} />
            <h3>{article.name}</h3>
            <p>Price: ${article.price}</p>
            <p>Seller: {article.sellerName}</p>
            <button onClick={() => getProductDetails(article.productId)}>View Details</button>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-details-overlay">
          <div className="product-details">
            <div className="product-image">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
            </div>
            <div className="product-info">
              <h3>{selectedProduct.name}</h3>
              <p>Description: {selectedProduct.description}</p>
              <p>Price: ${selectedProduct.price}</p>
              <div className="quantity-picker">
                <button>-</button>
                <input type="text" value={selectedProduct.quantity} readOnly />
                <button>+</button>
              </div>
              <button onClick={() => addToCart(selectedProduct)}>Add to Cart</button>
            </div>
            <button className="close-button" onClick={closeProductDetails}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
