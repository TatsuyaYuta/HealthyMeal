import React, { useState, useEffect } from 'react';
import { ActivityIndicator, SafeAreaView} from 'react-native';
import * as Font from 'expo-font'; // นำเข้า expo-font
{/*import FormInput from "./components/FormInput";*/}
{/*import ProfileScreen from "./components/ProfileScreen";*/}
{/*import ForgotPasswordScreen from "./components/ForgotPasswordScreen";*/}
{/*import CreateNewPassword from './components/CreateNewPassword';*/}
{/*import VerifyEmail from './components/VerifyEmail';*/}
import MainPage from './components/Main/MainPage';

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
    <SafeAreaView>
        {/*<FormInput />*/}
        {/*<ProfileScreen />*/}
        {/*<ForgotPasswordScreen/>*/}
        {/*<VerifyEmail/>*/}
        {/*<CreateNewPassword/>*/}
        <MainPage />
    </SafeAreaView>
  );
};