import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

// Semana 03 - placeholder (los favoritos llegan en semana 04)
export function FavoritesScreen(): React.JSX.Element {
  return (
    <View style={styles.empty}>
      <Text style={styles.icon}>🤍</Text>
      <Text style={styles.title}>Sin favoritos aún</Text>
      <Text style={styles.sub}>Llegará en la semana 04 con Zustand</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  icon: { fontSize: 48 },
  title: { ...TYPOGRAPHY.h2 },
  sub: { ...TYPOGRAPHY.caption },
});
