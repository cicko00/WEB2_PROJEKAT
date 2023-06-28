
import React, { useState, useEffect } from 'react';
import './Styles/ShowMyProducts.css';
import axios from 'axios';

const ShowMyProducts = () => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
const user = JSON.parse(sessionStorage["User"]);
  const [articles, setArticles] = useState([]);
  

  useEffect(() => {
    fetchArticlesS();
  }, []);

  const fetchArticlesS = async () => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(sessionStorage["Token"])}`;
      const response = await axios.get('https://localhost:7122/api/products/seller/' + user.userId);
      setArticles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

 
  


  return (
    <div className="fragrance-shop-home">
     
      
      <div className="separator-line"></div>
      <div className="fragrance-articles-renderedd">
        {articles.map((article) => (
          <div className="article-rendered" key={article.productId}>
            <img src={article.image} alt={article.name} />
            <h3>{article.name}</h3>
            <p>Price: ${article.price}</p>
            <p>Quantity: {article.quantity}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowMyProducts;
