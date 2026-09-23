import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable, RefreshControl, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../navigation/types';
import { ServiceCard } from '../components/ServiceCard';
import { useServices } from '../hooks/useServices';
import { Service } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

type NavProp = NativeStackNavigationProp<ServicesStackParamList, 'ServicesList'>;

// Semana 05 - datos con TanStack Query: loading, error y pull-to-refresh
export function ServicesListScreen(): React.JSX.Element {
  const navigation = useNavigation<NavProp>();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data, isLoading, isError, refetch, isFetching } = useServices();
  const categories = ['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion'];

  const filtered = useMemo(() => {
    if (!data) return [];
    return data.filter((s) => {
      const okSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase());
      const okCat = !selectedCategory || s.category === selectedCategory;
      return okSearch && okCat;
    });
  }, [data, search, selectedCategory]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
        <Text style={styles.loadingText}>Cargando servicios...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>❌ Error cargando servicios</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar servicio..." placeholderTextColor={COLORS.textMuted} style={styles.searchInput} value={search} onChangeText={setSearch} />
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(c) => c}
        showsHorizontalScrollIndicator={false}
        style={styles.cats}
        contentContainerStyle={styles.catsList}
        renderItem={({ item }) => (
          <Pressable style={[styles.chip, selectedCategory === item && styles.chipActive]} onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}>
            <Text style={[styles.chipText, selectedCategory === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        )}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} tintColor={COLORS.accent} />}
        renderItem={({ item }) => (
          <ServiceCard service={item} onPress={(s: Service) => navigation.navigate('ServiceDetail', { id: s.id, name: s.name })} />
        )}
        ListHeaderComponent={<Text style={styles.count}>{filtered.length} servicios • CleanPro</Text>}
        ListEmptyComponent={<Text style={styles.empty}>No se encontraron servicios</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  loadingText: { color: COLORS.textSecondary },
  errorText: { color: COLORS.error, fontSize: 16 },
  retryBtn: { backgroundColor: COLORS.accent, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.md },
  retryText: { color: '#000', fontWeight: '700' },
  searchContainer: { padding: SPACING.base, paddingBottom: SPACING.sm },
  searchInput: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, color: COLORS.textPrimary, borderWidth: 1, borderColor: COLORS.border },
  cats: { maxHeight: 50 },
  catsList: { paddingHorizontal: SPACING.base },
  chip: { backgroundColor: COLORS.surface, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.sm },
  chipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  chipText: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary, textTransform: 'capitalize' },
  chipTextActive: { color: COLORS.accent, fontWeight: '600' },
  list: { padding: SPACING.base, paddingTop: 0 },
  count: { ...TYPOGRAPHY.label, textTransform: 'uppercase', marginBottom: SPACING.md },
  empty: { ...TYPOGRAPHY.caption, textAlign: 'center', marginTop: 40 },
});
