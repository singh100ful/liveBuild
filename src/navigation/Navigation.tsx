import {
  NavigationContainer,
  NavigationProp,
  RouteProp,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {ListScreen} from '../screens/ListScreen';
import {PostScreen} from '../screens/PostScreen';
import {AddPost} from '../screens/AddPost';
import {RouteKeys} from './RouteKeys';
import {Colors} from '../themes/Colors';

export interface GenericNavigation {
  navigation: NavigationProp<any>;
  route: RouteProp<any, any>;
}

interface NavigationProps {}

const AppStack = createNativeStackNavigator();

export const Navigation: React.FC<NavigationProps> = ({}) => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
        }}>
        <AppStack.Screen component={ListScreen} name={RouteKeys.ListScreen} />
        <AppStack.Screen component={PostScreen} name={RouteKeys.PostScreen} />
        <AppStack.Screen component={AddPost} name={RouteKeys.AddPost} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
