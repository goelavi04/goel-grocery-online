import React, { useState } from 'react';
import { Plus, Check } from 'lucide-react';
import { Product } from '@/context/CartContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="card-product group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-xs font-medium rounded-full">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-primary">₹{product.price}</p>
            <p className="text-xs text-muted-foreground">per {product.unit}</p>
          </div>
          
          <Button
            onClick={handleAddToCart}
            size="icon"
            className={`rounded-full transition-all duration-300 ${
              isAdded 
                ? 'bg-primary hover:bg-primary' 
                : 'bg-accent hover:bg-accent/90'
            }`}
          >
            {isAdded ? (
              <Check className="w-5 h-5 animate-scale-in" />
            ) : (
              <Plus className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
