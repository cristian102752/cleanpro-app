import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';
import { Service } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

// Semana 01 - Core Components + Flexbox
interface Props {
  service: Service;
  onPress: (service: Service) => void;
}

export function ServiceCard({ service, onPress }: Props): React.JSX.Element {
  const categoryColor = COLORS.category[service.category] || COLORS.accent;
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(price);

  return (
    <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]} onPress={() => onPress(service)}>
      <Image source={{ uri: service.imageUri }} style={styles.image} />
      <View style={styles.body}>
        <View style={styles.topRow}>
          <View style={[styles.badge, { backgroundColor: `${categoryColor}33` }]}>
            <Text style={[styles.badgeText, { color: categoryColor }]}>{service.category}</Text>
          </View>
          <Text style={styles.rating}>⭐ {service.rating.toFixed(1)}</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>{service.name}</Text>
        <Text style={styles.description} numberOfLines={2}>{service.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(service.price)}</Text>
          <Text style={styles.duration}>⏱ {Math.floor(service.durationMinutes / 60)}h</Text>
        </View>
        <View style={styles.includesRow}>
          {service.includes.slice(0, 3).map((inc, idx) => (
            <View key={idx} style={styles.includeChip}>
              <Text style={styles.includeText}>{inc}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.md },
  cardPressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  image: { width: '100%', height: 160, backgroundColor: COLORS.card },
  body: { padding: SPACING.base, gap: SPACING.sm },
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  badge: { paddingHorizontal: SPACING.sm, paddingVertical: 4, borderRadius: RADIUS.full },
  badgeText: { fontSize: TYPOGRAPHY.size.xs, fontWeight: TYPOGRAPHY.weight.bold, textTransform: 'capitalize' },
  rating: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary },
  name: { fontSize: TYPOGRAPHY.size.lg, fontWeight: TYPOGRAPHY.weight.bold, color: COLORS.textPrimary, lineHeight: 24 },
  description: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary, lineHeight: 18 },
  footer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { fontSize: TYPOGRAPHY.size.lg, fontWeight: TYPOGRAPHY.weight.bold, color: COLORS.accent },
  duration: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textMuted },
  includesRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  includeChip: { backgroundColor: COLORS.card, paddingHorizontal: SPACING.sm, paddingVertical: 3, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.borderLight },
  includeText: { fontSize: TYPOGRAPHY.size.xs, color: COLORS.textSecondary },
});
