import {
  BottomTabDescriptorMap,
  BottomTabNavigationEventMap,
} from "@react-navigation/bottom-tabs/lib/typescript/src/types";
import {
  NavigationHelpers,
  ParamListBase,
  TabNavigationState,
} from "@react-navigation/native";

interface ITheme {
  colors: {
    primary: string;
    primaryDark: string;
    primaryLight: string;
    secondary: string;
    secondaryDark: string;
    secondaryLight: string;
    success: string;
    successDark: string;
    successLight: string;
    warning: string;
    warningDark: string;
    warningLight: string;
    error: string;
    errorDark: string;
    errorLight: string;
    accent: string;
    background: string;
    text: string;
    border: string;
    disabled: string;
    placeholder: string;
  };
}

export interface ITabBar {
  route: { key: string | number; name: string; index: number };
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

export interface GetTabBarIconProps {
  options: any;
  isFocused: boolean;
  theme?: ITheme;
}
