import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Home, Exercises, Ranking, FriendsRanking } from "../../screens";
import { IConfigurationsTabBarVisibilityProps } from "../../utils/types";

const { Navigator, Screen } = createStackNavigator();

export function HomeRoutes({
  setIsTabBarVisibility,
}: IConfigurationsTabBarVisibilityProps) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} />
      <Screen name="Exercises">
        {(props) => (
          <Exercises {...props} setIsTabBarVisibility={setIsTabBarVisibility} />
        )}
      </Screen>
      <Screen name="Ranking" component={Ranking} />
      <Screen name="FriendsRanking" component={FriendsRanking} />
    </Navigator>
  );
}
