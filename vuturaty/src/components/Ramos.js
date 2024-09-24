import React from 'react';
import { useNavigate } from 'react-router-dom';

const ramos = [
  { id: 1, nome: 'Lobinho', idadeMin: 6.5, idadeMax: 10, icone: 'lobinho.png', cor: 'bg-gradient-to-br from-yellow-400 to-yellow-600', textoCor: 'text-gray-900' },
  { id: 2, nome: 'Escoteiro', idadeMin: 11, idadeMax: 14, icone: 'escoteiro.png', cor: 'bg-gradient-to-br from-green-400 to-green-600', textoCor: 'text-white' },
  { id: 3, nome: 'Sênior', idadeMin: 15, idadeMax: 17, icone: 'senior.png', cor: 'bg-gradient-to-br from-red-400 to-red-600', textoCor: 'text-white' },
  { id: 4, nome: 'Pioneiro', idadeMin: 18, idadeMax: 21, icone: 'pioneiro.png', cor: 'bg-gradient-to-br from-blue-400 to-blue-600', textoCor: 'text-white' },
];

const RamoCard = ({ nome, idadeMin, idadeMax, icone, cor, textoCor }) => {
  const navigate = useNavigate();

  return (
    <div 
      className={`${cor} ${textoCor} rounded-xl p-5 flex flex-col items-center justify-between h-52 w-52 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-md border border-transparent hover:border-gray-300`}
      onClick={() => navigate(`/${nome.toLowerCase()}`)}
    >
      <h3 className="text-xl font-semibold mb-2 tracking-tight drop-shadow-sm">{nome}</h3>
      <p className="text-sm mb-2 px-2 py-1 bg-white bg-opacity-70 rounded-lg">{idadeMin} a {idadeMax} anos</p>
      <img src={`/icones/${icone}`} alt={nome} className="w-24 h-24 object-contain drop-shadow-sm" />
    </div>
  );
};

const RamosEscotismo = () => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-semibold text-center mb-12 text-blue-800">Ramos do Escotismo</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {ramos.map(ramo => (
            <RamoCard key={ramo.id} {...ramo} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RamosEscotismo;
