import React from 'react';

import AppNavigator from './navigator/AppNavigator';
import NavigationService from './navigator/NavigationService';

export default function App() {
  return (
    <AppNavigator ref={navigationRef => {
      NavigationService.setTopLevelNavigator(navigationRef);
    }}/>
  );
}


