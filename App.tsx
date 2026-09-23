import React from 'react';
import { SafeAreaView, ScrollView, Text, StyleSheet, Alert } from 'react-native';
import { ServiceCard } from './src/components/ServiceCard';
import { MOCK_SERVICES } from './src/data/mockData';
import { COLORS, SPACING } from './src/theme';

// Semana 01 - Core Components y Flexbox
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.title}>🧹 CleanPro</Text>
        <Text style={styles.sub}>Semana 01 - Core Components y Flexbox</Text>
        {MOCK_SERVICES.map((sv) => (
          <ServiceCard key={sv.id} service={sv} onPress={(s) => Alert.alert(s.name)} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  list: { padding: SPACING.base },
  title: { fontSize: 28, fontWeight: '700', color: COLORS.accent, textAlign: 'center' },
  sub: { fontSize: 12, color: COLORS.textSecondary, textAlign: 'center', marginBottom: SPACING.lg },
});
