import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { AppRoutes } from "./Routes";

export function Routes() {
  return (
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
  );
}

export default Routes;
