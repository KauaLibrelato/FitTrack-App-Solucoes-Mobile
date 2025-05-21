import * as Icon from "phosphor-react-native";
import React from "react";
import { GetTabBarIconProps } from "../../types";

export function getTabBarIcon({ options, theme }: GetTabBarIconProps) {
  let iconComponent;

  switch (options.tabBarIcon) {
    case "home":
      iconComponent = <Icon.House size={24} color={theme?.colors.background} />;
      break;
    case "calendar":
      iconComponent = <Icon.CalendarBlank size={24} color={theme?.colors.background} />;
      break;
    case "configurations":
      iconComponent = <Icon.Gear size={24} color={theme?.colors.background} />;
      break;
    default:
      iconComponent = <Icon.HouseSimple size={24} color={theme?.colors.background} />;
      break;
  }

  return iconComponent;
}
