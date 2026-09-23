import React from 'react';
import { View, Text, Image, Pressable, StyleSheet, Animated } from 'react-native';
import { Service } from '../types';
import { COLORS, SPACING, RADIUS } from '../theme';
import { useFadeIn, useScaleOnPress } from '../hooks/useAnimations';

interface Props { service: Service; onPress: (s: Service) => void; index?: number; }

export function AnimatedServiceCard({ service, onPress, index = 0 }: Props) {
  const { opacity, translateY } = useFadeIn(400, index * 80);
  const { scale, onPressIn, onPressOut } = useScaleOnPress();
  const categoryColor = COLORS.category[service.category] || COLORS.accent;
  const formatPrice = (p: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p);
  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }, { scale }] }]}>
      <Pressable style={styles.card} onPress={() => onPress(service)} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Image source={{ uri: service.imageUri }} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.topRow}>
            <View style={[styles.badge, { backgroundColor: `${categoryColor}33` }]}><Text style={[styles.badgeText, { color: categoryColor }]}>{service.category}</Text></View>
            <Text style={styles.rating}>⭐ {service.rating}</Text>
          </View>
          <Text style={styles.name}>{service.name}</Text>
          <Text style={styles.price}>{formatPrice(service.price)}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  wrapper: { marginBottom: SPACING.md },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
  image: { width: '100%', height: 140, backgroundColor: COLORS.card },
  body: { padding: SPACING.base, gap: SPACING.sm },
  topRow: { flexDirection: 'row', justifyContent: 'space-between' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.full },
  badgeText: { fontSize: 10, fontWeight: '700', textTransform: 'capitalize' },
  rating: { fontSize: 12, color: COLORS.textSecondary },
  name: { fontSize: 16, fontWeight: '700', color: COLORS.textPrimary },
  price: { fontSize: 14, fontWeight: '700', color: COLORS.accent },
});