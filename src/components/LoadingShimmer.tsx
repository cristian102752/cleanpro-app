import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { useShimmer } from '../hooks/useAnimations';

export function LoadingShimmer() {
  const { translateX, opacity } = useShimmer();
  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.card}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.body}>
            <View style={styles.line} />
            <View style={[styles.line, { width: '60%' }]} />
          </View>
          <Animated.View style={[styles.shimmer, { transform: [{ translateX }], opacity }]} />
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: { padding: SPACING.base, gap: SPACING.md },
  card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, height: 180 },
  imagePlaceholder: { height: 100, backgroundColor: COLORS.card },
  body: { padding: SPACING.base, gap: SPACING.sm },
  line: { height: 14, backgroundColor: COLORS.card, borderRadius: RADIUS.sm },
  shimmer: { position: 'absolute', top: 0, left: 0, width: 100, height: '100%', backgroundColor: COLORS.accent + '20' },
});