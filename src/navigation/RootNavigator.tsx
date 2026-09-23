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
import { COLORS } from '../theme';
import { RootTabParamList, ServicesStackParamList } from './types';
import { useFavoritesStore } from '../stores/favoritesStore';

const Tab = createBottomTabNavigator<RootTabParamList>();
const ServicesStack = createNativeStackNavigator<ServicesStackParamList>();

// Semana 06 - rutas de crear y editar en el stack
function ServicesStackNavigator(): React.JSX.Element {
  return (
    <ServicesStack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.surface },
        headerTintColor: COLORS.textPrimary,
        headerTitleStyle: { fontWeight: 'bold' },
        contentStyle: { backgroundColor: COLORS.background },
      }}
    >
      <ServicesStack.Screen name="ServicesList" component={ServicesListScreen} options={{ title: 'CleanPro • Servicios' }} />
      <ServicesStack.Screen name="ServiceDetail" component={ServiceDetailScreen} options={({ route }) => ({ title: route.params.name })} />
      <ServicesStack.Screen name="CreateService" component={CreateServiceScreen} options={{ title: 'Nuevo Servicio', presentation: 'modal' }} />
      <ServicesStack.Screen name="EditService" component={EditServiceScreen} options={({ route }) => ({ title: `Editar: ${route.params.name}` })} />
    </ServicesStack.Navigator>
  );
}

export function RootNavigator(): React.JSX.Element {
  const favCount = useFavoritesStore((s) => s.favoriteServiceIds.length);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';
          if (route.name === 'Servicios') iconName = focused ? 'sparkles' : 'sparkles-outline';
          else if (route.name === 'Clientes') iconName = focused ? 'people' : 'people-outline';
          else if (route.name === 'Personal') iconName = focused ? 'people-circle' : 'people-circle-outline';
          else if (route.name === 'Agenda') iconName = focused ? 'calendar' : 'calendar-outline';
          else if (route.name === 'Favoritos') iconName = focused ? 'heart' : 'heart-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.accent,
        tabBarInactiveTintColor: COLORS.textMuted,
        tabBarStyle: { backgroundColor: COLORS.surface, borderTopColor: COLORS.border },
      })}
    >
      <Tab.Screen name="Servicios" component={ServicesStackNavigator} />
      <Tab.Screen name="Clientes" component={ClientsScreen} />
      <Tab.Screen name="Personal" component={StaffScreen} />
      <Tab.Screen name="Agenda" component={AgendaScreen} />
      <Tab.Screen name="Favoritos" component={FavoritesScreen} options={{ tabBarBadge: favCount > 0 ? favCount : undefined, tabBarBadgeStyle: { backgroundColor: COLORS.accent, color: '#000' } }} />
    </Tab.Navigator>
  );
}
