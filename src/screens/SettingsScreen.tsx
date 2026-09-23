import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Switch, Pressable, ScrollView, Alert } from 'react-native';
import { usePreferences } from '../hooks/usePreferences';
import { useThemeColors } from '../hooks/useThemeColors';
import { useClearCache } from '../hooks/useOfflineCache';
import { SPACING, RADIUS, ThemeColors } from '../theme';
import { useFavoritesStore } from '../stores/favoritesStore';

// Semana 07 - Ajustes con preferencias persistidas y tema dinámico (sin auth aún)
export function SettingsScreen(): React.JSX.Element {
  const COLORS = useThemeColors();
  const { preferences, setPreference, resetPreferences, isLoading } = usePreferences();
  const { clearCache } = useClearCache();
  const clearFavorites = useFavoritesStore((s) => s.clearFavorites);
  const favCount = useFavoritesStore((s) => s.favoriteServiceIds.length);

  const styles = useMemo(() => makeStyles(COLORS), [COLORS]);

  const handleClearCache = () => {
    Alert.alert('Borrar caché', '¿Borrar caché offline de servicios?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Borrar', style: 'destructive', onPress: async () => { await clearCache(); Alert.alert('Caché borrado'); } },
    ]);
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: COLORS.textSecondary }}>Cargando preferencias...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Ajustes CleanPro</Text>
      <Text style={styles.subtitle}>Semana 07 - Persistencia Local + Tema dinámico dark/light</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Apariencia</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Tema</Text>
          <View style={styles.chipRow}>
            {(['dark', 'light'] as const).map((t) => (
              <Pressable key={t} style={[styles.chip, preferences.theme === t && styles.chipActive]} onPress={() => setPreference('theme', t)}>
                <Text style={[styles.chipText, preferences.theme === t && styles.chipTextActive]}>{t === 'dark' ? '🌙 Oscuro' : '☀️ Claro'}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Vista servicios</Text>
          <View style={styles.chipRow}>
            {(['list', 'grid'] as const).map((v) => (
              <Pressable key={v} style={[styles.chip, preferences.listView === v && styles.chipActive]} onPress={() => setPreference('listView', v)}>
                <Text style={[styles.chipText, preferences.listView === v && styles.chipTextActive]}>{v === 'list' ? '☰ Lista' : '▦ Grid'}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Ordenar por</Text>
          <View style={styles.chipRow}>
            {(['name', 'price', 'rating'] as const).map((s) => (
              <Pressable key={s} style={[styles.chip, preferences.sortBy === s && styles.chipActive]} onPress={() => setPreference('sortBy', s)}>
                <Text style={[styles.chipText, preferences.sortBy === s && styles.chipTextActive]}>{s}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔔 Notificaciones</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Notificaciones push</Text>
          <Switch value={preferences.notificationsEnabled} onValueChange={(v) => setPreference('notificationsEnabled', v)} trackColor={{ false: COLORS.border, true: COLORS.accentDim }} thumbColor={preferences.notificationsEnabled ? COLORS.accent : COLORS.textMuted} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>💾 Almacenamiento</Text>
        <Text style={styles.infoText}>Favoritos guardados: {favCount} (AsyncStorage + Zustand persist)</Text>
        <Text style={styles.infoText}>Preferencias: AsyncStorage con fallback MMKV para Expo Go</Text>
        <Pressable style={styles.btn} onPress={handleClearCache}>
          <Text style={styles.btnText}>🗑️ Borrar caché offline</Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }]} onPress={() => clearFavorites()}>
          <Text style={[styles.btnText, { color: COLORS.textPrimary }]}>❤️ Borrar favoritos ({favCount})</Text>
        </Pressable>
        <Pressable style={[styles.btn, { backgroundColor: COLORS.error + '20', borderWidth: 1, borderColor: COLORS.error }]} onPress={() => resetPreferences()}>
          <Text style={[styles.btnText, { color: COLORS.error }]}>Resetear preferencias</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

function makeStyles(COLORS: ThemeColors) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: 100 },
    centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
    title: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
    subtitle: { fontSize: 11, color: COLORS.accent, marginTop: -8 },
    section: { backgroundColor: COLORS.surface, borderRadius: RADIUS.lg, padding: SPACING.base, borderWidth: 1, borderColor: COLORS.border, gap: SPACING.md },
    sectionTitle: { fontSize: 14, fontWeight: '700', color: COLORS.textPrimary },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    rowLabel: { fontSize: 14, color: COLORS.textSecondary, flex: 1 },
    chipRow: { flexDirection: 'row', gap: SPACING.sm },
    chip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full, backgroundColor: COLORS.card, borderWidth: 1, borderColor: COLORS.border },
    chipActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
    chipText: { fontSize: 12, color: COLORS.textSecondary, textTransform: 'capitalize' },
    chipTextActive: { color: COLORS.accent, fontWeight: '700' },
    btn: { backgroundColor: COLORS.accent, padding: SPACING.md, borderRadius: RADIUS.md, alignItems: 'center', marginTop: SPACING.sm },
    btnText: { color: '#000', fontWeight: '700', fontSize: 13 },
    infoText: { fontSize: 11, color: COLORS.textMuted, lineHeight: 16 },
  });
}
