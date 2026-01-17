import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartItem from '@/components/CartItem';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';

const Cart: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();

  const deliveryFee = totalPrice >= 500 ? 0 : 40;
  const grandTotal = totalPrice + deliveryFee;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Cart</h1>
            <p className="text-muted-foreground">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart
            </p>
          </div>
          {cartItems.length > 0 && (
            <Button
              variant="outline"
              className="text-destructive border-destructive hover:bg-destructive/10"
              onClick={clearCart}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          )}
        </div>

        {cartItems.length > 0 ? (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Delivery</span>
                    <span className="font-medium">
                      {deliveryFee === 0 ? (
                        <span className="text-primary">FREE</span>
                      ) : (
                        `₹${deliveryFee}`
                      )}
                    </span>
                  </div>
                  {deliveryFee > 0 && (
                    <p className="text-sm text-muted-foreground">
                      Add ₹{(500 - totalPrice).toFixed(2)} more for free delivery
                    </p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <Link to="/checkout">
                  <Button className="w-full btn-primary gap-2" size="lg">
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </Button>
                </Link>

                <Link to="/shop" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <ShoppingBag className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet
            </p>
            <Link to="/shop">
              <Button className="btn-primary gap-2" size="lg">
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
