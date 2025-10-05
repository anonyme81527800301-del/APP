import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ShoppingItem } from '../types';

type Props = {
  items: ShoppingItem[];
  onChange: (items: ShoppingItem[]) => void;
};

export const ShoppingList: React.FC<Props> = ({ items, onChange }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('1');

  const addItem = () => {
    const trimmed = name.trim();
    const qty = Math.max(1, Number(quantity) || 1);
    if (!trimmed) return;
    const newItem: ShoppingItem = {
      id: `${trimmed}-${Date.now()}`,
      name: trimmed,
      quantity: qty,
    };
    onChange([...items, newItem]);
    setName('');
    setQuantity('1');
  };

  const removeItem = (id: string) => {
    onChange(items.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string, q: string) => {
    const qty = Math.max(1, Number(q) || 1);
    onChange(items.map(i => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Shopping List</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="e.g. milk, eggs, rice"
          value={name}
          onChangeText={setName}
          style={[styles.input, { flex: 2 }]}
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Qty"
          value={quantity}
          onChangeText={setQuantity}
          keyboardType="numeric"
          style={[styles.input, { width: 70, marginLeft: 8 }]}
        />
        <Button title="Add" onPress={addItem} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.listRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <TextInput
              value={String(item.quantity)}
              onChangeText={(t) => updateQuantity(item.id, t)}
              keyboardType="numeric"
              style={[styles.input, { width: 60 }]}
            />
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>No items yet</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  heading: { fontSize: 20, fontWeight: '600', marginBottom: 8 },
  row: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  listRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e2e2e2',
  },
  itemName: { flex: 1, fontSize: 16 },
  removeBtn: {
    marginLeft: 12,
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  removeText: { color: 'white', fontWeight: '600' },
  empty: { color: '#666', fontStyle: 'italic', marginTop: 12 },
});
