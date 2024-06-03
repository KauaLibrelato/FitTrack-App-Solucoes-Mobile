import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthenticationRoutes } from "./AuthenticationRoutes";
import { AuthenticatedTabRoutes } from "./AuthenticatedRoutes";

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Authentication"
    >
      <Screen name="AuthenticationRoutes" component={AuthenticationRoutes} />
      <Screen name="AuthenticatedRoutes" component={AuthenticatedTabRoutes} />
    </Navigator>
  );
}
