import React from "react";
import { View } from "react-native";
import * as S from "./TabBarStyles";
import { TabBarButton } from "./utils";
import { ITabBar } from "./utils/types";

export function TabBar({ state, descriptors, navigation }: Readonly<ITabBar>) {
  return (
    <S.Container>
      <View style={S.viewStyles.contanerView}>
        {state.routes.map((route, index) => (
          <TabBarButton
            key={route.key}
            route={{ ...route, index }}
            descriptors={descriptors}
            state={state}
            navigation={navigation}
          />
        ))}
      </View>
    </S.Container>
  );
}
