import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ServicesListScreen } from './src/screens/ServicesListScreen';
import { COLORS } from './src/theme';

// Semana 02 - FlatList + búsqueda en tiempo real + tema global
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ServicesListScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
});
