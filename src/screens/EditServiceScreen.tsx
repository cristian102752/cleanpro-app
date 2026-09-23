import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ServicesStackParamList } from '../navigation/types';
import { useServiceById, useUpdateService } from '../hooks/useServices';
import { serviceSchema, ServiceFormData } from '../schemas/serviceSchema';
import { FormField, CategoryField } from '../components/FormField';
import { COLORS, SPACING, RADIUS } from '../theme';

type EditRoute = RouteProp<ServicesStackParamList, 'EditService'>;

// Semana 06 - editar con defaultValues + reset() desde la API
export function EditServiceScreen(): React.JSX.Element {
  const route = useRoute<EditRoute>();
  const navigation = useNavigation();
  const { id } = route.params;
  const { data: service, isLoading } = useServiceById(id);
  const { mutate, isPending } = useUpdateService();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: '', description: '', price: 0 as any, durationMinutes: 120 as any, category: 'residencial', includes: '' },
  });

  useEffect(() => {
    if (service) {
      reset({
        name: service.name,
        description: service.description,
        price: service.price as any,
        durationMinutes: service.durationMinutes as any,
        category: service.category as any,
        includes: service.includes.join(', ') as any,
      });
    }
  }, [service, reset]);

  const onSubmit = (data: ServiceFormData) => {
    mutate(
      { id, data: { name: data.name, description: data.description, price: Number(data.price), durationMinutes: Number(data.durationMinutes), category: data.category as any } },
      {
        onSuccess: (u) => {
          Alert.alert('¡Actualizado!', `${u.name} actualizado`);
          navigation.goBack();
        },
        onError: (e) => Alert.alert('Error', e.message),
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator color={COLORS.accent} size="large" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Editar Servicio</Text>
      <Text style={styles.subtitle}>ID: {id} - defaultValues + reset() desde API</Text>

      <FormField name="name" control={control} label="Nombre *" error={errors.name} />
      <FormField name="description" control={control} label="Descripción *" multiline error={errors.description} />
      <View style={styles.row}>
        <View style={{ flex: 1 }}>
          <FormField name="price" control={control} label="Precio COP *" keyboardType="numeric" error={errors.price} />
        </View>
        <View style={{ flex: 1 }}>
          <FormField name="durationMinutes" control={control} label="Duración min *" keyboardType="numeric" error={errors.durationMinutes} />
        </View>
      </View>
      <CategoryField name="category" control={control} label="Categoría *" options={['residencial', 'oficina', 'vidrios', 'postObra', 'industrial', 'desinfeccion']} error={errors.category} />
      <FormField name="includes" control={control} label="Incluye" error={errors.includes as any} />

      <Pressable style={[styles.btn, (isPending || isSubmitting) && styles.btnDisabled]} onPress={handleSubmit(onSubmit)} disabled={isPending || isSubmitting}>
        {isPending || isSubmitting ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Guardar Cambios (PUT) {isDirty ? '• Modificado' : ''}</Text>}
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.sm, paddingBottom: 100 },
  centered: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  subtitle: { fontSize: 11, color: COLORS.accent, marginBottom: 8 },
  row: { flexDirection: 'row', gap: SPACING.md },
  btn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.md },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#000', fontWeight: '700' },
});
