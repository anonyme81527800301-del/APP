import { ItemOffersMap, OptimizedPlan, ShoppingItem, StoreSelection } from '../types';

export function optimizeFromOffers(items: ShoppingItem[], offers: ItemOffersMap): OptimizedPlan {
  const selectionsByStore: Record<string, StoreSelection> = {};
  const unfulfilled: string[] = [];

  for (const item of items) {
    const list = offers[item.name] ?? [];
    if (!list.length) {
      unfulfilled.push(item.name);
      continue;
    }

    const cheapest = list[0];
    if (!selectionsByStore[cheapest.storeName]) {
      selectionsByStore[cheapest.storeName] = {
        storeId: cheapest.storeName.toLowerCase().replace(/\s+/g, '-'),
        storeName: cheapest.storeName,
        items: [],
        subtotal: 0,
      };
    }
    selectionsByStore[cheapest.storeName].items.push({
      itemName: item.name,
      sku: item.name,
      quantity: item.quantity,
      unitPrice: cheapest.price,
    });
    selectionsByStore[cheapest.storeName].subtotal += cheapest.price * item.quantity;
  }

  const selectedStores = Object.values(selectionsByStore).sort((a, b) => a.storeName.localeCompare(b.storeName));
  const totalCost = selectedStores.reduce((sum, s) => sum + s.subtotal, 0);
  return { selectedStores, totalCost, unfulfilledItems: unfulfilled };
}
