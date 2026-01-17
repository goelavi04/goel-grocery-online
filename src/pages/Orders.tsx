import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Package, ArrowLeft, ShoppingBag, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface OrderItem {
  id: string;
  product_id: number;
  product_name: string;
  product_price: number;
  product_image: string | null;
  quantity: number;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_amount: number;
  delivery_fee: number;
  full_name: string;
  address: string;
  city: string;
  created_at: string;
  items: OrderItem[];
}

const Orders: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      loadOrders();
    }
  }, [user, authLoading, navigate]);

  const loadOrders = async () => {
    if (!user) return;

    try {
      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (ordersError) throw ordersError;

      if (ordersData) {
        const ordersWithItems: Order[] = await Promise.all(
          ordersData.map(async (order) => {
            const { data: itemsData } = await supabase
              .from('order_items')
              .select('*')
              .eq('order_id', order.id);

            return {
              ...order,
              total_amount: Number(order.total_amount),
              delivery_fee: Number(order.delivery_fee),
              items: itemsData || [],
            };
          })
        );
        setOrders(ordersWithItems);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Orders</h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
                {/* Order Header */}
                <div className="p-4 md:p-6 bg-muted/50 border-b border-border">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Order #{order.order_number}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(order.created_at)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <p className="text-lg font-bold text-primary">
                        ₹{(order.total_amount + order.delivery_fee).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-4 md:p-6">
                  <div className="space-y-4">
                    {order.items.map(item => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img
                          src={item.product_image || '/placeholder.svg'}
                          alt={item.product_name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{item.product_name}</h4>
                          <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-medium">₹{(item.product_price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Info */}
                  <div className="mt-6 pt-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">Delivery Address:</span>{' '}
                      {order.address}, {order.city}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <Package className="w-12 h-12 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
            <p className="text-muted-foreground mb-6">
              Start shopping to see your orders here
            </p>
            <Link to="/shop">
              <Button className="btn-primary gap-2" size="lg">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
              </Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Orders;
