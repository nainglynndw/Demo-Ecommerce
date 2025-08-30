import {Product} from '../types/product';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    description: 'Latest iPhone with Pro camera system and A16 Bionic chip',
    price: 999.99,
    category: 'Electronics',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
    ],
    stock: 15,
    rating: 4.8,
    reviews: 342,
    createdBy: 'user1',
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
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400'
    ],
    stock: 25,
    rating: 4.6,
    reviews: 128,
    createdBy: 'user2',
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
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400'
    ],
    stock: 8,
    rating: 4.9,
    reviews: 89,
    createdBy: 'user1',
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
      'https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=400'
    ],
    stock: 20,
    rating: 4.4,
    reviews: 67,
    createdBy: 'user3',
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
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
    ],
    stock: 50,
    rating: 4.7,
    reviews: 234,
    createdBy: 'user4',
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
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400'
    ],
    stock: 12,
    rating: 4.5,
    reviews: 156,
    createdBy: 'user2',
    createdAt: '2024-01-10T16:30:00Z',
    updatedAt: '2024-01-10T16:30:00Z',
  },
];