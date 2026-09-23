import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Staff } from '../types';
import { TYPOGRAPHY, SPACING, RADIUS, ThemeColors } from '../theme';
import { useThemeColors } from '../hooks/useThemeColors';

export function StaffCard({ staff }: { staff: Staff }): React.JSX.Element {
  const COLORS = useThemeColors();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);

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
        <View style={styles.specialties}>
          {staff.specialties.map((s) => (
            <View key={s} style={styles.chip}>
              <Text style={styles.chipText}>{s}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    card: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.sm, gap: SPACING.md },
    avatar: { width: 56, height: 56, borderRadius: 28 },
    info: { flex: 1, gap: 2 },
    row: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
    name: { fontSize: TYPOGRAPHY.size.md, fontWeight: TYPOGRAPHY.weight.bold, color: COLORS.textPrimary },
    dot: { width: 8, height: 8, borderRadius: 4 },
    role: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.accent, textTransform: 'capitalize' },
    meta: { fontSize: TYPOGRAPHY.size.xs, color: COLORS.textMuted },
    specialties: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 4 },
    chip: { backgroundColor: COLORS.card, paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.full, borderWidth: 1, borderColor: COLORS.borderLight },
    chipText: { fontSize: 10, color: COLORS.textSecondary, textTransform: 'capitalize' },
  });
}
