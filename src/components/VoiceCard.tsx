import React from 'react';

interface VoiceCardProps {
  name: string;
  years: string;
  role: string;
  description: string;
  image?: string;
}

const VoiceCard: React.FC<VoiceCardProps> = ({ name, years, role, description, image }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
      <div className="h-64 relative">
        <img 
          src={image || "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&q=80&w=2070"} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-2 font-serif italic">{years}</p>
        <p className="text-blue-600 font-medium mb-3">{role}</p>
        <p className="text-gray-600 font-serif">{description}</p>
      </div>
    </div>
  );
};

export default VoiceCard;