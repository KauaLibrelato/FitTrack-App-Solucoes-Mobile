import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { TabBar } from "../components";
import { ConfigurationsRoutes } from "./AuthenticatedRoutes/ConfigurationsRoutes";
import { CalendarRoutes } from "./AuthenticatedRoutes/CalendarRoutes";
import { HomeRoutes } from "./AuthenticatedRoutes/HomeRoutes";

const { Navigator, Screen } = createBottomTabNavigator();

export function AuthenticatedTabRoutes() {
  const [isTabBarVisibility, setIsTabBarVisibility] = useState(true);

  return (
    <Navigator
      initialRouteName="HomeRoutes"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => isTabBarVisibility && <TabBar {...props} />}
    >
      <Screen
        component={CalendarRoutes}
        name="CalendarRoutes"
        options={{
          tabBarIcon: "calendar" as any,
        }}
      />

      <Screen
        component={HomeRoutes}
        name="HomeRoutes"
        options={{
          tabBarIcon: "home" as any,
        }}
      />

      <Screen
        name="ConfigurationsRoutes"
        options={{
          tabBarIcon: "configurations" as any,
        }}
      >
        {(props) => (
          <ConfigurationsRoutes
            {...props}
            setIsTabBarVisibility={setIsTabBarVisibility}
          />
        )}
      </Screen>
    </Navigator>
  );
}
