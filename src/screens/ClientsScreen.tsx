import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useClients } from '../hooks/useServices';
import { ClientCard } from '../components/ClientCard';
import { TYPOGRAPHY, SPACING, ThemeColors } from '../theme';
import { useThemeColors } from '../hooks/useThemeColors';

export function ClientsScreen(): React.JSX.Element {
  const COLORS = useThemeColors();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
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

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
    loading: { color: COLORS.textSecondary },
    list: { padding: SPACING.base },
    header: { fontSize: TYPOGRAPHY.label.fontSize, fontWeight: TYPOGRAPHY.label.fontWeight, color: COLORS.textSecondary, marginBottom: SPACING.md, textTransform: 'uppercase' },
  });
}
