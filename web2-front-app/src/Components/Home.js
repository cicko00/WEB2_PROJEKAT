import React, { useState, useEffect } from 'react';
import './Styles/Home.css';
import axios from 'axios';
import { PickRole } from '../Services/RolePicker';

const Home = ({ isLoggedIn,setChartItems,chartItems }) => {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get('https://localhost:7108/api/products/all');
      const fetchedArticles = response.data;
      
      // Decrease quantity of products in the chart
      const updatedArticles = fetchedArticles.map((article) => {
        const chartItem = chartItems.find((item) => item.productId === article.productId);
        if (chartItem) {
          // Decrease the quantity by the amount already in the chart
          const updatedQuantity = article.quantity - chartItem.quantity;
          return {
            ...article,
            quantity: updatedQuantity >= 0 ? updatedQuantity : 0,
          };
        }
        return article;
      });
  
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
      const response = await axios.get(`https://localhost:7108/api/products/${productId}`);
      setSelectedProduct(response.data);
      setSelectedQuantity(1); // Reset selected quantity when displaying new product details
    } catch (error) {
      console.error(error);
    }
  };

  const addToChart = (product) => {
    const productToAdd = {
      ...product,
      quantity: selectedQuantity,
    };

    
    selectedProduct.quantity=selectedQuantity;
    setChartItems((prevItems)=>[...prevItems,selectedProduct]
      
    )
    // Implement your logic to add the product to the chart
    console.log('Product added to chart:', productToAdd);
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
                        setSelectedQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1))
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
