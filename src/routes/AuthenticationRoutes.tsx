import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  Login,
  Register,
  ForgotPassword,
} from "../screens/AuthenticationScreens";

const { Navigator, Screen } = createStackNavigator();

export function AuthenticationRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Login"
    >
      <Screen name="Login" component={Login} />
      <Screen name="Register" component={Register} />
      <Screen name="ForgotPassword" component={ForgotPassword} />
    </Navigator>
  );
}
