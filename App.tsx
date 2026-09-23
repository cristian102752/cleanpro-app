import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from 'react-native';
import { RootNavigator } from './src/navigation/RootNavigator';
import { AuthNavigator } from './src/navigation/AuthNavigator';
import { useAuthStore } from './src/stores/authStore';
import { COLORS } from './src/theme';

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 1000 * 60 * 2, retry: 2, refetchOnWindowFocus: false } } });

function AppContent() {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();
  useEffect(() => { checkAuth(); }, []);
  if (isLoading) {
    return <View style={{ flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' }}><ActivityIndicator size="large" color={COLORS.accent} /></View>;
  }
  return <NavigationContainer><StatusBar style="light" />{isAuthenticated ? <RootNavigator /> : <AuthNavigator />}</NavigationContainer>;
}

export default function App(): React.JSX.Element {
  return <QueryClientProvider client={queryClient}><SafeAreaProvider><AppContent /></SafeAreaProvider></QueryClientProvider>;
}