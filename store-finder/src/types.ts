export type ShoppingItem = {
  id: string;
  name: string;
  quantity: number;
};

export type StoreProduct = {
  sku: string;
  name: string;
  price: number; // in currency units
  stock: number; // available quantity
};

export type Store = {
  id: string;
  name: string;
  distanceKm: number;
  products: StoreProduct[];
};

export type OptimizedPlan = {
  selectedStores: StoreSelection[];
  totalCost: number;
  unfulfilledItems: string[]; // item names that couldn't be fulfilled
};

export type StoreSelection = {
  storeId: string;
  storeName: string;
  items: Array<{
    itemName: string;
    sku: string;
    quantity: number;
    unitPrice: number;
  }>;
  subtotal: number;
};
