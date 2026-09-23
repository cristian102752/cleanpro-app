import React from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { useFavoritesStore } from '../stores/favoritesStore';
import { ServiceCard } from '../components/ServiceCard';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

// Semana 04 - Favoritos con Zustand persist
export function FavoritesScreen(): React.JSX.Element {
  const favorites = useFavoritesStore((s) => s.favoriteServices);
  const clear = useFavoritesStore((s) => s.clearFavorites);

  return (
    <View style={styles.container}>
      {favorites.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyIcon}>🤍</Text>
          <Text style={styles.emptyTitle}>Sin favoritos aún</Text>
          <Text style={styles.emptySub}>Agrega servicios desde la pestaña Servicios tocando el corazón</Text>
          <Text style={styles.weekInfo}>Semana 04: Zustand con persist (AsyncStorage)</Text>
        </View>
      ) : (
        <>
          <View style={styles.header}>
            <Text style={styles.count}>{favorites.length} favoritos guardados</Text>
            <Pressable onPress={clear} style={styles.clearBtn}>
              <Text style={styles.clearText}>Limpiar</Text>
            </Pressable>
          </View>
          <FlatList data={favorites} keyExtractor={(s) => s.id} renderItem={({ item }) => <ServiceCard service={item} onPress={() => {}} />} contentContainerStyle={styles.list} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.base },
  count: { ...TYPOGRAPHY.label, textTransform: 'uppercase' },
  clearBtn: { backgroundColor: COLORS.surface, paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.border },
  clearText: { fontSize: 12, color: COLORS.error },
  list: { padding: SPACING.base, paddingTop: 0 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: SPACING.md, padding: SPACING.xl },
  emptyIcon: { fontSize: 48 },
  emptyTitle: { ...TYPOGRAPHY.h2 },
  emptySub: { ...TYPOGRAPHY.caption, textAlign: 'center' },
  weekInfo: { fontSize: 11, color: COLORS.accent, marginTop: SPACING.lg, backgroundColor: COLORS.accentDim, padding: 8, borderRadius: RADIUS.md },
});
