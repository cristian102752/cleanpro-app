import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StaffCard } from '../components/StaffCard';
import { MOCK_STAFF } from '../data/mockData';
import { COLORS, TYPOGRAPHY, SPACING } from '../theme';

// Semana 03 - tab Personal con datos mock
export function StaffScreen(): React.JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        data={MOCK_STAFF}
        keyExtractor={(s) => s.id}
        renderItem={({ item }) => <StaffCard staff={item} />}
        contentContainerStyle={styles.list}
        ListHeaderComponent={<Text style={styles.header}>{MOCK_STAFF.length} colaboradores • CleanPro</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.base },
  header: { ...TYPOGRAPHY.label, marginBottom: SPACING.md, textTransform: 'uppercase' },
});
