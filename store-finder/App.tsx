import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button } from 'react-native';
import { useMemo, useState } from 'react';
import { ShoppingList } from './src/components/ShoppingList';
import { Results } from './src/components/Results';
import { ShoppingItem } from './src/types';
import { MOCK_STORES } from './src/data/stores';
import { optimizeStores } from './src/lib/optimizer';

export default function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [findPressed, setFindPressed] = useState(false);

  const plan = useMemo(() => {
    if (!findPressed || items.length === 0) return null;
    return optimizeStores(items, MOCK_STORES);
  }, [items, findPressed]);

  const onFindStores = () => {
    setFindPressed(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Store Finder</Text>
        <ShoppingList items={items} onChange={setItems} />
        <View style={styles.ctaRow}>
          <Button title="Find Stores" onPress={onFindStores} />
          <Button title="Reset" onPress={() => { setItems([]); setFindPressed(false); }} />
        </View>
        <Results plan={plan} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
