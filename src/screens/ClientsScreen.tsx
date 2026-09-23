import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { ClientCard } from '../components/ClientCard';
import { MOCK_CLIENTS } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

// Semana 03 - tab Clientes con datos mock
export function ClientsScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_CLIENTS}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <ClientCard client={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>{MOCK_CLIENTS.length} clientes • CleanPro</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.base },
  header: { ...TYPOGRAPHY.label, marginBottom: SPACING.md, textTransform: 'uppercase' },
});
