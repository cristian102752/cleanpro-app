import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Client } from '../types';
import { COLORS, TYPOGRAPHY, SPACING, RADIUS } from '../theme';

export function ClientCard({ client }: { client: Client }): React.JSX.Element {
  return (
    <View style={styles.card}>
      <Image source={{ uri: client.imageUri }} style={styles.avatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{client.name}</Text>
        {client.companyName && <Text style={styles.company}>{client.companyName}</Text>}
        <Text style={styles.address} numberOfLines={1}>{client.address}</Text>
        <View style={styles.footer}>
          <Text style={[styles.typeBadge, client.type === 'empresarial' ? styles.emp : styles.res]}>{client.type}</Text>
          <Text style={styles.services}>{client.totalServices} servicios</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border, marginBottom: SPACING.sm, gap: SPACING.md, alignItems: 'center' },
  avatar: { width: 56, height: 56, borderRadius: 28, backgroundColor: COLORS.card },
  info: { flex: 1, gap: 3 },
  name: { fontSize: TYPOGRAPHY.size.md, fontWeight: TYPOGRAPHY.weight.bold, color: COLORS.textPrimary },
  company: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.accent },
  address: { fontSize: TYPOGRAPHY.size.sm, color: COLORS.textSecondary },
  footer: { flexDirection: 'row', gap: SPACING.sm, marginTop: 4, alignItems: 'center' },
  typeBadge: { fontSize: TYPOGRAPHY.size.xs, fontWeight: TYPOGRAPHY.weight.bold, paddingHorizontal: 8, paddingVertical: 2, borderRadius: RADIUS.full, textTransform: 'capitalize' },
  emp: { backgroundColor: '#a78bfa33', color: '#a78bfa' },
  res: { backgroundColor: '#22d3ee33', color: '#22d3ee' },
  services: { fontSize: TYPOGRAPHY.size.xs, color: COLORS.textMuted },
});
