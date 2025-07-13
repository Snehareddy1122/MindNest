import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Emoji list with labels
const emojis = [
  { emoji: '😢', label: 'Sad' },
  { emoji: '😕', label: 'Moody' },
  { emoji: '😐', label: 'Neutral' },
  { emoji: '🙂', label: 'Happy' },
  { emoji: '😄', label: 'Very Happy' },
];

type MoodEntry = {
  date: string;
  mood: string | null;
  note: string;
};


// Suggestions based on mood
const suggestions: Record<string, string> = {
  '😢': "Try writing about something you're grateful for.",
  '😕': "Take a break and go for a short walk.",
  '😐': "Reflect on a small win today.",
  '🙂': "Celebrate your positive vibes—maybe share a smile with someone.",
  '😄': "Write down what made you feel this way so you can revisit it later.",
};

const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [entry, setEntry] = useState('');
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);

  const moodEntry: MoodEntry = {
  date: new Date().toISOString(),
  mood: selectedMood,
  note: entry,
};

  const handleSave = () => {
    if (!selectedMood || !entry.trim()) {
      Alert.alert('Please select a mood and enter your thoughts.');
      return;
    }
    saveMoodEntry(moodEntry);
    Alert.alert('Entry Saved ✅', `Mood: ${selectedMood}\nNote: ${entry}`);
    setSelectedMood(null);
    setEntry('');
  };

  const saveMoodEntry = async (entry: any) => {
    try {
      const existing = await AsyncStorage.getItem('moodEntries');
      const parsed = existing ? JSON.parse(existing) : [];
      parsed.push(entry);
      await AsyncStorage.setItem('moodEntries', JSON.stringify(parsed));
     setMoodHistory((prev) => [...prev, moodEntry]);
    } catch (e) {
      console.error('Failed to save mood entry:', e);
    }
  };

useEffect(() => {
  const fetchHistory = async () => {
    const data = await AsyncStorage.getItem('moodEntries');
    if (data) setMoodHistory(JSON.parse(data));
  };
  fetchHistory();
}, []);

  return (
    <LinearGradient
      colors={['#E6E6FA', '#ffffff']}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>How are you feeling today?</Text>

        {/* Mood Emojis */}
        <View style={styles.emojiRow}>
          {emojis.map((mood) => (
            <TouchableOpacity
              key={mood.label}
              style={[
                styles.emojiButton,
                selectedMood === mood.emoji && styles.selectedEmoji,
              ]}
              onPress={() => setSelectedMood(mood.emoji)}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={styles.emojiLabel}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Journal Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>📝 Quick Entry</Text>
          <TextInput
            style={styles.textInput}
            placeholder="What's up! Wanna write about your mood today?"
            placeholderTextColor="#999"
            multiline
            numberOfLines={5}
            value={entry}
            onChangeText={setEntry}
          />
          {selectedMood && (
            <Text style={styles.aiNote}>💡 {suggestions[selectedMood]}</Text>
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          {/* <Icon name="content-save-outline" size={20} color="#fff" /> */}
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>

        <View style={styles.historyContainer}>
  <Text style={styles.historyTitle}>🗓️ Past Mood Entries</Text>

  {moodHistory.length === 0 ? (
    <Text style={styles.noEntries}>No entries yet</Text>
  ) : (
    moodHistory.map((entry, index) => (
      <View key={index} style={styles.historyCard}>
        <Text style={styles.historyMood}>{entry.mood}</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.historyDate}>
            {new Date(entry.date).toLocaleDateString()}
          </Text>
          <Text style={styles.historyNote}>{entry.note}</Text>
        </View>
      </View>
    ))
  )}
</View>
      </ScrollView>
    </LinearGradient>
  );
};

export default MoodTracker;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    //backgroundColor: '#E6E6FA',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  emojiRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  emojiButton: {
    alignItems: 'center',
    padding: 8,
  },
  selectedEmoji: {
    backgroundColor: '#d1f0ff',
    borderRadius: 12,
  },
  emoji: {
    fontSize: 32,
  },
  emojiLabel: {
    marginTop: 4,
    fontSize: 12,
    color: '#555',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 3,
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  textInput: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    textAlignVertical: 'top',
    padding: 10,
    color: '#333',
  },
  aiNote: {
    marginTop: 8,
    fontSize: 14,
    color: '#444',
    fontStyle: 'italic',
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#2c9fae',
    padding: 14,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
  marginTop: 24,
},
historyTitle: {
  fontSize: 18,
  fontWeight: '600',
  marginBottom: 12,
},
noEntries: {
  fontStyle: 'italic',
  color: '#888',
},
historyCard: {
  flexDirection: 'row',
  backgroundColor: '#fff',
  borderRadius: 10,
  padding: 12,
  marginBottom: 12,
  elevation: 2,
},
historyMood: {
  fontSize: 28,
  marginRight: 12,
},
historyDate: {
  fontSize: 12,
  color: '#666',
},
historyNote: {
  fontSize: 14,
  color: '#333',
},

});
