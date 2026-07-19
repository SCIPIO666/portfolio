
import React from 'react';

export default function Card({ title, description, image }) {
  return (
    <div className="group relative w-72 h-96 rounded-xl overflow-hidden transition-all duration-300 hover:skew-y-1 hover:scale-[1.02] hover:shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 transition-colors duration-300 group-hover:from-primary/80 group-hover:to-primary/40" />
      
      {/* Card content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        {image && (
          <div className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-300">
            <img src={image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-200">{description}</p>
      </div>
    </div>
  );
}