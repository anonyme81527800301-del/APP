import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Button, Switch, ActivityIndicator } from 'react-native';
import { useMemo, useState } from 'react';
import { ShoppingList } from './src/components/ShoppingList';
import { Results } from './src/components/Results';
import { ShoppingItem } from './src/types';
import { MOCK_STORES } from './src/data/stores';
import { optimizeStores } from './src/lib/optimizer';
import { fetchGoogleOffers } from './src/lib/googleProvider';
import { optimizeFromOffers } from './src/lib/liveOptimizer';

export default function App() {
  const [items, setItems] = useState<ShoppingItem[]>([]);
  const [findPressed, setFindPressed] = useState(false);
  const [useLivePrices, setUseLivePrices] = useState(false);
  const [loading, setLoading] = useState(false);

  const plan = useMemo(() => {
    if (!findPressed || items.length === 0 || loading || useLivePrices) return null;
    return optimizeStores(items, MOCK_STORES);
  }, [items, findPressed, loading, useLivePrices]);

  const onFindStores = async () => {
    setFindPressed(true);
    if (!useLivePrices) return;
    setLoading(true);
    try {
      const offers = await fetchGoogleOffers(items.map((i) => i.name));
      const livePlan = optimizeFromOffers(items, offers);
      // mimic storing into local UI state by leveraging findPressed + Results fallback
      // simplest is to temporarily set a flag and show it via Results component prop below
      setTempPlan(livePlan);
    } finally {
      setLoading(false);
    }
  };

  const [tempPlan, setTempPlan] = useState<any>(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.title}>Store Finder</Text>
        <ShoppingList items={items} onChange={setItems} />
        <View style={styles.toggleRow}>
          <Text>Use live prices (Google)</Text>
          <Switch value={useLivePrices} onValueChange={setUseLivePrices} />
        </View>
        <View style={styles.ctaRow}>
          <Button title="Find Stores" onPress={onFindStores} />
          <Button title="Reset" onPress={() => { setItems([]); setFindPressed(false); }} />
        </View>
        {loading ? (
          <View style={{ padding: 16 }}>
            <ActivityIndicator />
            <Text style={{ marginTop: 8 }}>Fetching prices…</Text>
          </View>
        ) : (
          <Results plan={useLivePrices ? tempPlan : plan} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8fafc' },
  scroll: { padding: 16 },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 8 },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    paddingHorizontal: 16,
  },
  ctaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingHorizontal: 16,
  },
});
