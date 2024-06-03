import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { TabBar } from "../components";
import { Calendar, Configurations, Home } from "../screens";

const { Navigator, Screen } = createBottomTabNavigator();

export function AuthenticatedTabRoutes() {
  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => <TabBar {...props} />}
    >
      <Screen
        component={Home}
        name="Home"
        options={{
          tabBarIcon: "home" as any,
        }}
      />

      <Screen
        component={Calendar}
        name="Calendar"
        options={{
          tabBarIcon: "calendar" as any,
        }}
      />

      <Screen
        component={Configurations}
        name="Configurations"
        options={{
          tabBarIcon: "configurations" as any,
        }}
      />
    </Navigator>
  );
}
