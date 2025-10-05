import { Store } from '../types';

export const MOCK_STORES: Store[] = [
  {
    id: 's1',
    name: 'FreshMart',
    distanceKm: 1.2,
    products: [
      { sku: 'milk', name: 'Milk 1L', price: 1.29, stock: 50 },
      { sku: 'eggs', name: 'Eggs 12ct', price: 2.49, stock: 30 },
      { sku: 'bread', name: 'Whole Wheat Bread', price: 1.99, stock: 20 },
      { sku: 'apple', name: 'Apple (1kg)', price: 2.2, stock: 15 },
      { sku: 'rice', name: 'Rice (1kg)', price: 1.5, stock: 40 },
    ],
  },
  {
    id: 's2',
    name: 'BudgetGrocer',
    distanceKm: 2.8,
    products: [
      { sku: 'milk', name: 'Milk 1L', price: 1.1, stock: 20 },
      { sku: 'eggs', name: 'Eggs 12ct', price: 2.29, stock: 50 },
      { sku: 'bread', name: 'Whole Wheat Bread', price: 1.8, stock: 10 },
      { sku: 'banana', name: 'Banana (1kg)', price: 1.2, stock: 25 },
      { sku: 'rice', name: 'Rice (1kg)', price: 1.35, stock: 0 },
    ],
  },
  {
    id: 's3',
    name: 'GourmetLane',
    distanceKm: 0.9,
    products: [
      { sku: 'milk', name: 'Organic Milk 1L', price: 1.8, stock: 10 },
      { sku: 'eggs', name: 'Free Range Eggs 12ct', price: 3.99, stock: 20 },
      { sku: 'cheese', name: 'Cheddar Cheese 200g', price: 2.49, stock: 12 },
      { sku: 'bread', name: 'Artisan Bread', price: 3.0, stock: 8 },
      { sku: 'olive-oil', name: 'Olive Oil 500ml', price: 5.5, stock: 5 },
    ],
  },
];
