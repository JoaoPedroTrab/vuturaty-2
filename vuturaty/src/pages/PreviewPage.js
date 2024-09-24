import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar from '../components/NavBar';

const PreviewPage = () => {
  const location = useLocation();
  const { title, content } = location.state;

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-4xl font-oswald text-primary-blue-main mb-6">{title}</h1>
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </main>
    </div>
  );
};

export default PreviewPage;