import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  name: string;
  image: string;
  itemCount: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ name, image, itemCount }) => {
  return (
    <Link to={`/shop?category=${name}`} className="category-card hover-scale">
      <img
        src={image}
        alt={name}
        className="w-full h-48 md:h-64 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
        <h3 className="text-xl md:text-2xl font-bold mb-1">{name}</h3>
        <p className="text-sm opacity-90">{itemCount} items</p>
      </div>
    </Link>
  );
};

export default CategoryCard;
