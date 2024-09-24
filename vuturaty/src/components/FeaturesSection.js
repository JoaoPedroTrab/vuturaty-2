import React from 'react';

const FeatureCard = ({ title, description }) => (
  <div className="bg-neutral-white p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
    <h3 className="text-xl font-semibold mb-4 text-primary-blue-main">{title}</h3>
    <p className="text-neutral-gray-600">{description}</p>
  </div>
);

const FeaturesSection = () => {
  const features = [
    { title: "Aventura", description: "Explore a natureza e desafie seus limites em nossas atividades ao ar livre." },
    { title: "Amizade", description: "Faça amizades duradouras e desenvolva habilidades sociais importantes." },
    { title: "Aprendizado", description: "Adquira habilidades práticas e valores que durarão toda a vida." },
  ];

  return (
    <div className="bg-primary-blue-light py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-neutral-white">O que oferecemos</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;