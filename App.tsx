import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import DrawerNavigator from './navigation/DrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IntroForm from './screens/InfoForm';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
   const [initialRoute, setInitialRoute] = useState<string | null>(null);

  useEffect(() => {
    const checkUserProfile = async () => {
      const data = await AsyncStorage.getItem('userProfile');
      setInitialRoute(data ? 'MainApp' : 'Intro');
    };

    checkUserProfile();
  }, []);

  if (!initialRoute) return null; 
  
   return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Intro" component={IntroForm} />
        <Stack.Screen name="MainApp" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
