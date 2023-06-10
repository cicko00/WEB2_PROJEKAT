// FragranceShopHome.js

import React, { useState } from 'react';
import './Styles/Home.css';

const articles = [
  {
    id: 1,
    name: 'YSL Y EDP',
    price: 80,
    seller: 'ABC Fragrances',
    imageUrl:
      'https://tds-images.thedailystar.net/sites/default/files/images/2022/08/22/ysl-y-men-edp-100ml-4.jpg',
    category: 'man',
  },
  {
    id: 1,
    name: 'YSL Y EDP',
    price: 80,
    seller: 'ABC Fragrances',
    imageUrl:
      'https://tds-images.thedailystar.net/sites/default/files/images/2022/08/22/ysl-y-men-edp-100ml-4.jpg',
    category: 'man',
  },
  {
    id: 1,
    name: 'YSL Y EDP',
    price: 80,
    seller: 'ABC Fragrances',
    imageUrl:
      'https://tds-images.thedailystar.net/sites/default/files/images/2022/08/22/ysl-y-men-edp-100ml-4.jpg',
    category: 'man',
  },
  {
    id: 1,
    name: 'YSL Y EDP',
    price: 80,
    seller: 'ABC Fragrances',
    imageUrl:
      'https://tds-images.thedailystar.net/sites/default/files/images/2022/08/22/ysl-y-men-edp-100ml-4.jpg',
    category: 'man',
  },
  {
    id: 1,
    name: 'YSL Y EDP',
    price: 80,
    seller: 'ABC Fragrances',
    imageUrl:
      'https://tds-images.thedailystar.net/sites/default/files/images/2022/08/22/ysl-y-men-edp-100ml-4.jpg',
    category: 'man',
  },
  {
    id: 1,
    name: 'YSL Y EDP',
    price: 80,
    seller: 'ABC Fragrances',
    imageUrl:
      'https://tds-images.thedailystar.net/sites/default/files/images/2022/08/22/ysl-y-men-edp-100ml-4.jpg',
    category: 'man',
  },
  {
    id: 1,
    name: 'YSL Y EDP',
    price: 80,
    seller: 'ABC Fragrances',
    imageUrl:
      'https://tds-images.thedailystar.net/sites/default/files/images/2022/08/22/ysl-y-men-edp-100ml-4.jpg',
    category: 'man',
  },
  
  // Add more articles here
];

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filterArticles = (category) => {
    setSelectedCategory(category);
  };

  const filteredArticles =
    selectedCategory === 'all'
      ? articles
      : articles.filter((article) => article.category === selectedCategory);

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
          <div className="article-rendered" key={article.id}>
            <img src={article.imageUrl} alt={article.name} />
            <h3>{article.name}</h3>
            <p>Price: ${article.price}</p>
            <p>Seller: {article.seller}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
