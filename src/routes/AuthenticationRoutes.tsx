import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Login, Register} from '../screens';

const {Navigator, Screen} = createStackNavigator();

export function AuthenticationRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login">
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />

    </Navigator>
  );
}
