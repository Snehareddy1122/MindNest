import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  const [userName, setUsername] = useState('');

  const getUserProfile = async () => {
    const data = await AsyncStorage.getItem('userProfile');
    return data ? JSON.parse(data) : null;
  };

  useEffect(() => {
    getUserProfile().then(profile => {
      if (profile?.name) setUsername(profile.name);
    });
  }, []);
  return (
    <LinearGradient
      colors={['aqua', '#e0f7fa']}
      style={styles.gradientContainer}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.welcome}>👋 Welcome To MindNest {userName}</Text>
        <Text style={styles.caption}>
          An app for Journaling{'\n'}and tracking your mood 🌱
        </Text>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#cce5ff' }]}
          onPress={() => navigation.navigate('Mood Tracker')}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🌈</Text>
            </View>
            <Text style={styles.cardText}>Setup Mood Tracking</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#d4edda' }]}
          onPress={() => navigation.navigate('Journal')}
        >
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>📝</Text>
            </View>
            <Text style={styles.cardText}>Customize Journaling</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.card, { backgroundColor: '#fff3cd' }]}
          onPress={() => navigation.navigate('AI Insights')}>
          <View style={styles.cardContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconEmoji}>🤖</Text>
            </View>
            <Text style={styles.cardText}>AI Insights</Text>
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 24,
  },
  welcome: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
  },
  caption: {
    fontSize: 20,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
    lineHeight: 28,
  },
  card: {
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    elevation: 2,
  },
  iconEmoji: {
    fontSize: 24,
  },
});
