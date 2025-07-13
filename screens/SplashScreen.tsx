import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const SplashScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

 useEffect(() => {
  const checkUserProfile = async () => {
    const storedProfile = await AsyncStorage.getItem('userProfile');

    setTimeout(() => {
      if (storedProfile) {
        navigation.dispatch(StackActions.replace('MainApp'));
      } else {
        navigation.dispatch(StackActions.replace('Intro'));
      }
    }, 4000);
  };

  checkUserProfile();
}, []);


  return (
    <View style={styles.container}>
      <Image source={require('../assets/Splashscreen.png')}  style={{ width, height }}  resizeMode="stretch" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1},
});

export default SplashScreen;
