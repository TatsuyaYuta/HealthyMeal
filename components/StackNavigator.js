// StackNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import MainPage from './Main/MainPage';
import MealPage from './Category/MealPage';
import AppetizersPage from './/Category/AppetizersPage';
import MealDetailPage from './Category/Detail/MealDetailPage';
import AppetizersDetailPage from './Category/Detail/AppetizersDetailPage';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen 
          name="MainPage" 
          component={MainPage} 
          options={{ headerShown: false }} />
        <Stack.Screen 
          name="MealPage" 
          component={MealPage} 
          options={{ title: 'Meal', headerShown: false }} />
        <Stack.Screen 
          name="MealDetail"
          component={MealDetailPage}
          options={{ title: 'ชื่อเมนู', headerShown: false }} />
        <Stack.Screen 
          name="AppetizersPage" 
          component={AppetizersPage} 
          options={{ title: 'Appetizers', headerShown: false }} />
        <Stack.Screen 
          name="AppetizersDetail"
          component={AppetizersDetailPage}
          options={{ title: 'ชื่อเมนู', headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
