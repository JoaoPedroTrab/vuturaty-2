import React from 'react';

const NewsCard = ({ title, description }) => (
  <div className="bg-neutral-gray-100 p-6 rounded-lg shadow-md">
    <div className="h-40 bg-primary-blue-light mb-4 rounded"></div>
    <h3 className="text-lg font-semibold mb-2 text-primary-blue-dark">{title}</h3>
    <p className="text-neutral-gray-600">{description}</p>
  </div>
);

const NewsSection = () => {
  const newsItems = [
    { title: "Título da Notícia 1", description: "Breve descrição da notícia..." },
    { title: "Título da Notícia 2", description: "Breve descrição da notícia..." },
    { title: "Título da Notícia 3", description: "Breve descrição da notícia..." },
  ];

  return (
    <div className="bg-neutral-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary-blue-main">Últimas Notícias</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {newsItems.map((item, index) => (
            <NewsCard key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsSection;