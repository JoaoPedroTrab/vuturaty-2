import React, { lazy, Suspense } from 'react';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import FeaturesSection from '../components/FeaturesSection';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const Home = () => {

  const GoogleMapSection = lazy(() => import('../components/GoogleMapSection'));
  const RamosEscotismo = lazy(() => import('../components/Ramos'));

  const events = [
    {
      title: "Acampamento de Verão",
      date: "15-17 de Janeiro, 2025",
      description: "Três dias de aventura na natureza",
      image: "/images/acampamento.jpg"
    },
    {
      title: "Ação Comunitária",
      date: "5 de Fevereiro, 2025",
      description: "Projeto de limpeza no parque local",
      image: "/images/acao-comunitaria.jpg"
    },
    {
      title: "Dia do Escoteiro",
      date: "23 de Abril, 2025",
      description: "Celebração e atividades especiais",
      image: "/images/dia-escoteiro.jpg"
    }
  ];

  return (
    <div className="bg-neutral-gray-100">
      <NavBar />
      <HeroSection />
      
      <Suspense fallback={<div>Carregando...</div>}>
        <section className="py-16 bg-neutral-gray-100">
          <div className="container mx-auto px-4">
            <RamosEscotismo />
          </div>
        </section>
      </Suspense>

      <AboutSection />
      
      <div className="w-full bg-neutral-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Button 
            label="Junte-se a Nós" 
            className="p-button-raised p-button-rounded bg-primary-yellow-main text-primary-blue-dark hover:bg-primary-yellow-light transition-all duration-300 px-8 py-3 text-lg font-semibold"
            aria-label="Junte-se ao Grupo Escoteiro"
          />
        </div>
      </div>

      <FeaturesSection />

      <section className="py-16 bg-neutral-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-primary-blue-main text-center mb-12">Próximos Eventos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-48 object-cover mb-4 rounded-t-lg"
                  loading="lazy"
                />
                <h3 className="text-xl font-semibold mb-2 text-primary-blue-main">{event.title}</h3>
                <p className="text-neutral-gray-600 mb-2">{event.date}</p>
                <p className="text-neutral-gray-700 mb-4">{event.description}</p>
                <Button label="Saiba Mais" className="p-button-outlined p-button-rounded" aria-label={`Saiba mais sobre ${event.title}`} />
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={<div>Carregando mapa...</div>}>
        <GoogleMapSection />
      </Suspense>
      <Footer />
    </div>
  );
};

export default Home;