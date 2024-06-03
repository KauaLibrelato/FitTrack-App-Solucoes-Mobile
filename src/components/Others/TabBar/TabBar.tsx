import React, { useContext, useEffect, useState } from "react";
import { Animated, View } from "react-native";
import * as S from "./TabBarStyles";
import { TabBarButton } from "./utils";
import { ITabBar } from "./utils/types";

export function TabBar({ state, descriptors, navigation }: ITabBar) {
  return (
    <S.Container>
      <View style={S.viewStyles.contanerView}>
        {state.routes.map(
          (route: { key: string | number; name: string; index: number }) => (
            <TabBarButton
              key={route.key}
              route={route}
              descriptors={descriptors}
              state={state}
              navigation={navigation}
            />
          )
        )}
      </View>
    </S.Container>
  );
}
