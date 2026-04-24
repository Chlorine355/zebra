import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReportPage } from './src/pages/ReportPage/ReportPage';
import { ReportListPage } from './src/pages/ReportListPage/ReportListPage';
import { SettingsPage } from './src/pages/SettingsPage/SettingsPage';
import { RatingPage } from './src/pages/RatingPage/RatingPage';
import { AuthPage } from './src/pages/AuthPage/AuthPage';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return <Tab.Navigator>
        <Tab.Screen name="Сообщить о нарушении" component={ReportPage} />
        <Tab.Screen name="Мои сообщения" component={ReportListPage} />
        <Tab.Screen name="Рейтинг" component={RatingPage} />
        <Tab.Screen name="Настройки" component={SettingsPage} />
      </Tab.Navigator>
}

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Авторизация" component={AuthPage} />
      <Stack.Screen name="Вкладки" component={TabNavigator} />
      <Stack.Screen name="Сообщение" component={() => 'not implemented'} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}