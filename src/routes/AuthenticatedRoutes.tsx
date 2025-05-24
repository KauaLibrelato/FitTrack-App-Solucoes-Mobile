import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useState } from "react";
import { ConfigurationsRoutes } from "./AuthenticatedRoutes/ConfigurationsRoutes";
import { HomeRoutes } from "./AuthenticatedRoutes/HomeRoutes";
import { TabBarComponent } from "./components/TabBarComponent";

const { Navigator, Screen } = createBottomTabNavigator();

export function AuthenticatedTabRoutes() {
  const [isTabBarVisibility, setIsTabBarVisibility] = useState(true);

  return (
    <Navigator
      initialRouteName="HomeRoutes"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <TabBarComponent isTabBarVisible={isTabBarVisibility} props={props} />}
    >
      <Screen
        name="HomeRoutes"
        options={{
          tabBarIcon: "home" as any,
        }}
      >
        {(props) => <HomeRoutes {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}
      </Screen>

      <Screen
        name="ConfigurationsRoutes"
        options={{
          tabBarIcon: "configurations" as any,
        }}
      >
        {(props) => <ConfigurationsRoutes {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}
      </Screen>
    </Navigator>
  );
}
