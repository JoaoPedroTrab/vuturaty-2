import React from 'react';

const GoogleMapSection = () => {
  return (
    <div className="bg-neutral-white py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary-blue-main">
          Encontre-nos
        </h2>
        <div className="bg-neutral-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="relative h-[400px] md:h-auto">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3657.855567195861!2d-47.45939702522281!3d-23.537696678816076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94c58a724a3eb8ed%3A0x5e914cdeccbc0aaf!2s217%C2%B0%20Grupo%20de%20Escoteiros%20Vuturaty!5e0!3m2!1spt-BR!2sbr!4v1723139244497!5m2!1spt-BR!2sbr"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="MAPA GE VUTURATY" 
            ></iframe>
          </div>
          <div className="p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-primary-blue-dark mb-4">
              Informações de contato
            </h3>
            <div className="mb-4">
              <p className="text-neutral-gray-600">
                Atendimento: Segunda a Sábado, 9h às 17h
              </p>
              <p className="text-neutral-gray-600">
                Telefone: (15) 3333-4444
              </p>
            </div>
            <div
              href="tel:+1533334444"
              className="bg-primary-blue-main text-neutral-white font-bold py-3 px-6 rounded-lg hover:bg-primary-blue-dark transition-colors duration-300"
            >
              Ligue-nos
            </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default GoogleMapSection;