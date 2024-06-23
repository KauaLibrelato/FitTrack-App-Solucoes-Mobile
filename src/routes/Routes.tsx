import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AuthenticationRoutes } from "./AuthenticationRoutes";
import { AuthenticatedTabRoutes } from "./AuthenticatedRoutes";
import { Splash } from "../screens";

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}
      initialRouteName="Splash"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="AuthenticationRoutes" component={AuthenticationRoutes} />
      <Screen name="AuthenticatedRoutes" component={AuthenticatedTabRoutes} />
    </Navigator>
  );
}
