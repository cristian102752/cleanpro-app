import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { View, Text, FlatList, TextInput, StyleSheet, Pressable, RefreshControl, LayoutAnimation, Platform, UIManager, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../navigation/types';
import { useServices } from '../hooks/useServices';
import { usePreferences } from '../hooks/usePreferences';
import { useThemeColors } from '../hooks/useThemeColors';
import { ServiceCard } from '../components/ServiceCard';
import { Service } from '../types';
import { SPACING, RADIUS, TYPOGRAPHY, ThemeColors } from '../theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type NavProp = NativeStackNavigationProp<ServicesStackParamList, 'ServicesList'>;

// Semana 07 - tema dinámico + vista grid + orden + SafeArea + recarga al enfocar
export function ServicesListScreen(): React.JSX.Element {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const COLORS = useThemeColors();
  const { preferences, reload } = usePreferences();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const { data, isLoading, isError, refetch, isFetching, error } = useServices();

  useFocusEffect(useCallback(() => { reload(); }, [reload]));

  const isGrid = preferences.listView === 'grid';
  const categories = ['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion'];

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [search, selectedCategory, isGrid]);

  const filtered = useMemo(() => {
    if (!data) return [];
    const list = data.filter((s) => {
      const okSearch = search === '' || s.name.toLowerCase().includes(search.toLowerCase()) || s.description.toLowerCase().includes(search.toLowerCase());
      const okCat = !selectedCategory || s.category === selectedCategory;
      return okSearch && okCat;
    });
    const sorted = [...list];
    if (preferences.sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (preferences.sortBy === 'price') sorted.sort((a, b) => a.price - b.price);
    if (preferences.sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [data, search, selectedCategory, preferences.sortBy]);

  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={COLORS.accent} />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={[styles.centered, { paddingTop: insets.top }]}>
        <Text style={styles.errorText}>❌ Error cargando servicios</Text>
        <Text style={styles.errorDetail}>{(error as Error)?.message}</Text>
        <Pressable style={styles.retryBtn} onPress={() => refetch()}>
          <Text style={styles.retryText}>Reintentar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar servicio... ej: residencial, vidrios" placeholderTextColor={COLORS.textMuted} style={styles.searchInput} value={search} onChangeText={setSearch} />
      </View>
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(c) => c}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
        renderItem={({ item }) => (
          <Pressable style={[styles.catChip, selectedCategory === item && styles.catChipActive]} onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}>
            <Text style={[styles.catText, selectedCategory === item && styles.catTextActive]}>{item}</Text>
          </Pressable>
        )}
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        numColumns={isGrid ? 2 : 1}
        key={isGrid ? 'grid' : 'list'}
        contentContainerStyle={styles.list}
        refreshControl={<RefreshControl refreshing={isFetching && !isLoading} onRefresh={refetch} tintColor={COLORS.accent} />}
        renderItem={({ item }) => (
          <View style={isGrid ? { flex: 1, marginHorizontal: 4 } : undefined}>
            <ServiceCard service={item} onPress={(s: Service) => navigation.navigate('ServiceDetail', { id: s.id, name: s.name })} />
          </View>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.count}>{filtered.length} servicios • {isGrid ? 'grid' : 'lista'} • por {preferences.sortBy}</Text>
            <Pressable style={styles.createBtn} onPress={() => navigation.navigate('CreateService')}>
              <Text style={styles.createBtnText}>+ Nuevo</Text>
            </Pressable>
          </View>
        }
        ListEmptyComponent={<Text style={styles.empty}>No se encontraron servicios</Text>}
      />
    </View>
  );
}

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    centered: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, padding: SPACING.lg },
    errorText: { fontSize: 17, fontWeight: '600', color: COLORS.error },
    errorDetail: { fontSize: 13, color: COLORS.textSecondary, textAlign: 'center' },
    retryBtn: { backgroundColor: COLORS.accent, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.md },
    retryText: { color: COLORS.background, fontWeight: '600' },
    searchContainer: { padding: SPACING.base, paddingBottom: SPACING.sm },
    searchInput: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, paddingHorizontal: SPACING.base, paddingVertical: SPACING.md, color: COLORS.textPrimary, borderWidth: 1, borderColor: COLORS.border, fontSize: TYPOGRAPHY.size.base, height: 48 },
    categoriesList: { paddingHorizontal: SPACING.base, paddingBottom: SPACING.sm },
    catChip: { backgroundColor: COLORS.surface, paddingHorizontal: SPACING.md, paddingVertical: SPACING.sm, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border, marginRight: SPACING.sm },
    catChipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
    catText: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary, textTransform: 'capitalize' },
    catTextActive: { color: COLORS.accent, fontWeight: '600' },
    list: { padding: SPACING.base, paddingTop: 0, paddingBottom: 100 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md, marginTop: SPACING.sm },
    count: { fontSize: TYPOGRAPHY.label.fontSize, fontWeight: TYPOGRAPHY.label.fontWeight, color: COLORS.textSecondary, textTransform: 'uppercase', flex: 1 },
    createBtn: { backgroundColor: COLORS.accent, paddingHorizontal: SPACING.md, paddingVertical: 6, borderRadius: RADIUS.full },
    createBtnText: { color: COLORS.background, fontWeight: '700', fontSize: TYPOGRAPHY.size.sm },
    empty: { fontSize: TYPOGRAPHY.caption.fontSize, color: COLORS.textSecondary, textAlign: 'center', marginTop: 40 },
  });
}
