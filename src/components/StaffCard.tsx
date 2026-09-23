import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Staff } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

export function StaffCard({ staff }: { staff: Staff }): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image source={{ uri: staff.avatarUri }} style={styles.avatar} />
      <View style={styles.info}>
        <View style={styles.row}>
          <Text style={styles.name}>{staff.name}</Text>
          <View style={[styles.dot, { backgroundColor: staff.available ? COLORS.success : COLORS.error }]} />
        </View>
        <Text style={styles.role}>{staff.role} • ⭐ {staff.rating}</Text>
        <Text style={styles.meta}>{staff.completedServices} servicios completados</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.sm, gap: SPACING.md },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  info: { flex: 1, gap: 2 },
  row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  name: { fontSize: TYPOGRAPHY.size.md, fontWeight: TYPOGRAPHY.weight.bold, color: COLORS.textPrimary },
  dot: { width: 8, height: 8, borderRadius: 4 },
  role: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.accent, textTransform: 'capitalize' },
  meta: { fontSize: TYPOGRAPHY.size.xs, color: COLORS.textMuted },
});
