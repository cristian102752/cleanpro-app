import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable } from 'react-native';
import { ScheduleCard } from '../components/ScheduleCard';
import { MOCK_SCHEDULES } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

// Semana 03 - tab Agenda con filtros por estado
export function AgendaScreen(): React.JSX.Element {
  const [filter, setFilter] = useState<string>('todos');
  const filtered = filter === 'todos' ? MOCK_SCHEDULES : MOCK_SCHEDULES.filter((s) => s.status === filter);

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
  filters: { flexDirection: 'row', padding: SPACING.base, gap: SPACING.sm, flexWrap: 'wrap' },
  chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  chipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  chipText: { fontSize: 12, color: COLORS.textSecondary, textTransform: 'capitalize' },
  chipTextActive: { color: COLORS.accent, fontWeight: '700' },
  list: { padding: SPACING.base, paddingTop: 0 },
  header: { ...TYPOGRAPHY.label, marginBottom: SPACING.md, textTransform: 'uppercase' },
});
