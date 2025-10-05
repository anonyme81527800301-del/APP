import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { OptimizedPlan } from '../types';

type Props = {
  plan: OptimizedPlan | null;
};

export const Results: React.FC<Props> = ({ plan }) => {
  if (!plan) {
    return (
      <View style={styles.container}>
        <Text style={styles.empty}>Add items and tap Find Stores</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Best Stores</Text>
      {plan.selectedStores.map((s) => (
        <View key={s.storeId} style={styles.card}>
          <Text style={styles.storeName}>{s.storeName}</Text>
          {s.items.map((it) => (
            <Text key={`${s.storeId}-${it.sku}`} style={styles.itemLine}>
              {it.itemName} x{it.quantity} @ {it.unitPrice.toFixed(2)}
            </Text>
          ))}
          <Text style={styles.subtotal}>Subtotal: ${s.subtotal.toFixed(2)}</Text>
        </View>
      ))}
      <Text style={styles.total}>Total: ${plan.totalCost.toFixed(2)}</Text>
      {plan.unfulfilledItems.length > 0 && (
        <Text style={styles.unfulfilled}>
          Unfulfilled: {plan.unfulfilledItems.join(', ')}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#e5e5e5',
  },
  storeName: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  itemLine: { color: '#333' },
  subtotal: { marginTop: 6, fontWeight: '600' },
  total: { fontSize: 18, fontWeight: '700', marginTop: 8 },
  unfulfilled: { color: '#b00020', marginTop: 6 },
  empty: { color: '#666', fontStyle: 'italic' },
});
