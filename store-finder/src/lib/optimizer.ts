import { OptimizedPlan, ShoppingItem, Store, StoreSelection } from '../types';

// Simple greedy optimizer:
// - For each needed item, pick the store with the cheapest available unit price (break ties by closer distance)
// - Aggregate selections by store and compute totals
// - This does not try to minimize number of stores; it's a price-first heuristic
export function optimizeStores(
  requestedItems: ShoppingItem[],
  stores: Store[],
): OptimizedPlan {
  const selectionsByStoreId: Record<string, StoreSelection> = {};
  const unfulfilled: string[] = [];

  for (const item of requestedItems) {
    if (!item.quantity || item.quantity <= 0) continue;

    let bestStore: Store | null = null;
    let bestProductIdx: number = -1;

    for (const store of stores) {
      const idx = store.products.findIndex(p => p.sku === item.name && p.stock >= item.quantity);
      if (idx === -1) continue;

      if (bestStore === null) {
        bestStore = store;
        bestProductIdx = idx;
        continue;
      }

      const current = store.products[idx];
      const bestCurrent = bestStore.products[bestProductIdx];

      if (
        current.price < bestCurrent.price ||
        (current.price === bestCurrent.price && store.distanceKm < bestStore.distanceKm)
      ) {
        bestStore = store;
        bestProductIdx = idx;
      }
    }

    if (!bestStore || bestProductIdx === -1) {
      unfulfilled.push(item.name);
      continue;
    }

    const chosenProduct = bestStore.products[bestProductIdx];
    const subtotal = chosenProduct.price * item.quantity;

    if (!selectionsByStoreId[bestStore.id]) {
      selectionsByStoreId[bestStore.id] = {
        storeId: bestStore.id,
        storeName: bestStore.name,
        items: [],
        subtotal: 0,
      };
    }

    selectionsByStoreId[bestStore.id].items.push({
      itemName: item.name,
      sku: chosenProduct.sku,
      quantity: item.quantity,
      unitPrice: chosenProduct.price,
    });
    selectionsByStoreId[bestStore.id].subtotal += subtotal;
  }

  const selectedStores = Object.values(selectionsByStoreId).sort(
    (a, b) => a.storeName.localeCompare(b.storeName),
  );

  const totalCost = selectedStores.reduce((acc, s) => acc + s.subtotal, 0);

  return {
    selectedStores,
    totalCost,
    unfulfilledItems: unfulfilled,
  };
}
