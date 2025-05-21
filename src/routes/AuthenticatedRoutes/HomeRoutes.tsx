import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import {
  CreateExercise,
  ExerciseDetails,
  Exercises,
  FinishExercise,
  FinishedExercises,
  FriendsRanking,
  Home,
  Ranking,
} from "../../screens";
import { IConfigurationsTabBarVisibilityProps } from "../../utils/types";

const { Navigator, Screen } = createStackNavigator();

type Props = Readonly<IConfigurationsTabBarVisibilityProps>;

export function HomeRoutes({ setIsTabBarVisibility }: Props) {
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
        {(props) => <CreateExercise {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}
      </Screen>
      <Screen name="FinishExercise" component={FinishExercise} />
      <Screen name="FinishedExercises">
        {(props) => <FinishedExercises {...props} setIsTabBarVisibility={setIsTabBarVisibility} />}
      </Screen>
      <Screen name="ExerciseDetails" component={ExerciseDetails} />
    </Navigator>
  );
}
