import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Calendar } from "../../screens";

const { Navigator, Screen } = createStackNavigator();

export function CalendarRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Calendar"
    >
      <Screen name="Calendar" component={Calendar} />
    </Navigator>
  );
}
