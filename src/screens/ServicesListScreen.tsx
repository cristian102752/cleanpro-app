import React, { useState, useMemo, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Pressable,
  RefreshControl,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ServicesStackParamList } from '../navigation/types';
import { useServices } from '../hooks/useServices';
import { usePreferences } from '../hooks/usePreferences';
import { useThemeColors } from '../hooks/useThemeColors';
import { AnimatedServiceCard } from '../components/AnimatedServiceCard';
import { LoadingShimmer } from '../components/LoadingShimmer';
import { Service } from '../types';
import { SPACING, RADIUS, TYPOGRAPHY, ThemeColors } from '../theme';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type NavProp = NativeStackNavigationProp<ServicesStackParamList, 'ServicesList'>;

export function ServicesListScreen(): React.JSX.Element {
  const navigation = useNavigation<NavProp>();
  const insets = useSafeAreaInsets();
  const COLORS = useThemeColors();
  const { preferences, reload } = usePreferences(); // FIX: tema + vista lista/grid + orden
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: services, isLoading, isError, refetch, isFetching, error } = useServices();

  // FIX Semana 07: recarga preferencias cada vez que la pestaña gana foco
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload])
  );

  const isGrid = preferences.listView === 'grid';

  const categories: string[] = ['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion'];

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  }, [search, selectedCategory, isGrid]);

  const filtered = useMemo(() => {
    if (!services) return [];
    const list = services.filter((s) => {
      const matchesSearch =
        search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.description.toLowerCase().includes(search.toLowerCase());
      const matchesCat = !selectedCategory || s.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
    // FIX Semana 07: ordenar según preferencia sortBy
    const sorted = [...list];
    if (preferences.sortBy === 'name') sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (preferences.sortBy === 'price') sorted.sort((a, b) => a.price - b.price);
    if (preferences.sortBy === 'rating') sorted.sort((a, b) => b.rating - a.rating);
    return sorted;
  }, [services, search, selectedCategory, preferences.sortBy]);

  const handlePress = useCallback(
    (service: Service) => {
      navigation.navigate('ServiceDetail', { id: service.id, name: service.name });
    },
    [navigation]
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Service; index: number }) => (
      <AnimatedServiceCard service={item} index={index} onPress={handlePress} grid={isGrid} />
    ),
    [handlePress, isGrid]
  );

  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);

  if (isLoading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.searchContainer}>
          <View style={[styles.searchInput, { backgroundColor: COLORS.card, height: 48 }]} />
        </View>
        <LoadingShimmer />
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
        <TextInput
          placeholder={isGrid ? 'Buscar...' : 'Buscar servicio... ej: residencial, vidrios'}
          placeholderTextColor={COLORS.textMuted}
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          horizontal
          data={categories}
          keyExtractor={(c) => c}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
          renderItem={({ item }) => (
            <Pressable
              style={[styles.catChip, selectedCategory === item && styles.catChipActive]}
              onPress={() => setSelectedCategory(selectedCategory === item ? null : item)}
            >
              <Text style={[styles.catText, selectedCategory === item && styles.catTextActive]}>{item}</Text>
            </Pressable>
          )}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={isGrid ? 2 : 1} // FIX Semana 07 - vista grid
        key={isGrid ? 'grid' : 'list'}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        refreshControl={<RefreshControl refreshing={isFetching && !isLoading} onRefresh={refetch} tintColor={COLORS.accent} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.count}>
              {filtered.length} servicios • {isGrid ? 'grid' : 'lista'} • por {preferences.sortBy}
            </Text>
            <Pressable style={styles.createBtn} onPress={() => navigation.navigate('CreateService')}>
              <Text style={styles.createBtnText}>+ Nuevo</Text>
            </Pressable>
          </View>
        }
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

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, padding: SPACING.lg },
    errorText: { fontSize: TYPOGRAPHY.h3.fontSize, fontWeight: TYPOGRAPHY.h3.fontWeight, color: COLORS.error },
    errorDetail: { fontSize: TYPOGRAPHY.caption.fontSize, color: COLORS.textSecondary, textAlign: 'center' },
    retryBtn: { backgroundColor: COLORS.accent, paddingHorizontal: SPACING.lg, paddingVertical: SPACING.sm, borderRadius: RADIUS.md, marginTop: SPACING.sm },
    retryText: { color: COLORS.background, fontWeight: '600' },
    searchContainer: { padding: SPACING.base, paddingBottom: SPACING.sm, backgroundColor: COLORS.background },
    searchInput: {
      backgroundColor: COLORS.surface,
      borderRadius: RADIUS.lg,
      paddingHorizontal: SPACING.base,
      paddingVertical: SPACING.md,
      color: COLORS.textPrimary,
      borderWidth: 1,
      borderColor: COLORS.border,
      fontSize: TYPOGRAPHY.size.base,
      height: 48,
    },
    categoriesContainer: { paddingBottom: SPACING.sm },
    categoriesList: { paddingHorizontal: SPACING.base },
    catChip: {
      backgroundColor: COLORS.surface,
      paddingHorizontal: SPACING.md,
      paddingVertical: SPACING.sm,
      borderRadius: RADIUS.full,
      borderWidth: 1,
      borderColor: COLORS.border,
      marginRight: SPACING.sm,
    },
    catChipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
    catText: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary, textTransform: 'capitalize' },
    catTextActive: { color: COLORS.accent, fontWeight: '600' },
    list: { padding: SPACING.base, paddingTop: 0, paddingBottom: 100 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.md, marginTop: SPACING.sm },
    count: { fontSize: TYPOGRAPHY.label.fontSize, fontWeight: TYPOGRAPHY.label.fontWeight, color: COLORS.textSecondary, textTransform: 'uppercase', flex: 1 },
    createBtn: { backgroundColor: COLORS.accent, paddingHorizontal: SPACING.md, paddingVertical: 6, borderRadius: RADIUS.full },
    createBtnText: { color: COLORS.background, fontWeight: '700', fontSize: TYPOGRAPHY.size.sm },
    empty: { alignItems: 'center', paddingTop: 60, gap: SPACING.sm },
    emptyTitle: { fontSize: TYPOGRAPHY.h3.fontSize, fontWeight: TYPOGRAPHY.h3.fontWeight, color: COLORS.textPrimary },
    emptySub: { fontSize: TYPOGRAPHY.caption.fontSize, color: COLORS.textSecondary },
  });
}
