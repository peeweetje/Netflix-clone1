import type React from 'react';

interface FrontCardProps {
  src: string;
  alt: string;
}

export const FrontCard = ({ src, alt }: FrontCardProps) => {
  return (
    <div className="w-[250px] h-[350px] rounded-lg overflow-hidden shadow-2xl">
      <img
        src={`https://image.tmdb.org/t/p/w500${src}`}
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
};
