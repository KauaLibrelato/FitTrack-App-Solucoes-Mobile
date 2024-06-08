import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { TabBar } from "../components";
import { Calendar, Home } from "../screens";
import { ConfigurationsRoutes } from "./AuthenticatedRoutes/ConfigurationsRoutes";

const { Navigator, Screen } = createBottomTabNavigator();

export function AuthenticatedTabRoutes() {
  const [isTabBarVisibility, setIsTabBarVisibility] = useState(true);

  return (
    <Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props: any) => isTabBarVisibility && <TabBar {...props} />}
    >
      <Screen
        component={Calendar}
        name="Calendar"
        options={{
          tabBarIcon: "calendar" as any,
        }}
      />

      <Screen
        component={Home}
        name="Home"
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
