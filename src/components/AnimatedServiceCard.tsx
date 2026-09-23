import React, { useMemo } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Animated } from 'react-native';
import { Service } from '../types';
import { SPACING, RADIUS, ThemeColors } from '../theme';
import { useThemeColors } from '../hooks/useThemeColors';
import { useFadeIn, useScaleOnPress } from '../hooks/useAnimations';

interface Props {
  service: Service;
  onPress: (s: Service) => void;
  index?: number;
  grid?: boolean; // FIX Semana 07 - vista grid
}

export function AnimatedServiceCard({ service, onPress, index = 0, grid = false }: Props): React.JSX.Element {
  const COLORS = useThemeColors();
  const { opacity, translateY } = useFadeIn(400, index * 80);
  const { scale, onPressIn, onPressOut } = useScaleOnPress();

  const styles = useMemo(() => makeStyles(COLORS, grid), [COLORS, grid]);

  const categoryColor = COLORS.category[service.category] || COLORS.accent;
  const formatPrice = (p: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p);

  return (
    <Animated.View style={[styles.wrapper, { opacity, transform: [{ translateY }, { scale }] }]}>
      <Pressable
        style={({ pressed }) => [styles.card, pressed && { opacity: 0.9 }]}
        onPress={() => onPress(service)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
      >
        <Image source={{ uri: service.imageUri }} style={styles.image} />
        <View style={styles.body}>
          <View style={styles.topRow}>
            <View style={[styles.badge, { backgroundColor: `${categoryColor}33` }]}>
              <Text style={[styles.badgeText, { color: categoryColor }]}>{service.category}</Text>
            </View>
            {!grid && <Text style={styles.rating}>⭐ {service.rating}</Text>}
          </View>
          <Text style={styles.name} numberOfLines={grid ? 2 : 3}>{service.name}</Text>
          <Text style={styles.price}>{formatPrice(service.price)}</Text>
        </View>
      </Pressable>
    </Animated.View>
  );
}

function makeStyles(COLORS: ThemeColors, grid: boolean) {
  return StyleSheet.create({
    wrapper: grid
      ? { flex: 1, marginHorizontal: SPACING.xs, marginBottom: SPACING.md }
      : { marginBottom: SPACING.md },
    card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border },
    image: { width: '100%', height: grid ? 100 : 140, backgroundColor: COLORS.card },
    body: { padding: grid ? SPACING.sm : SPACING.base, gap: SPACING.xs },
    topRow: { flexDirection: 'row', justifyContent: 'space-between' },
    badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.full },
    badgeText: { fontSize: 10, fontWeight: '700', textTransform: 'capitalize' },
    rating: { fontSize: 12, color: COLORS.textSecondary },
    name: { fontSize: grid ? 13 : 16, fontWeight: '700', color: COLORS.textPrimary },
    price: { fontSize: grid ? 12 : 14, fontWeight: '700', color: COLORS.accent },
  });
}
