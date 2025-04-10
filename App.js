import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView} from 'react-native';
import * as Font from 'expo-font'; // นำเข้า expo-font
import MainPage from './components/Main/MainPage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MealPage from './components/Category/MealPage';
import AppetizersPage from './components/Category/AppetizersPage';
import MealDetailPage from './components/Category/Detail/MealDetailPage';
import AppetizersDetailPage from './components/Category/Detail/AppetizersDetailPage';

const Stack = createStackNavigator();

const loadFonts = async () => {
  await Font.loadAsync({
    'MuseoModerno-Bold': require('./assets/fonts/MuseoModerno-Bold.ttf'),
    'MuseoModerno-Regular': require('./assets/fonts/MuseoModerno-Regular.ttf'),
    'MuseoModerno-Medium': require('./assets/fonts/MuseoModerno-Medium.ttf'),
    'Itim-Regular': require('./assets/fonts/Itim-Regular.ttf'),
    'MuseoModerno-SemiBold': require('./assets/fonts/MuseoModerno-SemiBold.ttf'),
    'ABeeZee-Regular': require('./assets/fonts/ABeeZee-Regular.ttf'),
    'ABeeZee-Italic': require('./assets/fonts/ABeeZee-Italic.ttf'),
    'Kanit-Black': require('./assets/fonts/Kanit-Black.ttf'),
    'Kanit-BlackItalic': require('./assets/fonts/Kanit-BlackItalic.ttf'),
    'Kanit-BoldItalic': require('./assets/fonts/Kanit-BoldItalic.ttf'),
    'Kanit-ExtraBold': require('./assets/fonts/Kanit-ExtraBoldItalic.ttf'),
    'Kanit-ExtraBoldItalic': require('./assets/fonts/Kanit-ExtraBoldItalic.ttf'),
    'Kanit-ExtraLight': require('./assets/fonts/Kanit-ExtraLight.ttf'),
    'Kanit-ExtraLightItalic': require('./assets/fonts/Kanit-ExtraLightItalic.ttf'),
    'Kanit-Italic': require('./assets/fonts/Kanit-Italic.ttf'),
    'Kanit-Light': require('./assets/fonts/Kanit-Light.ttf'),
    'Kanit-LightItalic': require('./assets/fonts/Kanit-LightItalic.ttf'),
    'Kanit-Medium': require('./assets/fonts/Kanit-Medium.ttf'),
    'Kanit-MediumItalic': require('./assets/fonts/Kanit-MediumItalic.ttf'),
    'Kanit-Regular': require('./assets/fonts/Kanit-Regular.ttf'),
    'Kanit-SemiBold': require('./assets/fonts/Kanit-SemiBold.ttf'),
    'Kanit-SemiBoldItalic': require('./assets/fonts/Kanit-SemiBoldItalic.ttf'),
    'Kanit-Thin': require('./assets/fonts/Kanit-Thin.ttf'),
    'Kanit-ThinItalic': require('./assets/fonts/Kanit-ThinItalic.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        await loadFonts();
        setFontsLoaded(true);
      } catch (error) {
        console.error('Error loading fonts:', error);
      }
    };
    load();
  }, []);

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" />;
  }

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
          options={{title: 'ชื่อเมนู',headerShown: false }}/>
        <Stack.Screen name="AppetizersPage" 
          component={AppetizersPage} 
          options={{ title: 'Appetizers', headerShown: false }} />
        <Stack.Screen 
          name="AppetizersDetail"
          component={AppetizersDetailPage}
          options={{title: 'ชื่อเมนู',headerShown: false }}/>
        {/*<Stack.Screen name="Dessert" 
        component={DessertPage} 
        options={{ title: 'Dessert', headerShown: false }} />
        <Stack.Screen name="Salad" 
        component={SaladPage} 
        options={{ title: 'Salad', headerShown: false }} />
        <Stack.Screen name="Drinks" 
        component={DrinksPage} 
        options={{ title: 'Drinks', headerShown: false }} />*/}
      </Stack.Navigator>
    </NavigationContainer>
    //<MealPage />
    //<MainPage />
  );
};