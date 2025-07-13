import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = () => {
  const [profile, setProfile] = useState<any>(null);
  const [moodEntries, setMoodEntries] = useState<any[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      const userData = await AsyncStorage.getItem('userProfile');
      const moodData = await AsyncStorage.getItem('moodEntries');
      setProfile(userData ? JSON.parse(userData) : null);
      setMoodEntries(moodData ? JSON.parse(moodData) : []);
    };
    fetchData();
  }, []);

  const handleSignout = async () => {
    Alert.alert('Confirm Signout', 'Are you sure you want to Signout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Signout',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.clear();
          navigation.reset({ index: 0, routes: [{ name: 'Splash' }] });
        },
      },
    ]);
  };

  return (
    <LinearGradient
    colors={['#ffffff', '#cb78b1ff']}
    style={styles.gradientContainer}
  >
    <View style={styles.container}>
      <View style={styles.profileBox}>
        <Text style={styles.avatar}>👤</Text>
        <View style={{ marginLeft: 16 }}>
          <Text style={styles.infoText}>🧾 Name: {profile?.name || 'N/A'}</Text>
          <Text style={styles.infoText}>🚻 Gender: {profile?.gender || 'N/A'}</Text>
          <Text style={styles.infoText}>🎂 Age Group: {profile?.ageGroup || 'N/A'}</Text>
        </View>
      </View>

      <Text style={styles.infoText}>📊 Mood Entries: {moodEntries.length}</Text>

      <Text style={styles.infoText}>💭 Mental Note: Stay strong and kind 💚</Text>

      <Text style={styles.motivation}>💡 Keep going, you're doing great! 💪</Text>

      <TouchableOpacity style={styles.signoutBtn} onPress={handleSignout}>
        <Text style={styles.signoutText}>Signout</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
 gradientContainer: {
  flex: 1,
},
container: {
  padding: 24,
  flexGrow: 1,
},
  profileBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    marginTop:40
  },
  avatar: {
    fontSize: 64,
  },
  infoText: {
    fontSize: 22,
    marginBottom: 8,
    color: '#333',
  },
  motivation: {
    marginTop: 24,
    fontSize: 20,
    fontStyle: 'italic',
    color: '#2e7d32',
  },
  signoutBtn: {
    marginTop: 200,
    backgroundColor: '#321485ff',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  signoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
