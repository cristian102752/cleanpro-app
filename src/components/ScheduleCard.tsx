import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Schedule } from '../types';
import { TYPOGRAPHY, SPACING, RADIUS, ThemeColors } from '../theme';
import { useThemeColors } from '../hooks/useThemeColors';

const statusColors: Record<Schedule['status'], { bg: string; color: string; label: string }> = {
  pendiente: { bg: '#fbbf2433', color: '#b45309', label: 'Pendiente' },
  en_curso: { bg: '#60a5fa33', color: '#2563eb', label: 'En curso' },
  completado: { bg: '#34d39933', color: '#059669', label: 'Completado' },
  cancelado: { bg: '#f8514933', color: '#dc2626', label: 'Cancelado' },
};

export function ScheduleCard({ schedule }: { schedule: Schedule }): React.JSX.Element {
  const COLORS = useThemeColors();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
  const st = statusColors[schedule.status];
  const formatPrice = (p: number) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', maximumFractionDigits: 0 }).format(p);

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.serviceName} numberOfLines={1}>{schedule.serviceName}</Text>
        <View style={[styles.statusBadge, { backgroundColor: st.bg }]}>
          <Text style={[styles.statusText, { color: st.color }]}>{st.label}</Text>
        </View>
      </View>

      <Text style={styles.clientName}>👤 {schedule.clientName}</Text>
      {schedule.staffName && <Text style={styles.staffName}>🧹 {schedule.staffName}</Text>}

      <View style={styles.row}>
        <Text style={styles.date}>📅 {schedule.date} • {schedule.time}</Text>
        <Text style={styles.price}>{formatPrice(schedule.price)}</Text>
      </View>

      <Text style={styles.address} numberOfLines={1}>📍 {schedule.address}</Text>
      {schedule.notes && <Text style={styles.notes}>📝 {schedule.notes}</Text>}
    </View>
  );
}

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    card: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.sm, gap: 6 },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    serviceName: { flex: 1, fontSize: TYPOGRAPHY.size.md, fontWeight: TYPOGRAPHY.weight.bold, color: COLORS.textPrimary, marginRight: SPACING.sm },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: RADIUS.full },
    statusText: { fontSize: TYPOGRAPHY.size.xs, fontWeight: TYPOGRAPHY.weight.bold },
    clientName: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textPrimary },
    staffName: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 },
    date: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary },
    price: { fontSize: TYPOGRAPHY.size.md, fontWeight: TYPOGRAPHY.weight.bold, color: COLORS.accent },
    address: { fontSize: TYPOGRAPHY.size.xs, color: COLORS.textMuted },
    notes: { fontSize: TYPOGRAPHY.size.xs, color: COLORS.warning, fontStyle: 'italic', marginTop: 2 },
  });
}
