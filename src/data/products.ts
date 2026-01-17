import { Product } from '@/context/CartContext';

export const products: Product[] = [
  // Fruits
  { id: 1, name: 'Fresh Apples', price: 120, image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400', category: 'Fruits', unit: 'kg' },
  { id: 2, name: 'Ripe Bananas', price: 60, image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400', category: 'Fruits', unit: 'dozen' },
  { id: 3, name: 'Juicy Oranges', price: 80, image: 'https://images.unsplash.com/photo-1547514701-42782101795e?w=400', category: 'Fruits', unit: 'kg' },
  { id: 4, name: 'Fresh Mangoes', price: 150, image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?w=400', category: 'Fruits', unit: 'kg' },
  { id: 5, name: 'Sweet Grapes', price: 100, image: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=400', category: 'Fruits', unit: 'kg' },
  { id: 6, name: 'Strawberries', price: 200, image: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=400', category: 'Fruits', unit: 'box' },
  
  // Vegetables
  { id: 7, name: 'Fresh Tomatoes', price: 40, image: 'https://images.unsplash.com/photo-1546470427-227c7369a9c8?w=400', category: 'Vegetables', unit: 'kg' },
  { id: 8, name: 'Green Spinach', price: 30, image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400', category: 'Vegetables', unit: 'bunch' },
  { id: 9, name: 'Carrots', price: 50, image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=400', category: 'Vegetables', unit: 'kg' },
  { id: 10, name: 'Fresh Potatoes', price: 35, image: 'https://images.unsplash.com/photo-1518977676601-b53f82ber3523?w=400', category: 'Vegetables', unit: 'kg' },
  { id: 11, name: 'Onions', price: 40, image: 'https://images.unsplash.com/photo-1518977956812-cd3dbadaaf31?w=400', category: 'Vegetables', unit: 'kg' },
  { id: 12, name: 'Bell Peppers', price: 80, image: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=400', category: 'Vegetables', unit: 'kg' },
  
  // Dairy
  { id: 13, name: 'Fresh Milk', price: 60, image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400', category: 'Dairy', unit: 'liter' },
  { id: 14, name: 'Greek Yogurt', price: 85, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400', category: 'Dairy', unit: 'cup' },
  { id: 15, name: 'Cheese Block', price: 250, image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=400', category: 'Dairy', unit: 'pack' },
  { id: 16, name: 'Fresh Butter', price: 180, image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=400', category: 'Dairy', unit: 'pack' },
  { id: 17, name: 'Paneer', price: 120, image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400', category: 'Dairy', unit: 'pack' },
  { id: 18, name: 'Eggs', price: 90, image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400', category: 'Dairy', unit: 'dozen' },
  
  // Snacks
  { id: 19, name: 'Potato Chips', price: 50, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400', category: 'Snacks', unit: 'pack' },
  { id: 20, name: 'Mixed Nuts', price: 350, image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=400', category: 'Snacks', unit: 'pack' },
  { id: 21, name: 'Cookies', price: 120, image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400', category: 'Snacks', unit: 'pack' },
  { id: 22, name: 'Crackers', price: 80, image: 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?w=400', category: 'Snacks', unit: 'pack' },
  
  // Beverages
  { id: 23, name: 'Orange Juice', price: 90, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400', category: 'Beverages', unit: 'liter' },
  { id: 24, name: 'Green Tea', price: 150, image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?w=400', category: 'Beverages', unit: 'box' },
  { id: 25, name: 'Coffee Beans', price: 400, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400', category: 'Beverages', unit: 'pack' },
  { id: 26, name: 'Coconut Water', price: 50, image: 'https://images.unsplash.com/photo-1525385133512-2f3bdd509f9c?w=400', category: 'Beverages', unit: 'bottle' },
];

export const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Snacks', 'Beverages'];
