import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { COLORS, SPACING, RADIUS } from '../theme';
import { registerSchema, RegisterFormData } from '../schemas/authSchema';
import { FormField } from '../components/FormField';

export function RegisterScreen(): React.JSX.Element {
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', username: '', password: '', confirmPassword: '' },
  });
  const onSubmit = (data: RegisterFormData) => {
    Alert.alert('Registro simulado', `Usuario ${data.username} registrado (solo demo, usa login con kminchelle)`);
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Registro CleanPro</Text>
      <Text style={styles.subtitle}>Semana 08 - RHF + Zod con refine (password match)</Text>
      <FormField name="name" control={control} label="Nombre completo *" placeholder="Cristian Alvarado" error={errors.name} />
      <FormField name="email" control={control} label="Email *" placeholder="cristian@email.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
      <FormField name="username" control={control} label="Usuario *" placeholder="cristian1027" autoCapitalize="none" error={errors.username} />
      <FormField name="password" control={control} label="Contraseña *" placeholder="••••••" secureTextEntry error={errors.password} />
      <FormField name="confirmPassword" control={control} label="Confirmar contraseña *" placeholder="••••••" secureTextEntry error={errors.confirmPassword} />
      <Pressable style={[styles.btn, isSubmitting && { opacity: 0.6 }]} onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
        <Text style={styles.btnText}>Registrarse</Text>
      </Pressable>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: 100 },
  title: { fontSize: 22, fontWeight: '700', color: COLORS.textPrimary },
  subtitle: { fontSize: 11, color: COLORS.accent },
  btn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.md },
  btnText: { color: '#000', fontWeight: '700' },
});