import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import { AuthenticationRoutes } from './AuthenticationRoutes';

export function Routes() {
  return (
    <NavigationContainer>
      <AuthenticationRoutes />
    </NavigationContainer>
  );
}

export default Routes;
