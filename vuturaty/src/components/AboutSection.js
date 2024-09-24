import React from 'react';

const AboutSection = () => {
  return (
    <div className="bg-neutral-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 text-primary-blue-main">Sobre o Movimento Escoteiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-neutral-gray-700 leading-relaxed mb-4">
              O Movimento Escoteiro é uma organização educacional voluntária, apartidária, que conta com a colaboração de adultos, 
              e valoriza a participação de pessoas de todas as origens sociais, raças e crenças, de acordo com seus propósitos, 
              princípios e método concebidos pelo Fundador Baden-Powell.
            </p>
          </div>
          <div>
            <p className="text-neutral-gray-700 leading-relaxed mb-4">
              Nossa missão é contribuir para a educação de jovens, por meio de um sistema de valores baseado na Promessa e na Lei Escoteira, 
              para ajudar a construir um mundo melhor, onde as pessoas se realizem como indivíduos e desempenhem um papel construtivo na sociedade.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;