import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { COLORS, SPACING, RADIUS } from '../theme';
import { loginSchema, LoginFormData } from '../schemas/authSchema';
import { FormField } from '../components/FormField';
import { useAuthStore } from '../stores/authStore';
import { useNavigation } from '@react-navigation/native';

export function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const { login, isLoading, error, clearError } = useAuthStore();
  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: 'kminchelle', password: '0lelplR' },
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      clearError();
      await login(data.username, data.password);
      Alert.alert('¡Bienvenido!', `Hola ${data.username}`);
    } catch (e: any) {
      Alert.alert('Error login', error || e.message);
    }
  };
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.logo}>🧹 CleanPro</Text>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Semana 08 - JWT + SecureStore + Zustand authStore</Text>
      </View>
      <View style={styles.form}>
        <FormField name="username" control={control} label="Usuario *" placeholder="kminchelle" autoCapitalize="none" error={errors.username} hint="Demo: kminchelle" />
        <FormField name="password" control={control} label="Contraseña *" placeholder="••••••" secureTextEntry error={errors.password} hint="Demo: 0lelplR" />
        {error && <View style={styles.errorBox}><Text style={styles.errorText}>❌ {error}</Text></View>}
        <Pressable style={[styles.btn, (isLoading || isSubmitting) && styles.btnDisabled]} onPress={handleSubmit(onSubmit)} disabled={isLoading || isSubmitting}>
          {isLoading || isSubmitting ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Ingresar (JWT)</Text>}
        </Pressable>
        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>🔑 Credenciales demo (dummyjson.com):</Text>
          <Text style={styles.demoText}>Usuario: kminchelle{'\n'}Contraseña: 0lelplR{'\n\n'}Usuario: emilys{'\n'}Contraseña: emilyspass</Text>
        </View>
        <Pressable onPress={() => (navigation as any).navigate('Register')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: SPACING.lg, gap: SPACING.lg, paddingBottom: 100 },
  header: { alignItems: 'center', gap: SPACING.sm, marginTop: SPACING.xl },
  logo: { fontSize: 32, fontWeight: '700', color: COLORS.accent },
  title: { fontSize: 24, fontWeight: '700', color: COLORS.textPrimary },
  subtitle: { fontSize: 11, color: COLORS.accent },
  form: { gap: SPACING.md, marginTop: SPACING.md },
  errorBox: { backgroundColor: COLORS.error + '20', borderWidth: 1, borderColor: COLORS.error, padding: SPACING.md, borderRadius: RADIUS.md },
  errorText: { color: COLORS.error, fontSize: 13 },
  btn: { backgroundColor: COLORS.accent, padding: SPACING.base, borderRadius: RADIUS.lg, alignItems: 'center', marginTop: SPACING.sm },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: '#000', fontWeight: '700', fontSize: 16 },
  demoBox: { backgroundColor: COLORS.surface, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border },
  demoTitle: { fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  demoText: { fontSize: 12, color: COLORS.textSecondary, lineHeight: 18 },
  link: { color: COLORS.accent, textAlign: 'center', marginTop: SPACING.sm, fontSize: 14 },
});