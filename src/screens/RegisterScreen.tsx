import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { registerSchema, RegisterFormData } from '../schemas/authSchema';
import { FormField } from '../components/FormField';
import { useAuthStore } from '../stores/authStore';

// Semana 08 - Registro (simula POST /users y auto-login demo)
export function RegisterScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const [sending, setSending] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', username: '', password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setSending(true);
    try {
      // Simula POST /users de la API (800ms)
      await new Promise((r) => setTimeout(r, 800));
      const { secureStorage } = await import('../services/storage');
      const user = {
        id: Date.now(),
        username: data.username,
        email: data.email,
        firstName: data.name.split(' ')[0] || data.name,
        lastName: data.name.split(' ').slice(1).join(' ') || '',
        image: 'https://dummyjson.com/icon/emilys/128',
      };
      await secureStorage.setItem('accessToken', 'demo-token');
      await secureStorage.setItem('refreshToken', 'demo-refresh');
      await secureStorage.setItem('user', JSON.stringify(user));
      useAuthStore.setState({ user: user as any, accessToken: 'demo-token', refreshToken: 'demo-refresh', isAuthenticated: true, isLoading: false });
      Alert.alert('¡Cuenta creada! 🎉', `Bienvenido a CleanPro, ${data.username}`);
    } catch (e: any) {
      Alert.alert('Error', e.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Crear Cuenta</Text>
      <Text style={styles.subtitle}>Semana 08 - RHF + Zod validación de registro</Text>

      <FormField name="name" control={control} label="Nombre completo *" placeholder="Ej: Cristian Sena" error={errors.name} />
      <FormField name="email" control={control} label="Email *" placeholder="tucorreo@cleanpro.com" keyboardType="email-address" autoCapitalize="none" error={errors.email} />
      <FormField name="username" control={control} label="Usuario *" placeholder="Ej: crisena" autoCapitalize="none" error={errors.username} />
      <FormField name="password" control={control} label="Contraseña *" placeholder="Mín 6 caracteres" secureTextEntry error={errors.password} />
      <FormField name="confirmPassword" control={control} label="Confirmar contraseña *" placeholder="Repite la contraseña" secureTextEntry error={errors.confirmPassword} />

      <Pressable style={[styles.btn, (sending || isSubmitting) && styles.btnDisabled]} onPress={handleSubmit(onSubmit)} disabled={sending || isSubmitting}>
        {sending || isSubmitting ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Crear cuenta</Text>}
      </Pressable>

      <Pressable onPress={() => navigation.goBack()}>
        <Text style={styles.link}>← Ya tengo cuenta, volver al login</Text>
      </Pressable>

      <View style={styles.info}>
        <Text style={styles.infoText}>💡 Validaciones Zod: email válido, usuario mín 3, contraseña mín 6 y confirmación igual. Al crear la cuenta se guarda en SecureStore y entras directo (auto-login demo).</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.md, paddingBottom: 100 },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.textPrimary, marginTop: SPACING.md },
  subtitle: { fontSize: 11, color: COLORS.accent, marginTop: -8 },
  btn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.sm },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  link: { color: COLORS.accent, textAlign: 'center', fontSize: 14 },
  info: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border },
  infoText: { fontSize: 11, color: COLORS.textMuted, lineHeight: 16 },
});
