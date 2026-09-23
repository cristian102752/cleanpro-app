import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useStaff } from '../hooks/useServices';
import { StaffCard } from '../components/StaffCard';
import { TYPOGRAPHY, SPACING, ThemeColors } from '../theme';
import { useThemeColors } from '../hooks/useThemeColors';

export function StaffScreen(): React.JSX.Element {
  const COLORS = useThemeColors();
  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);
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

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', gap: SPACING.md },
    loading: { color: COLORS.textSecondary },
    list: { padding: SPACING.base },
    header: { fontSize: TYPOGRAPHY.label.fontSize, fontWeight: TYPOGRAPHY.label.fontWeight, color: COLORS.textSecondary, marginBottom: SPACING.md, textTransform: 'uppercase' },
  });
}
