export const mockProducts = [
  {
    id: 1,
    name: 'Truffle Canelé Cake',
    price: 48,
    image: '🍰',
    badge: 'Best Seller',
    description: 'Premium vanilla bean with gold leaf',
    category: 'Cakes',
    stock: 24,
  },
  {
    id: 2,
    name: 'Gold Leaf Macarons Box',
    price: 62,
    image: '✨',
    badge: 'Premium',
    description: 'Assorted French macarons',
    category: 'Pastries',
    stock: 18,
  },
  {
    id: 3,
    name: 'Champagne Tier Cake',
    price: 95,
    image: '🥂',
    badge: 'Signature',
    description: 'Three-tier luxury cake',
    category: 'Cakes',
    stock: 12,
  },
  {
    id: 4,
    name: 'Velvet Plum Canelé',
    price: 45,
    image: '🍰',
    badge: 'Best Seller',
    description: 'Deep plum flavor',
    category: 'Tarts',
    stock: 30,
  },
  {
    id: 5,
    name: 'Midnight Berry Tart',
    price: 52,
    image: '🫐',
    badge: 'Limited',
    description: 'Mixed berry elegance',
    category: 'Tarts',
    stock: 15,
  },
  {
    id: 6,
    name: 'Ethereal Honey Cake',
    price: 55,
    image: '🍯',
    badge: 'Seasonal',
    description: 'Delicate honey infusion',
    category: 'Cakes',
    stock: 20,
  },
];

export const mockDashboardStats = [
  { label: 'Total Revenue', value: '$48,250', change: '+12%', trend: 'up' },
  { label: 'Orders Fulfilled', value: '1,204', change: '+8%', trend: 'up' },
  { label: 'Avg Order Value', value: '$40.07', change: '-5%', trend: 'down' },
  { label: 'Growth Rate', value: '68%', change: 'YoY', trend: 'up' },
];

export const mockTopSellingProducts = [
  { name: 'Truffle Canelé Cake', price: '$48', revenue: '$5,400', image: '🍰' },
  { name: 'Champagne Tier Cake', price: '$95', revenue: '$4,750', image: '🥂' },
  { name: 'Midnight Berry Tart', price: '$52', revenue: '$3,900', image: '🫐' },
];

export const mockRecentOrders = [
  {
    id: 'ORD-001',
    customer: 'Alexandra M.',
    items: 2,
    status: 'delivered',
    date: '12/15/2024',
    total: '$145.00',
    products: ['Truffle Canelé Cake', 'Midnight Berry Tart'],
  },
  {
    id: 'ORD-002',
    customer: 'James P.',
    items: 1,
    status: 'processing',
    date: '12/14/2024',
    total: '$95.00',
    products: ['Champagne Tier Cake'],
  },
  {
    id: 'ORD-003',
    customer: 'Elena R.',
    items: 3,
    status: 'confirmed',
    date: '12/13/2024',
    total: '$210.50',
    products: ['Truffle Canelé Cake', 'Gold Leaf Macarons Box', 'Ethereal Honey Cake'],
  },
];

export const mockUsers = {
  customer: {
    id: 'cust_001',
    name: 'Alexandra Beaumont',
    email: 'alexandra@example.com',
    phone: '+1 (555) 123-4567',
    dob: '1990-05-20',
    role: 'customer',
    address: {
      street: '123 Elegance Avenue',
      city: 'San Francisco',
      state: 'CA',
      zip: '94105',
    },
  },
  manager: {
    id: 'mgr_001',
    name: 'James Wilson',
    email: 'james@cakesandsnacks.com',
    phone: '+1 (555) 987-6543',
    role: 'manager',
  },
};

export const mockPaymentMethods = [
  { id: 'pm_001', brand: 'Visa', last4: '4242', expiry: '12/26', isDefault: true },
  { id: 'pm_002', brand: 'Mastercard', last4: '5555', expiry: '03/27', isDefault: false },
];

export const mockNotifications = [
  { id: 'notif_001', title: 'Order Updates', description: 'Get notified about your order status', enabled: true },
  { id: 'notif_002', title: 'New Collections', description: 'Be first to know about new arrivals', enabled: true },
  { id: 'notif_003', title: 'Special Offers', description: 'Receive promotional offers and discounts', enabled: false },
  { id: 'notif_004', title: 'Account Activity', description: 'Alerts about account security', enabled: true },
];
