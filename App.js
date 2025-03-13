import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView} from 'react-native';
import * as Font from 'expo-font'; // นำเข้า expo-font
{/*import FormInput from "./components/FormInput";*/}
{/*import ProfileScreen from "./components/ProfileScreen";*/}
{/*import ForgotPasswordScreen from "./components/ForgotPasswordScreen";*/}
{/*import ForgotPasswordScreen from './components/CreateNewPassword';*/}
import VerifyEmail from './components/VerifyEmail';

const loadFonts = async () => {
  await Font.loadAsync({
    'MuseoModerno-Bold': require('./assets/fonts/MuseoModerno-Bold.ttf'),
    'MuseoModerno-Regular': require('./assets/fonts/MuseoModerno-Regular.ttf'),
    'MuseoModerno-Medium': require('./assets/fonts/MuseoModerno-Medium.ttf'),
    'Itim-Regular': require('./assets/fonts/Itim-Regular.ttf'),
    'MuseoModerno-SemiBold': require('./assets/fonts/MuseoModerno-SemiBold.ttf'),
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
    <SafeAreaView>
        {/*<FormInput />*/}
        {/*<ProfileScreen />*/}
        {/*<ForgotPasswordScreen/>*/}
        <VerifyEmail/>
    </SafeAreaView>
  );
};