import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Teste1, Teste2} from '../screens';

const {Navigator, Screen} = createStackNavigator();

export function stackRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Teste1">
      <Screen name="Teste1" component={Teste1} />

      <Screen name="Teste2" component={Teste2} />
    </Navigator>
  );
}
