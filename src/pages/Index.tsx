import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroBanner from '@/components/HeroBanner';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';

const categoryImages = {
  Fruits: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=600',
  Vegetables: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=600',
  Dairy: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=600',
  Snacks: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=600',
  Beverages: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600',
};

const Index: React.FC = () => {
  const featuredProducts = products.slice(0, 8);
  const categoryCounts = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero */}
      <HeroBanner />

      {/* Categories */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Shop by Category</h2>
            <p className="text-muted-foreground">Browse through our wide selection of fresh products</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {Object.entries(categoryImages).map(([name, image]) => (
              <CategoryCard
                key={name}
                name={name}
                image={image}
                itemCount={categoryCounts[name] || 0}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Fresh picks just for you</p>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="gap-2 hidden md:flex">
                View All
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link to="/shop">
              <Button className="btn-primary gap-2">
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-12 gradient-primary">
        <div className="container mx-auto px-4 text-center text-primary-foreground">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Get 20% Off Your First Order!</h2>
          <p className="mb-6 opacity-90">Use code FRESH20 at checkout</p>
          <Link to="/shop">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
              Start Shopping
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
