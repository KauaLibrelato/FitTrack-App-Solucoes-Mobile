import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {useTheme} from 'styled-components';
import {Teste3} from '../screens';
import {TabRoutes} from './tabRoutes';

const {Navigator, Screen} = createDrawerNavigator();
export function DrawerRoutes() {
  const theme = useTheme();
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          color: theme.colors.text,
          fontSize: 14,
          fontWeight: 'bold',
        },
        drawerStyle: {
          width: '60%',
          backgroundColor: theme.colors.background,
        },
      }}>
      <Screen component={TabRoutes} name="Home" />
      <Screen component={Teste3} name="Teste" />
    </Navigator>
  );
}
