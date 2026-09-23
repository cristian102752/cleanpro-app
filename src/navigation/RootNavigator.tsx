import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import { ServicesListScreen } from '../screens/ServicesListScreen';
import { ServiceDetailScreen } from '../screens/ServiceDetailScreen';
import { CreateServiceScreen } from '../screens/CreateServiceScreen';
import { EditServiceScreen } from '../screens/EditServiceScreen';
import { ClientsScreen } from '../screens/ClientsScreen';
import { StaffScreen } from '../screens/StaffScreen';
import { AgendaScreen } from '../screens/AgendaScreen';
import { FavoritesScreen } from '../screens/FavoritesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useThemeColors } from '../hooks/useThemeColors';
import { RootTabParamList, ServicesStackParamList } from './types';
import { useFavoritesStore } from '../stores/favoritesStore';

const Tab = createBottomTabNavigator<RootTabParamList>();
const ServicesStack = createNativeStackNavigator<ServicesStackParamList>();

function ServicesStackNavigator(): React.JSX.Element {
  const COLORS = useThemeColors();
  return (
    <ServicesStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <ServicesStack.Screen name="ServicesList" component={ServicesListScreen} options={{ title: 'CleanPro • Servicios', headerShown: false }} />
      <ServicesStack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={({ route }) => ({ title: route.params.name })} />
      <ServicesStack.Screen name="CreateService" component={CreateServiceScreen} options={{ title: 'Nuevo Servicio', presentation: 'modal' }} />
      <ServicesStack.Screen name="EditService" component={EditServiceScreen} options={({ route }) => ({ title: `Editar: ${route.params.name}` })} />
    </ServicesStack.Navigator>
  );
}

export function RootNavigator(): React.JSX.Element {
  const COLORS = useThemeColors();
  const favCount = useFavoritesStore((s) => s.favoriteServiceIds.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Servicios') iconName = focused ? 'sparkles' : 'sparkles-outline';
          else if (route.name === 'Ajustes') iconName = focused ? 'settings' : 'settings-outline';
          else if (route.name === 'Clientes') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Personal') iconName = focused ? 'people-circle' : 'people-circle-outline';
          else if (route.name === 'Agenda') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Favoritos') iconName = focused ? 'heart' : 'heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        headerShown: false,
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border, paddingBottom: 4, height: 60 },
      })}
    >
      <Tab.Screen name="Servicios" component={ServicesStackNavigator} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} options={{ title: 'Ajustes', headerShown: true }} />
      <Tab.Screen name="Clientes" component={ClientsScreen} options={{ title: 'Clientes', headerShown: true }} />
      <Tab.Screen name="Personal" component={StaffScreen} options={{ title: 'Personal', headerShown: true }} />
      <Tab.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda', headerShown: true }} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} options={{ title: 'Favoritos', headerShown: true, tabBarBadge: favCount > 0 ? favCount : undefined, tabBarBadgeStyle: { backgroundColor: COLORS.accent, color: '#000' } }} />
    </Tab.Navigator>
  );
}
