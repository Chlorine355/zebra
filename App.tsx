import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen'; // Ваши компоненты-экраны
import SettingsScreen from './screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Главная" component={HomeScreen} />
        <Tab.Screen name="Настройки" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}