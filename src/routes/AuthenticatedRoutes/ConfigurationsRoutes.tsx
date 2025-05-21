import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { AddFriends, Configurations, EditProfile, Friends, Missions } from "../../screens";
import { IConfigurationsTabBarVisibilityProps } from "../../utils/types";

type Props = Readonly<IConfigurationsTabBarVisibilityProps>;

const { Navigator, Screen } = createStackNavigator();

export function ConfigurationsRoutes({ setIsTabBarVisibility }: Props) {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Configurations"
    >
      <Screen name="Configurations">
        {(props) => <Configurations {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}
      </Screen>
      <Screen name="EditProfile">
        {(props) => <EditProfile {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}
      </Screen>
      <Screen name="Missions">
        {(props) => <Missions {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}
      </Screen>
      <Screen name="Friends">{(props) => <Friends {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}</Screen>
      <Screen name="AddFriends" component={AddFriends} />
    </Navigator>
  );
}
