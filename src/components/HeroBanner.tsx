import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, Shield, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroBanner: React.FC = () => {
  return (
    <section className="relative gradient-hero overflow-hidden">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full">
              <Leaf className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Fresh & Organic</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Fresh Groceries
              <br />
              <span className="text-gradient">Delivered Daily</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-md">
              Experience the freshest produce and quality groceries delivered right to your doorstep. 
              Shop from the comfort of your home.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="btn-primary gap-2 text-base px-8">
                  Shop Now
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/shop?category=Fruits">
                <Button size="lg" variant="outline" className="gap-2 text-base px-8 border-2">
                  View Offers
                </Button>
              </Link>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Free Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <span className="text-sm font-medium">100% Organic</span>
              </div>
            </div>
          </div>

          {/* Images Grid */}
          <div className="relative hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-xl hover-lift">
                  <img
                    src="https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=400"
                    alt="Fresh fruits"
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl hover-lift">
                  <img
                    src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400"
                    alt="Fresh vegetables"
                    className="w-full h-64 object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="rounded-2xl overflow-hidden shadow-xl hover-lift">
                  <img
                    src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400"
                    alt="Grocery shopping"
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl hover-lift">
                  <img
                    src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400"
                    alt="Fresh produce"
                    className="w-full h-48 object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 bg-accent text-accent-foreground px-6 py-3 rounded-xl shadow-lg animate-float">
              <p className="text-2xl font-bold">20% OFF</p>
              <p className="text-sm">First Order</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
