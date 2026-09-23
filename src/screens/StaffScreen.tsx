import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useStaff } from '../hooks/useServices';
import { StaffCard } from '../components/StaffCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

// Semana 05 - Personal con useQuery
export function StaffScreen(): React.JSX.Element {
  const { data, isLoading } = useStaff();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.accent} size="large" />
        <Text style={styles.loading}>Cargando personal...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => <StaffCard staff={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>{data?.length} colaboradores • CleanPro</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
  loading: { color: COLORS.textSecondary },
  list: { padding: SPACING.base },
  header: { ...TYPOGRAPHY.label, marginBottom: SPACING.md, textTransform: 'uppercase' },
});
