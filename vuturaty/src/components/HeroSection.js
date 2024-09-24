import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <video autoPlay loop muted className="absolute w-full h-full object-cover">
        <source src="/background/background_movie.mp4" type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-black/80"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-neutral-white p-4">
        <h1 className="text-5xl md:text-7xl font-bold font-oswald mb-6 tracking-wider">
          217° GRUPO ESCOTEIRO VUTURATY
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl font-light">
          Construindo um futuro melhor através do escotismo
        </p>
      </div>
    </div>
  );
};

export default HeroSection;