import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Configurations, EditProfile } from "../../screens";
import { IConfigurationsTabBarVisibilityProps } from "../../utils/types";

const { Navigator, Screen } = createStackNavigator();

export function ConfigurationsRoutes({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Configurations"
    >
      <Screen name="Configurations">
        {(props) => (
          <Configurations
            {...props}
            setIsTabBarVisibility={setIsTabBarVisibility}
          />
        )}
      </Screen>
      <Screen name="EditProfile" component={EditProfile} />
    </Navigator>
  );
}
