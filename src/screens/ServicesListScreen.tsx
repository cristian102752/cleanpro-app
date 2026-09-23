import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable } from 'react-native';
import { ServiceCard } from '../components/ServiceCard';
import { MOCK_SERVICES } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

// Semana 02 - FlatList + búsqueda en tiempo real + chips de categoría
export function ServicesListScreen(): React.JSX.Element {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion'];

  const filtered = useMemo(() => {
    return MOCK_SERVICES.filter((s) => {
      const okSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
      const okCat = !selectedCategory || s.category === selectedCategory;
      return okSearch && okCat;
    });
  }, [search, selectedCategory]);

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Buscar servicio... ej: residencial, vidrios"
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <FlatList
        horizontal
        data={categories}
        keyExtractor={(c) => c}
        showsHorizontalScrollIndicator={false}
        style={styles.cats}
        contentContainerStyle={styles.catsList}
        renderItem={({ item }) => (
          <Pressable
            style={[styles.chip, selectedCategory === item && styles.chipActive]}
            onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
          >
            <Text style={[styles.chipText, selectedCategory === item && styles.chipTextActive]}>{item}</Text>
          </Pressable>
        )}
      />

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ServiceCard service={item} onPress={(s) => {}} />}
        ListHeaderComponent={<Text style={styles.count}>{filtered.length} servicios • CleanPro</Text>}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No se encontraron servicios</Text>
            <Text style={styles.emptySub}>Intenta con otra búsqueda o categoría</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  searchContainer: { padding: SPACING.base, paddingBottom: SPACING.sm },
  searchInput: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, color: COLORS.textPrimary, borderWidth: 1, borderColor: COLORS.border, fontSize: TYPOGRAPHY.size.base },
  cats: { maxHeight: 50 },
  catsList: { paddingHorizontal: SPACING.base },
  chip: { backgroundColor: COLORS.surface, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.sm },
  chipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  chipText: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary, textTransform: 'capitalize' },
  chipTextActive: { color: COLORS.accent, fontWeight: '600' },
  list: { padding: SPACING.base, paddingTop: 0 },
  count: { ...TYPOGRAPHY.label, textTransform: 'uppercase', marginBottom: SPACING.md },
  empty: { alignItems: 'center', paddingTop: 60, gap: SPACING.sm },
  emptyTitle: { ...TYPOGRAPHY.h3 },
  emptySub: { ...TYPOGRAPHY.caption },
});
