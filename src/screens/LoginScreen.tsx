import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING, RADIUS } from '../theme';
import { loginSchema, LoginFormData } from '../schemas/authSchema';
import { FormField } from '../components/FormField';
import { useAuthStore } from '../stores/authStore';

export function LoginScreen(): React.JSX.Element {
  const navigation = useNavigation();
  const { login, isLoading, error, clearError } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: 'emilys', password: 'emilyspass' },
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

  const handleDemoLogin = async () => {
    try {
      clearError();
      await login('emilys', 'emilyspass');
    } catch (e: any) {
      Alert.alert('Modo Demo', 'API dummyjson no responde, entrando en modo demo local');
      const { secureStorage } = await import('../services/storage');
      await secureStorage.setItem('accessToken', 'demo-token');
      await secureStorage.setItem('refreshToken', 'demo-refresh');
      await secureStorage.setItem('user', JSON.stringify({ id: 1, username: 'emilys', email: 'emily.johnson@x.dummyjson.com', firstName: 'Emily', lastName: 'Johnson', image: 'https://dummyjson.com/icon/emilys/128' }));
      const { useAuthStore } = await import('../stores/authStore');
      useAuthStore.setState({ user: { id: 1, username: 'emilys', email: 'emily.johnson@x.dummyjson.com', firstName: 'Emily', lastName: 'Johnson', image: 'https://dummyjson.com/icon/emilys/128' } as any, accessToken: 'demo-token', refreshToken: 'demo-refresh', isAuthenticated: true, isLoading: false });
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
        <FormField name="username" control={control} label="Usuario *" placeholder="emilys" autoCapitalize="none" error={errors.username} hint="Demo: emilys" />
        <FormField name="password" control={control} label="Contraseña *" placeholder="emilyspass" secureTextEntry error={errors.password} hint="Demo: emilyspass" />

        {error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>❌ {error}</Text>
          </View>
        )}

        <Pressable style={[styles.btn, (isLoading || isSubmitting) && styles.btnDisabled]} onPress={handleSubmit(onSubmit)} disabled={isLoading || isSubmitting}>
          {isLoading || isSubmitting ? <ActivityIndicator color="#000" /> : <Text style={styles.btnText}>Ingresar (JWT)</Text>}
        </Pressable>

        <Pressable style={[styles.btn, { backgroundColor: COLORS.surface, borderWidth: 1, borderColor: COLORS.border }]} onPress={handleDemoLogin}>
          <Text style={[styles.btnText, { color: COLORS.textPrimary }]}>🚀 Entrar en Modo Demo (sin API)</Text>
        </Pressable>

        <View style={styles.demoBox}>
          <Text style={styles.demoTitle}>🔑 Credenciales demo:</Text>
          <Text style={styles.demoText}>Usuario: emilys{'\n'}Contraseña: emilyspass</Text>
        </View>

        <Pressable onPress={() => (navigation as any).navigate('Register')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate aquí</Text>
        </Pressable>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Semana 08 - Flujo:</Text>
        <Text style={styles.infoText}>
          1. POST /auth/login → accessToken + refreshToken{'\n'}2. Guarda tokens en SecureStore (cifrado){'\n'}3. Zustand authStore isAuthenticated=true{'\n'}4. Interceptor Axios agrega Authorization header{'\n'}5. Si 401 → refresh automático
        </Text>
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
  infoBox: { backgroundColor: COLORS.card, padding: SPACING.md, borderRadius: RADIUS.md, borderWidth: 1, borderColor: COLORS.border },
  infoTitle: { fontSize: 12, fontWeight: '700', color: COLORS.textPrimary, marginBottom: 4 },
  infoText: { fontSize: 11, color: COLORS.textMuted, lineHeight: 16 },
});
