import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import MoodTracker from '../screens/MoodTracker';
import JournalingPage from '../screens/JournalingPage';
import Profile from '../screens/Profile';
import ChatScreen from '../screens/AiInsights';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: 'blue', 
        },
        headerTintColor: 'white', 
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 22,
        },
        drawerActiveTintColor: '#008080', 
        drawerInactiveTintColor: '#555',
        drawerLabelStyle: {
          fontSize: 16,
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Mood Tracker" component={MoodTracker} />
      <Drawer.Screen name="Journal" component={JournalingPage} />
      <Drawer.Screen name="AI Insights" component={ChatScreen} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
