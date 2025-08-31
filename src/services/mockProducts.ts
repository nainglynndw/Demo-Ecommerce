import { Product } from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone with Pro camera system and A16 Bionic chip',
    price: 999.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    ],
    stock: 15,
    rating: 4.8,
    reviews: 342,
    createdBy: 'demo@test.com',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Nike Air Max 90',
    description: 'Classic running shoes with comfortable cushioning',
    price: 129.99,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400',
    ],
    stock: 25,
    rating: 4.6,
    reviews: 128,
    createdBy: 'john@example.com',
    createdAt: '2024-01-14T15:30:00Z',
    updatedAt: '2024-01-14T15:30:00Z',
  },
  {
    id: '3',
    name: 'MacBook Pro M3',
    description: '14-inch MacBook Pro with M3 chip for professional work',
    price: 1999.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
    ],
    stock: 8,
    rating: 4.9,
    reviews: 89,
    createdBy: 'demo@test.com',
    createdAt: '2024-01-13T09:15:00Z',
    updatedAt: '2024-01-13T09:15:00Z',
  },
  {
    id: '4',
    name: 'Vintage Denim Jacket',
    description: 'Classic denim jacket with vintage wash and comfortable fit',
    price: 79.99,
    category: 'Clothing',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400',
    ],
    stock: 20,
    rating: 4.4,
    reviews: 67,
    createdBy: 'jane@example.com',
    createdAt: '2024-01-12T14:20:00Z',
    updatedAt: '2024-01-12T14:20:00Z',
  },
  {
    id: '5',
    name: 'The Art of Programming',
    description: 'Comprehensive guide to modern programming practices',
    price: 49.99,
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    ],
    stock: 50,
    rating: 4.7,
    reviews: 234,
    createdBy: 'bob@example.com',
    createdAt: '2024-01-11T11:45:00Z',
    updatedAt: '2024-01-11T11:45:00Z',
  },
  {
    id: '6',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium over-ear headphones with noise cancellation',
    price: 299.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400',
    ],
    stock: 12,
    rating: 4.5,
    reviews: 156,
    createdBy: 'john@example.com',
    createdAt: '2024-01-10T16:30:00Z',
    updatedAt: '2024-01-10T16:30:00Z',
  },
  {
    id: '7',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning for comfort',
    price: 39.99,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400',
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    ],
    stock: 30,
    rating: 4.3,
    reviews: 98,
    createdBy: 'demo@test.com',
    createdAt: '2024-01-09T12:00:00Z',
    updatedAt: '2024-01-09T12:00:00Z',
  },
  {
    id: '8',
    name: 'Coffee Maker Pro',
    description: 'Automatic drip coffee maker with programmable timer',
    price: 89.99,
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
      'https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=400',
    ],
    stock: 18,
    rating: 4.6,
    reviews: 145,
    createdBy: 'jane@example.com',
    createdAt: '2024-01-08T14:15:00Z',
    updatedAt: '2024-01-08T14:15:00Z',
  },
  {
    id: '9',
    name: 'Gaming Mouse RGB',
    description: 'High-precision gaming mouse with customizable RGB lighting',
    price: 59.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=400',
    ],
    stock: 22,
    rating: 4.4,
    reviews: 87,
    createdBy: 'bob@example.com',
    createdAt: '2024-01-07T09:30:00Z',
    updatedAt: '2024-01-07T09:30:00Z',
  },
  {
    id: '10',
    name: 'Leather Wallet',
    description:
      'Genuine leather wallet with multiple card slots and coin pocket',
    price: 45.99,
    category: 'Accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
    ],
    stock: 35,
    rating: 4.7,
    reviews: 203,
    createdBy: 'demo@test.com',
    createdAt: '2024-01-06T11:20:00Z',
    updatedAt: '2024-01-06T11:20:00Z',
  },
  {
    id: '11',
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours',
    price: 24.99,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
      'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=400',
    ],
    stock: 45,
    rating: 4.5,
    reviews: 167,
    createdBy: 'jane@example.com',
    createdAt: '2024-01-05T13:45:00Z',
    updatedAt: '2024-01-05T13:45:00Z',
  },
  {
    id: '12',
    name: 'Smart Watch Series 9',
    description: 'Advanced smartwatch with health tracking and GPS',
    price: 399.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400',
    ],
    stock: 14,
    rating: 4.8,
    reviews: 291,
    createdBy: 'john@example.com',
    createdAt: '2024-01-04T10:10:00Z',
    updatedAt: '2024-01-04T10:10:00Z',
  },
  {
    id: '13',
    name: 'Cooking Cookbook Collection',
    description: 'Set of 3 cookbooks covering international cuisine',
    price: 34.99,
    category: 'Books',
    images: [
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400',
    ],
    stock: 28,
    rating: 4.6,
    reviews: 119,
    createdBy: 'bob@example.com',
    createdAt: '2024-01-03T15:25:00Z',
    updatedAt: '2024-01-03T15:25:00Z',
  },
  {
    id: '14',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging pad compatible with all Qi devices',
    price: 29.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1609592863912-f740a23addc7?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    ],
    stock: 40,
    rating: 4.2,
    reviews: 78,
    createdBy: 'demo@test.com',
    createdAt: '2024-01-02T08:50:00Z',
    updatedAt: '2024-01-02T08:50:00Z',
  },
  {
    id: '15',
    name: 'Running Shorts',
    description: 'Lightweight running shorts with moisture-wicking fabric',
    price: 19.99,
    category: 'Sports',
    images: [
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400',
      'https://images.unsplash.com/photo-1506629905607-21e51204dfad?w=400',
    ],
    stock: 55,
    rating: 4.1,
    reviews: 134,
    createdBy: 'jane@example.com',
    createdAt: '2024-01-01T12:30:00Z',
    updatedAt: '2024-01-01T12:30:00Z',
  },
  {
    id: '16',
    name: 'Ceramic Plant Pot Set',
    description: 'Set of 3 decorative ceramic pots for indoor plants',
    price: 32.99,
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400',
      'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    ],
    stock: 25,
    rating: 4.3,
    reviews: 92,
    createdBy: 'john@example.com',
    createdAt: '2023-12-31T16:15:00Z',
    updatedAt: '2023-12-31T16:15:00Z',
  },
  {
    id: '17',
    name: 'USB-C Hub Multi-Port',
    description: '7-in-1 USB-C hub with HDMI, USB ports, and SD card reader',
    price: 49.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
    ],
    stock: 16,
    rating: 4.4,
    reviews: 143,
    createdBy: 'bob@example.com',
    createdAt: '2023-12-30T11:40:00Z',
    updatedAt: '2023-12-30T11:40:00Z',
  },
  {
    id: '18',
    name: 'Organic Green Tea',
    description: 'Premium organic green tea leaves, 100g pack',
    price: 15.99,
    category: 'Food',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
    ],
    stock: 60,
    rating: 4.7,
    reviews: 178,
    createdBy: 'demo@test.com',
    createdAt: '2023-12-29T09:15:00Z',
    updatedAt: '2023-12-29T09:15:00Z',
  },
  {
    id: '19',
    name: 'Bluetooth Speaker Portable',
    description: 'Waterproof portable speaker with 12-hour battery life',
    price: 79.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400',
    ],
    stock: 20,
    rating: 4.5,
    reviews: 165,
    createdBy: 'jane@example.com',
    createdAt: '2023-12-28T14:20:00Z',
    updatedAt: '2023-12-28T14:20:00Z',
  },
  {
    id: '20',
    name: 'Memory Foam Pillow',
    description: 'Contour memory foam pillow for neck and spine support',
    price: 42.99,
    category: 'Home',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    ],
    stock: 32,
    rating: 4.6,
    reviews: 201,
    createdBy: 'john@example.com',
    createdAt: '2023-12-27T10:35:00Z',
    updatedAt: '2023-12-27T10:35:00Z',
  },
];

export const findProductById = (id: string): Product | undefined => {
  return mockProducts.find(product => product.id === id);
};

export const findProductsByCategory = (category: string): Product[] => {
  return mockProducts.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const searchLower = query.toLowerCase();
  return mockProducts.filter(
    product =>
      product.name.toLowerCase().includes(searchLower) ||
      product.description.toLowerCase().includes(searchLower),
  );
};

export const addProduct = (
  product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
): Product => {
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  mockProducts.unshift(newProduct); // Add to beginning for recent first
  return newProduct;
};

export const updateProduct = (
  id: string,
  updates: Partial<Product>,
): Product | null => {
  const productIndex = mockProducts.findIndex(product => product.id === id);
  if (productIndex === -1) return null;

  const updatedProduct: Product = {
    ...mockProducts[productIndex],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  mockProducts[productIndex] = updatedProduct;
  return updatedProduct;
};

export const deleteProduct = (id: string): boolean => {
  const productIndex = mockProducts.findIndex(product => product.id === id);
  if (productIndex === -1) return false;

  mockProducts.splice(productIndex, 1);
  return true;
};

export const getProductsWithFilters = (params: {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sortBy?: keyof Product;
  sortOrder?: 'asc' | 'desc';
}) => {
  let products = [...mockProducts];

  // Apply filters
  if (params.category) {
    products = products.filter(p => p.category === params.category);
  }

  if (params.minPrice !== undefined) {
    products = products.filter(p => p.price >= params.minPrice!);
  }

  if (params.maxPrice !== undefined) {
    products = products.filter(p => p.price <= params.maxPrice!);
  }

  if (params.search) {
    const searchLower = params.search.toLowerCase();
    products = products.filter(
      p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower),
    );
  }

  // Apply sorting
  if (params.sortBy) {
    products.sort((a, b) => {
      let aValue: any = a[params.sortBy!];
      let bValue: any = b[params.sortBy!];

      if (params.sortBy === 'price' || params.sortBy === 'rating') {
        aValue = Number(aValue);
        bValue = Number(bValue);
      }

      if (params.sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });
  }

  return products;
};
