import React from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useClients } from '../hooks/useServices';
import { ClientCard } from '../components/ClientCard';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

export function ClientsScreen(): React.JSX.Element {
  const { data, isLoading } = useClients();

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.accent} size="large" />
        <Text style={styles.loading}>Cargando clientes...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <ClientCard client={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>{data?.length} clientes • CleanPro</Text>}
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
