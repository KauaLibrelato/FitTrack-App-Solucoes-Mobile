import React from 'react';
import {useTheme} from 'styled-components';
import {getTabBarIcon} from '../..';
import * as Styles from '../../../TabBarStyles';
import {tabButtonProps} from '../../constants';
import {ITabBar} from '../../types';

export function TabBarButton({route, descriptors, state, navigation}: ITabBar) {
  const {options} = descriptors[route.key];
  const isFocused = state.routes[state.index].key === route.key;
  const theme = useTheme();

  const onPress = () => {
    const event = navigation.emit({
      type: 'tabPress',
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: 'tabLongPress',
      target: route.key,
    });
  };

  return (
    <Styles.TabButton
      {...tabButtonProps}
      key={route.key}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Styles.ButtonContainer>
        <Styles.InsideButtonContainer isFocused={isFocused}>
          {getTabBarIcon({options, isFocused, theme})}
        </Styles.InsideButtonContainer>
      </Styles.ButtonContainer>
    </Styles.TabButton>
  );
}
