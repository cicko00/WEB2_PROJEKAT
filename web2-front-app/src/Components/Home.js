import React, { useState, useEffect } from 'react';
import './Styles/Home.css';
import axios from 'axios';
import { PickRole } from '../Services/RolePicker';
import moment from 'moment';

const Home = ({ isLoggedIn,setChartItems,chartItems }) => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  useEffect(() => {
   
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      if (isLoggedIn === true) {
        console.log(JSON.parse(sessionStorage["Token"]));
        console.log(JSON.parse(sessionStorage["User"]));
        axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      }
  
      const response = await axios.get('https://localhost:7122/api/products/all');
      const fetchedArticles = response.data;
  
      // Decrease quantity of products in the chart
      const updatedArticles = await Promise.all(
        fetchedArticles.map(async (article) => {
          const chartItem = chartItems.find((item) => item.productId === article.productId);
          if (chartItem) {
            // Decrease the quantity by the amount already in the chart
            const updatedQuantity = article.quantity - chartItem.quantity;
            article.quantity = updatedQuantity >= 0 ? updatedQuantity : 0;
          }
  
          // Fetch sellerName for the item
          const sellerResponse = await axios.get(`https://localhost:7122/api/users/productSellerName/${article.sellerId}`);
          const sellerName = sellerResponse.data;
          article.sellerName = sellerName;
  
          return article;
        })
      );
  
      setArticles(updatedArticles);
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
      const response = await axios.get(`https://localhost:7122/api/products/${productId}`);
      setSelectedProduct(response.data);
      setSelectedQuantity(1); // Reset selected quantity when displaying new product details
    } catch (error) {
      console.error(error);
    }
  };

  const addToChart = (product) => {
    if (selectedQuantity === 0) {
      return;
    }
  
    const existingItem = chartItems.find((item) => item.productId === product.productId);
  
    if (existingItem) {
      // If the item already exists in the chart, update its quantity
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + selectedQuantity,
      };
  
      setChartItems((prevItems) =>
        prevItems.map((item) => (item.productId === product.productId ? updatedItem : item))
      );
    } else {
      // If the item is not in the chart, add it as a new item
      const newItem = {
        ...product,
        quantity: selectedQuantity,
      };
  
      setChartItems((prevItems) => [...prevItems, newItem]);
    }
  
    // Implement your logic to add the product to the chart
    console.log('Product added to chart:', product);
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
              {isLoggedIn === true && PickRole().isBuyer === true && (
                <>
                  <div className="quantity-picker">
                    <button
                      onClick={() =>
                        setSelectedQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0))
                      }
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={selectedQuantity}
                      onChange={(e) => {
                        const newQuantity = parseInt(e.target.value);
                        if (newQuantity <= selectedProduct.quantity) {
                          setSelectedQuantity(newQuantity);
                        }
                        else{
                          setSelectedQuantity(selectedProduct.quantity)
                        }
                      }}
                    />
                    <button
                      onClick={() =>
                        setSelectedQuantity((prevQuantity) =>
                          Math.min(prevQuantity + 1, selectedProduct.quantity)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  
                  <button onClick={() => addToChart(selectedProduct)}>Add to Cart</button>
                    
                </>
              )}
              <button onClick={closeProductDetails}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
