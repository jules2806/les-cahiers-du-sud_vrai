import React from 'react';

const timelineEvents = [
  { year: 1913, event: "Naissance de Fortunio par Marcel Pagnol et ses amis" },
  { year: "1914-1918", event: "Interruption par la Grande Guerre" },
  { year: 1919, event: "Reprise sous Jean Ballard" },
  { year: 1925, event: "Fortunio devient Les Cahiers du Sud" },
  { year: 1929, event: "Influence d'André Gaillard" },
  { year: 1930, event: "Fusion avec Chantiers" },
  { year: 1943, event: "Publication spéciale 'Le Génie d'Oc'" },
  { year: 1950, event: "Fin de l'Âge d'Or Méditerranéen" },
  { year: 1966, event: "Dernier numéro publié" }
];

const Timeline = () => {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-blue-200" />
      <div className="space-y-12">
        {timelineEvents.map((item, index) => (
          <div 
            key={index}
            className={`flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
          >
            <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8 text-right' : 'md:pl-8'}`}>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-serif font-bold text-blue-600 mb-2">{item.year}</h3>
                <p className="text-gray-700 font-serif">{item.event}</p>
              </div>
            </div>
            <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-blue-100" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;