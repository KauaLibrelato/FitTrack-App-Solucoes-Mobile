import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import React from "react";
import { AppRoutes } from "./Routes";

export function Routes() {
  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: "#141516",
        },
      }}
    >
      <AppRoutes />
    </NavigationContainer>
  );
}

export default Routes;
