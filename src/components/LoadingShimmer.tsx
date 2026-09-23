import React, { useMemo } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { SPACING, RADIUS, ThemeColors } from '../theme';
import { useThemeColors } from '../hooks/useThemeColors';
import { useShimmer } from '../hooks/useAnimations';

export function LoadingShimmer(): React.JSX.Element {
  const COLORS = useThemeColors();
  const { translateX, opacity } = useShimmer();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);

  return (
    <View style={styles.container}>
      {[1, 2, 3].map((i) => (
        <View key={i} style={styles.card}>
          <View style={styles.imagePlaceholder} />
          <View style={styles.body}>
            <View style={styles.line} />
            <View style={[styles.line, { width: '60%' }]} />
            <View style={[styles.line, { width: '40%', height: 12 }]} />
          </View>
          <Animated.View style={[styles.shimmer, { transform: [{ translateX }], opacity }]} />
        </View>
      ))}
    </View>
  );
}

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    container: { padding: SPACING.base, gap: SPACING.md },
    card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, overflow: 'hidden', borderWidth: 1, borderColor: COLORS.border, height: 200 },
    imagePlaceholder: { height: 100, backgroundColor: COLORS.card },
    body: { padding: SPACING.base, gap: SPACING.sm },
    line: { height: 14, backgroundColor: COLORS.card, borderRadius: RADIUS.sm },
    shimmer: { position: 'absolute', top: 0, left: 0, width: 100, height: '100%', backgroundColor: COLORS.accent + '20' },
  });
}
