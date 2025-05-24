import React from "react";
import { TabBar } from "../../components";

interface TabBarComponentProps {
  isTabBarVisible: boolean;
  props: any;
}

export const TabBarComponent: React.FC<TabBarComponentProps> = ({ isTabBarVisible, props }) => {
  return isTabBarVisible ? <TabBar {...props} /> : null;
};
