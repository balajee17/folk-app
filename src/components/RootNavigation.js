import {createNavigationContainerRef} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export async function RootNavigation(screenName) {
  if (navigationRef.isReady()) {
    console.log('ROOT_NAVIGATION', screenName, '::');

    navigationRef.navigate(screenName);
  }
}
