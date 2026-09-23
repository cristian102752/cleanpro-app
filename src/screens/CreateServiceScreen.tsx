import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useCreateService } from '../hooks/useServices';
import { serviceSchema, ServiceFormData } from '../schemas/serviceSchema';
import { FormField, CategoryField } from '../components/FormField';
import { COLORS, SPACING, RADIUS } from '../theme';

// Semana 06 - crear servicio con RHF + Zod
export function CreateServiceScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const { mutate, isPending } = useCreateService();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: '', description: '', price: 0 as any, durationMinutes: 120 as any, category: 'residencial', includes: '' },
  });

  const onSubmit = (data: ServiceFormData) => {
    mutate(
      { name: data.name, description: data.description, price: Number(data.price), durationMinutes: Number(data.durationMinutes), category: data.category as any },
      {
        onSuccess: (n) => {
          Alert.alert('¡Creado!', `Servicio ${n.name} creado correctamente`);
          navigation.goBack();
        },
        onError: (e) => Alert.alert('Error', e.message),
      }
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Nuevo Servicio de Limpieza</Text>
      <Text style={styles.subtitle}>Semana 06 - RHF + Zod + FormField reutilizable</Text>

      <FormField name="name" control={control} label="Nombre del servicio *" placeholder="Ej: Limpieza de Oficinas Premium" error={errors.name} hint="Mín 3, máx 80 caracteres" />
      <FormField name="description" control={control} label="Descripción *" placeholder="Describe qué incluye el servicio..." multiline numberOfLines={4} error={errors.description} />
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <FormField name="price" control={control} label="Precio COP *" placeholder="120000" keyboardType="numeric" error={errors.price} />
        </View>
        <View style={{ flex: 1 }}>
          <FormField name="durationMinutes" control={control} label="Duración min *" placeholder="180" keyboardType="numeric" error={errors.durationMinutes} />
        </View>
      </View>
      <CategoryField name="category" control={control} label="Categoría *" options={['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion']} error={errors.category} />
      <FormField name="includes" control={control} label="Incluye (separado con comas)" placeholder="Baños, Cocina, Sala" error={errors.includes as any} />

      <Pressable style={[styles.btn, (isPending || isSubmitting) && styles.btnDisabled]} onPress={handleSubmit(onSubmit)} disabled={isPending || isSubmitting}>
        {isPending || isSubmitting ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Crear Servicio (POST) - {isDirty ? 'Modificado' : 'Sin cambios'}</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.sm, paddingBottom: 100 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  subtitle: { fontSize: 12, color: COLORS.accent, marginTop: -4, marginBottom: 8 },
  row: { flexDirection: 'row', gap: SPACING.md },
  btn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.md },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#000', fontWeight: '700', fontSize: 15 },
});
