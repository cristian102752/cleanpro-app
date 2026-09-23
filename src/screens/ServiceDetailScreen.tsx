import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Pressable } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ServicesStackParamList } from '../navigation/types';
import { useServiceById } from '../hooks/useServices';
import { useFavoritesStore } from '../stores/favoritesStore';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

type RoutePropDetail = RouteProp<ServicesStackParamList, 'ServiceDetail'>;

export function ServiceDetailScreen(): React.JSX.Element {
  const route = useRoute<RoutePropDetail>();
  const navigation = useNavigation();
  const { id } = route.params;
  const { data: service, isLoading, isError } = useServiceById(id);
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);
  const isFav = useFavoritesStore((s) => s.favoriteServiceIds.includes(id));

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={COLORS.accent} />
      </View>
    );
  }

  if (isError || !service) {
    return (
      <View style={styles.centered}>
        <Text style={styles.error}>No se pudo cargar el servicio</Text>
        <Pressable onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backText}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const formatPrice = (p: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p);

  const categoryColor = COLORS.category[service.category];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: service.imageUri }} style={styles.heroImage} />

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
          <View style={styles.includesGrid}>
            {service.includes.map((inc, i) => (
              <View key={i} style={styles.includeItem}>
                <Text style={styles.includeDot}>•</Text>
                <Text style={styles.includeText}>{inc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable
            style={[styles.favBtn, isFav && styles.favBtnActive]}
            onPress={() => toggleFavorite(service)}
          >
            <Text style={[styles.favText, isFav && styles.favTextActive]}>
              {isFav ? '❤️ En Favoritos' : '🤍 Agregar a Favoritos'}
            </Text>
          </Pressable>

          <Pressable
            style={[styles.bookBtn, { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }]}
            onPress={() => (navigation as any).navigate('EditService', { id: service.id, name: service.name })}
          >
            <Text style={[styles.bookText, { color: COLORS.textPrimary }]}>✏️ Editar Servicio (Semana 06)</Text>
          </Pressable>

          <Pressable style={styles.bookBtn} onPress={() => alert(`¡Servicio ${service.name} agendado! Próximamente formulario real.`)}>
            <Text style={styles.bookText}>📅 Agendar Servicio</Text>
          </Pressable>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>💡 Información CleanPro</Text>
          <Text style={styles.infoText}>• Personal verificado y con EPS{'\n'}• Insumos biodegradables incluidos{'\n'}• Garantía de satisfacción{'\n'}• Factura electrónica</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { paddingBottom: SPACING.xxl },
  centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', padding: SPACING.lg },
  error: { color: COLORS.error, fontSize: 16 },
  backBtn: { marginTop: SPACING.md, backgroundColor: COLORS.surface, padding: SPACING.md, borderRadius: RADIUS.md },
  backText: { color: COLORS.textPrimary },
  heroImage: { width: '100%', height: 240, backgroundColor: COLORS.card },
  body: { padding: SPACING.lg, gap: SPACING.md },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: RADIUS.full },
  badgeText: { fontSize: 11, fontWeight: '700', textTransform: 'capitalize' },
  rating: { fontSize: 13, color: COLORS.textSecondary },
  title: { fontSize: 26, fontWeight: '700', color: COLORS.textPrimary, lineHeight: 32 },
  price: { fontSize: 24, fontWeight: '700', color: COLORS.accent },
  desc: { fontSize: 15, color: COLORS.textSecondary, lineHeight: 22 },
  section: { marginTop: SPACING.sm, gap: SPACING.sm },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  includesGrid: { gap: SPACING.sm },
  includeItem: { flexDirection: 'row', gap: SPACING.sm, alignItems: 'center' },
  includeDot: { color: COLORS.accent, fontWeight: '700' },
  includeText: { color: COLORS.textSecondary, fontSize: 14 },
  actions: { gap: SPACING.md, marginTop: SPACING.md },
  favBtn: { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center' },
  favBtnActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  favText: { color: COLORS.textSecondary, fontWeight: '600' },
  favTextActive: { color: COLORS.accent },
  bookBtn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center' },
  bookText: { color: '#000', fontWeight: '700', fontSize: 16 },
  infoBox: { backgroundColor: COLORS.card, borderRadius: RADIUS.lg, padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.sm, marginTop: SPACING.md },
  infoTitle: { fontWeight: '700', color: COLORS.textPrimary },
  infoText: { color: COLORS.textSecondary, fontSize: 13, lineHeight: 18 },
});
