import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ReportPage1 } from './src/pages/ReportPage/components/ReportPage1';
import { ReportListPage } from './src/pages/ReportListPage/ReportListPage';
import { SettingsPage } from './src/pages/SettingsPage/SettingsPage';
import { RatingPage } from './src/pages/RatingPage/RatingPage';
import { AuthPage } from './src/pages/AuthPage/AuthPage';
import { SingleReportPage } from './src/pages/SingleReportPage/SingleReportPage';
import { ReportPage2 } from './src/pages/ReportPage/components/ReportPage2';
import { YamapInstance } from 'react-native-yamap-plus';
import { REACT_APP_YAMAP_KEY } from '@env'
import Icon from 'react-native-vector-icons/Ionicons';

YamapInstance.init(REACT_APP_YAMAP_KEY);

const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const ReportStack = createNativeStackNavigator();

const ReportStackNavigator = () => {
  return <ReportStack.Navigator>
    <ReportStack.Screen name="Report1" options={{ title: 'Сообщить о нарушении' }} component={ReportPage1} />
    <ReportStack.Screen name="Report2" options={{ title: 'Детали', headerBackButtonMenuEnabled: true }} component={ReportPage2} />
  </ReportStack.Navigator>
}

const MegaphoneIcon = ({ focused }: { focused: boolean }) => <Icon name={focused ? 'megaphone' : 'megaphone-outline'} size={24} />;
const ReportsIcon = ({ focused }: { focused: boolean }) => <Icon name={focused ? 'list' : 'list-outline'} size={24} />;
const RatingIcon = ({ focused }: { focused: boolean }) => <Icon name={focused ? 'bar-chart' : 'bar-chart-outline'} size={24} />;
const SettingsIcon = ({ focused }: { focused: boolean }) => <Icon name={focused ? 'settings' : 'settings-outline'} size={24} />;


const TabNavigator = () => {
  // TODO: добавить иконки и убрать надписи из вкладок
  return <Tab.Navigator screenOptions={{ tabBarHideOnKeyboard: true, tabBarShowLabel: false }}>
    <Tab.Screen name="CreateReport" options={{ title: 'Нарушение', headerTitle: 'Сообщить о нарушении', headerShown: false, tabBarIcon: MegaphoneIcon, }} component={ReportStackNavigator} />
    <Tab.Screen name="Reports" options={{ title: 'Сообщения', headerTitle: 'Мои сообщения', tabBarIcon: ReportsIcon, }} component={ReportListPage} />
    <Tab.Screen name="Rating" options={{ title: 'Рейтинг', headerTitle: 'Рейтинг и статистика', tabBarIcon: RatingIcon, }} component={RatingPage} />
    <Tab.Screen name="Settings" options={{ title: 'Настройки', headerTitle: 'Настройки и профиль', tabBarIcon: SettingsIcon, }} component={SettingsPage} />
  </Tab.Navigator>
}

const MainStackNavigator = () => {
  return (
    <MainStack.Navigator>
      <MainStack.Screen name="Auth" options={{ title: 'Вход' }} component={AuthPage} />
      <MainStack.Screen name="Tabs" options={{ title: 'Вкладки', headerShown: false }} component={TabNavigator} />
      <MainStack.Screen name="SingleReport" options={{ title: 'Сообщение' }} component={SingleReportPage} />
    </MainStack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MainStackNavigator />
    </NavigationContainer>
  );
}