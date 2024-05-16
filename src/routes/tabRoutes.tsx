import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Teste3} from '../screens';
import {stackRoutes} from './stackRoutes';

const {Navigator, Screen} = createBottomTabNavigator();

export function TabRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Screen component={stackRoutes} name="stack1" />

      <Screen component={Teste3} name="Teste3" />
    </Navigator>
  );
}
