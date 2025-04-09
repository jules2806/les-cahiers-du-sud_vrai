import React from 'react';

interface SpecialIssueProps {
  title: string;
  description: string;
}

const SpecialIssue: React.FC<SpecialIssueProps> = ({ title, description }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 border-l-4 border-blue-600">
      <div className="p-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 font-serif leading-relaxed">{description}</p>
        <div className="mt-4 flex justify-end">
          <div className="w-16 h-1 bg-blue-200 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default SpecialIssue;