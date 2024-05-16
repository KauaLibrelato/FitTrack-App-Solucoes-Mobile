import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {DrawerRoutes} from './drawerRoutes';

export function Routes() {
  return (
    <NavigationContainer>
      <DrawerRoutes />
    </NavigationContainer>
  );
}

export default Routes;
