import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, CreditCard, Truck, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const Checkout: React.FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
  });

  const deliveryFee = totalPrice >= 500 ? 0 : 40;
  const grandTotal = totalPrice + deliveryFee;

  // Load profile data if user is logged in
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        email: user.email || '',
      }));

      // Load profile data
      supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setFormData(prev => ({
              ...prev,
              fullName: data.full_name || '',
              phone: data.phone || '',
              address: data.address || '',
              city: data.city || '',
              pincode: data.pincode || '',
            }));
          }
        });
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.fullName || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
      toast({
        title: "Please fill all fields",
        description: "All delivery details are required",
        variant: "destructive"
      });
      return;
    }

    // Require login for checkout
    if (!user) {
      toast({
        title: "Login required",
        description: "Please login to complete your order",
        variant: "destructive"
      });
      navigate('/auth');
      return;
    }

    setIsSubmitting(true);

    try {
      const newOrderNumber = `GS${Date.now().toString().slice(-8)}`;

      // Create order
      const { data: orderData, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          order_number: newOrderNumber,
          status: 'pending',
          total_amount: totalPrice,
          delivery_fee: deliveryFee,
          full_name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map(item => ({
        order_id: orderData.id,
        product_id: item.id,
        product_name: item.name,
        product_price: item.price,
        product_image: item.image,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Update profile with delivery info for future orders
      await supabase
        .from('profiles')
        .update({
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          pincode: formData.pincode,
        })
        .eq('user_id', user.id);

      setOrderNumber(newOrderNumber);
      setIsOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Order failed",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (cartItems.length === 0 && !isOrderPlaced) {
    navigate('/cart');
    return null;
  }

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for shopping with Goel Stores
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order #{orderNumber} has been placed successfully.
              You can track your order in the My Orders section.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/orders">
                <Button className="btn-primary w-full sm:w-auto">
                  View My Orders
                </Button>
              </Link>
              <Link to="/shop">
                <Button variant="outline" className="w-full sm:w-auto">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>

        {!user && (
          <div className="mb-8 p-4 bg-primary/10 rounded-xl">
            <p className="text-sm">
              <Link to="/auth" className="text-primary font-medium hover:underline">Login</Link>
              {' '}to save your order history and get faster checkout next time!
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Delivery Form */}
          <div>
            <h1 className="text-3xl font-bold mb-6">Delivery Details</h1>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="input-grocery"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    className="input-grocery"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+91 98765 43210"
                  className="input-grocery"
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="123, Street Name, Area"
                  className="input-grocery"
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="Mumbai"
                    className="input-grocery"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pincode">Pincode</Label>
                  <Input
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="400001"
                    className="input-grocery"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              {/* Payment Info */}
              <div className="pt-6 border-t border-border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </h2>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">Cash on Delivery (COD)</p>
                  <p className="text-sm text-muted-foreground">Pay when you receive your order</p>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full btn-primary" 
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Placing Order...
                  </>
                ) : (
                  `Place Order - ₹${grandTotal.toFixed(2)}`
                )}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 max-h-64 overflow-y-auto mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-medium">₹{item.price * item.quantity}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-3 border-t border-border">
                  <span>Total</span>
                  <span className="text-primary">₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-primary/10 rounded-lg flex items-center gap-3">
                <Truck className="w-8 h-8 text-primary flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium">Estimated Delivery</p>
                  <p className="text-muted-foreground">Within 2-3 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
