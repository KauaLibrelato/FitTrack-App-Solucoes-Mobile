import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home } from "../../screens";

const { Navigator, Screen } = createStackNavigator();

export function HomeRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} />
    </Navigator>
  );
}
