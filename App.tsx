import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';
import { COLORS } from './src/theme';
import { StatusBar } from 'react-native';

// Semana 03 - React Navigation Stack + Tabs
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
