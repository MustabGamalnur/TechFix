import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCallback, useMemo, useRef } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import FilterChips from '../../src/components/FilterChips';
import ServiceCard from '../../src/components/ServiceCard';
import SummaryBanner from '../../src/components/SummaryBanner';
import { useServices } from '../../src/context/ServiceContext';
import { useServiceFilter } from '../../src/hooks/useServiceFilter';
import { COLORS, RADIUS, SPACE, TYPO } from '../../src/styles/tokens';

export default function HomeScreen() {
  const router = useRouter();
  const { items } = useServices();
  const {
    query,
    setQuery,
    selectedStatus,
    setSelectedStatus,
    filteredItems,
  } = useServiceFilter(items);

  const searchRef = useRef<React.ComponentRef<typeof TextInput>>(null);

  const stats = useMemo(() => {
    const completed = items.filter((i) => i.status === 'Selesai').length;
    const revenue = items.reduce((sum, i) => sum + i.estimatedCost, 0);
    return {
      total: items.length,
      completed,
      revenue,
    };
  }, [items]);

  const handleOpenDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: { id: String(id) },
      });
    },
    [router]
  );

  const handleClearSearch = useCallback(() => {
    setQuery('');
    searchRef.current?.focus();
  }, [setQuery]);

  return (
    <View style={styles.container}>
      <SummaryBanner
        totalUnits={stats.total}
        completedUnits={stats.completed}
        estimatedRevenue={stats.revenue}
      />

      <View style={styles.searchBox}>
        <Ionicons name="search-outline" size={18} color={COLORS.muted} />
        <TextInput
          ref={searchRef}
          value={query}
          onChangeText={setQuery}
          placeholder="Cari nama pelanggan, perangkat, keluhan..."
          style={styles.searchInput}
        />
        {query.length > 0 && (
          <Pressable onPress={handleClearSearch}>
            <Ionicons name="close-circle" size={18} color={COLORS.muted} />
          </Pressable>
        )}
      </View>

      <FilterChips selected={selectedStatus} onSelect={setSelectedStatus} />

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <ServiceCard
            item={item}
            onPress={() => handleOpenDetail(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Data servis tidak ditemukan.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACE.l,
    backgroundColor: COLORS.background,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.m,
    paddingHorizontal: SPACE.m,
    marginBottom: SPACE.m,
    gap: SPACE.s,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 10,
    fontSize: TYPO.body,
    color: COLORS.text,
  },
  list: {
    gap: SPACE.m,
    paddingBottom: SPACE.xl,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    marginTop: 40,
  },
});