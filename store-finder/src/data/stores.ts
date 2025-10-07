import { Store, StoreMeta } from '../types';

export const MONTREAL_STORE_METAS: StoreMeta[] = [
  { name: 'Maxi', domain: 'maxi.ca' },
  { name: 'IGA', domain: 'iga.net' },
  { name: 'Super C', domain: 'superc.ca' },
  { name: 'Jean Coutu', domain: 'jeancoutu.com' },
  { name: 'Pharmaprix', domain: 'pharmaprix.ca' },
];

export const MOCK_STORES: Store[] = [
  {
    id: 'maxi',
    name: 'Maxi',
    distanceKm: 1.1,
    products: [
      { sku: 'milk', name: 'Milk 1L', price: 1.19, stock: 40 },
      { sku: 'eggs', name: 'Eggs 12ct', price: 2.39, stock: 35 },
      { sku: 'bread', name: 'Whole Wheat Bread', price: 1.79, stock: 25 },
      { sku: 'banana', name: 'Banana (1kg)', price: 1.15, stock: 30 },
      { sku: 'rice', name: 'Rice (1kg)', price: 1.29, stock: 20 },
    ],
  },
  {
    id: 'iga',
    name: 'IGA',
    distanceKm: 2.0,
    products: [
      { sku: 'milk', name: 'Milk 1L', price: 1.35, stock: 50 },
      { sku: 'eggs', name: 'Eggs 12ct', price: 2.59, stock: 40 },
      { sku: 'bread', name: 'Whole Wheat Bread', price: 2.09, stock: 15 },
      { sku: 'apple', name: 'Apple (1kg)', price: 2.4, stock: 18 },
      { sku: 'rice', name: 'Rice (1kg)', price: 1.49, stock: 30 },
    ],
  },
  {
    id: 'superc',
    name: 'Super C',
    distanceKm: 1.5,
    products: [
      { sku: 'milk', name: 'Milk 1L', price: 1.09, stock: 25 },
      { sku: 'eggs', name: 'Eggs 12ct', price: 2.19, stock: 60 },
      { sku: 'bread', name: 'Whole Wheat Bread', price: 1.69, stock: 12 },
      { sku: 'banana', name: 'Banana (1kg)', price: 1.05, stock: 20 },
      { sku: 'rice', name: 'Rice (1kg)', price: 1.39, stock: 10 },
    ],
  },
  {
    id: 'jeancoutu',
    name: 'Jean Coutu',
    distanceKm: 0.8,
    products: [
      { sku: 'toothpaste', name: 'Toothpaste', price: 2.99, stock: 20 },
      { sku: 'shampoo', name: 'Shampoo', price: 4.99, stock: 25 },
      { sku: 'soap', name: 'Soap Bar', price: 0.99, stock: 50 },
    ],
  },
  {
    id: 'pharmaprix',
    name: 'Pharmaprix',
    distanceKm: 1.3,
    products: [
      { sku: 'toothpaste', name: 'Toothpaste', price: 3.29, stock: 30 },
      { sku: 'shampoo', name: 'Shampoo', price: 5.49, stock: 15 },
      { sku: 'soap', name: 'Soap Bar', price: 1.09, stock: 60 },
    ],
  },
];
