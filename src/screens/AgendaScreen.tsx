import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useSchedules } from '../hooks/useServices';
import { ScheduleCard } from '../components/ScheduleCard';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

// Semana 05 - Agenda con useQuery + filtros
export function AgendaScreen(): React.JSX.Element {
  const { data, isLoading } = useSchedules();
  const [filter, setFilter] = useState<string>('todos');
  const filtered = !data ? [] : filter === 'todos' ? data : data.filter((s) => s.status === filter);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.accent} size="large" />
        <Text style={styles.loading}>Cargando agenda...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.filters}>
        {['todos', 'pendiente', 'en_curso', 'completado'].map((f) => (
          <Pressable key={f} style={[styles.chip, filter === f && styles.chipActive]} onPress={() => setFilter(f)}>
            <Text style={[styles.chipText, filter === f && styles.chipTextActive]}>{f.replace('_', ' ')}</Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={filtered}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => <ScheduleCard schedule={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>{filtered.length} agendamientos</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  loading: { color: COLORS.textSecondary },
  filters: { flexDirection: 'row', padding: SPACING.base, gap: SPACING.sm, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  chipText: { fontSize: 12, color: COLORS.textSecondary, textTransform: 'capitalize' },
  chipTextActive: { color: COLORS.accent, fontWeight: '700' },
  list: { padding: SPACING.base, paddingTop: 0 },
  header: { ...TYPOGRAPHY.label, marginBottom: SPACING.md, textTransform: 'uppercase' },
});
