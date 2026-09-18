import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useCreateService } from '../hooks/useServices';
import { COLORS, SPACING, RADIUS, TYPOGRAPHY } from '../theme';
import { useNavigation } from '@react-navigation/native';

export function CreateServiceScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('residencial');
  const [duration, setDuration] = useState('');

  const { mutate, isPending } = useCreateService();

  const handleCreate = () => {
    if (!name || !description || !price) {
      Alert.alert('Faltan datos', 'Completa nombre, descripción y precio');
      return;
    }

    mutate(
      {
        name,
        description,
        price: parseInt(price) || 0,
        category: category as any,
        durationMinutes: parseInt(duration) || 120,
      },
      {
        onSuccess: (newService) => {
          Alert.alert('¡Creado!', `Servicio ${newService.name} creado correctamente (simulado)`);
          navigation.goBack();
        },
        onError: (e) => {
          Alert.alert('Error', e.message);
        },
      }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Nuevo Servicio de Limpieza</Text>
      <Text style={styles.subtitle}>Semana 05 - useMutation + invalidateQueries</Text>

      <View style={styles.field}>
        <Text style={styles.label}>Nombre del servicio *</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Limpieza de Oficinas Premium"
          placeholderTextColor={COLORS.textMuted}
          value={name}
          onChangeText={setName}
        />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Descripción *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe qué incluye el servicio..."
          placeholderTextColor={COLORS.textMuted}
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Precio COP *</Text>
          <TextInput
            style={styles.input}
            placeholder="120000"
            placeholderTextColor={COLORS.textMuted}
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Duración min</Text>
          <TextInput
            style={styles.input}
            placeholder="180"
            placeholderTextColor={COLORS.textMuted}
            value={duration}
            onChangeText={setDuration}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Categoría</Text>
        <View style={styles.catRow}>
          {['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion'].map((c) => (
            <Pressable
              key={c}
              style={[styles.catChip, category === c && styles.catActive]}
              onPress={() => setCategory(c)}
            >
              <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <Pressable style={[styles.btn, isPending && styles.btnDisabled]} onPress={handleCreate} disabled={isPending}>
        {isPending ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Crear Servicio (POST)</Text>}
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.infoText}>
          💡 Este formulario usa useMutation de TanStack Query. Al crear, hace invalidateQueries(['services']) y la lista se refresca automáticamente.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: 100 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  subtitle: { fontSize: 12, color: COLORS.accent, marginTop: -8 },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: COLORS.textSecondary },
  input: {
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    color: COLORS.textPrimary,
    fontSize: 15,
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  row: { flexDirection: 'row', gap: SPACING.md },
  catRow: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  catChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: RADIUS.full, backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border },
  catActive: { backgroundColor: COLORS.accentDim, borderColor: COLORS.accent },
  catText: { fontSize: 12, color: COLORS.textSecondary, textTransform: 'capitalize' },
  catTextActive: { color: COLORS.accent, fontWeight: '700' },
  btn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.md },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  info: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border, marginTop: SPACING.md },
  infoText: { fontSize: 12, color: COLORS.textMuted, lineHeight: 16 },
});
