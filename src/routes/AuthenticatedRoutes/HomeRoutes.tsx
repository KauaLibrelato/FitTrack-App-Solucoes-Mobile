import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  Home,
  Exercises,
  Ranking,
  FriendsRanking,
  CreateExercise,
  FinishExercise,
  FinishedExercises,
} from "../../screens";
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
      <Screen name="Ranking" component={Ranking} />
      <Screen name="FriendsRanking" component={FriendsRanking} />
      <Screen name="Exercises" component={Exercises} />
      <Screen name="CreateExercise">
        {(props) => (
          <CreateExercise
            {...props}
            setIsTabBarVisibility={setIsTabBarVisibility}
          />
        )}
      </Screen>
      <Screen name="FinishExercise" component={FinishExercise} />
      <Screen name="FinishedExercises">
        {(props) => (
          <FinishedExercises
            {...props}
            setIsTabBarVisibility={setIsTabBarVisibility}
          />
        )}
      </Screen>
    </Navigator>
  );
}
