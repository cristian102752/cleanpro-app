import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, Pressable } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { ServicesStackParamList } from '../navigation/types';
import { MOCK_SERVICES } from '../data/mockData';
import { useFavoritesStore } from '../stores/favoritesStore';
import { COLORS, SPACING, RADIUS } from '../theme';

type RoutePropDetail = RouteProp<ServicesStackParamList, 'ServiceDetail'>;

// Semana 04 - detalle + toggle de favoritos con Zustand
export function ServiceDetailScreen(): React.JSX.Element {
  const route = useRoute<RoutePropDetail>();
  const { id } = route.params;
  const service = MOCK_SERVICES.find((s) => s.id === id);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFav = useFavoritesStore((s) => s.favoriteServiceIds.includes(id));

  if (!service) return <Text style={{ color: COLORS.error }}>No encontrado</Text>;

  const formatPrice = (p: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p);
  const categoryColor = COLORS.category[service.category];

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: service.imageUri }} style={styles.hero} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.badge, { backgroundColor: `${categoryColor}33` }]}>
            <Text style={[styles.badgeText, { color: categoryColor }]}>{service.category}</Text>
          </View>
          <Text style={styles.rating}>⭐ {service.rating} • {service.durationMinutes} min</Text>
        </View>
        <Text style={styles.title}>{service.name}</Text>
        <Text style={styles.price}>{formatPrice(service.price)}</Text>
        <Text style={styles.desc}>{service.description}</Text>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>✅ Incluye</Text>
          {service.includes.map((inc, i) => (
            <Text key={i} style={styles.include}>• {inc}</Text>
          ))}
        </View>
        <Pressable style={[styles.favBtn, isFav && styles.favBtnActive]} onPress={() => toggleFavorite(service)}>
          <Text style={[styles.favText, isFav && styles.favTextActive]}>{isFav ? '❤️ En Favoritos' : '🤍 Agregar a Favoritos'}</Text>
        </Pressable>
        <Pressable style={styles.bookBtn} onPress={() => alert(`¡Servicio ${service.name} agendado!`)}>
          <Text style={styles.bookText}>📅 Agendar Servicio</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  hero: { width: '100%', height: 240, backgroundColor: COLORS.card },
  body: { padding: SPACING.lg, gap: SPACING.md },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: RADIUS.full },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  rating: { fontSize: 13, color: COLORS.textSecondary },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.textPrimary },
  price: { fontSize: 24, fontWeight: '700', color: COLORS.accent },
  desc: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 22 },
  section: { gap: SPACING.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  include: { color: COLORS.textSecondary, fontSize: 14 },
  favBtn: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center' },
  favBtnActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  favText: { color: COLORS.textSecondary, fontWeight: '600' },
  favTextActive: { color: COLORS.accent },
  bookBtn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center' },
  bookText: { color: '#000', fontWeight: '700', fontSize: 16 },
});
