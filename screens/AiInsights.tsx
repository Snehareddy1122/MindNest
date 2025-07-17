import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { OPENROUTER_API_KEY } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Role = 'user' | 'assistant';

interface Message {
  role: Role;
  content: string;
}

interface MoodEntry {
  date: string;
  mood: string | null;
  note: string;
};

interface JournalEntry {
  id: string;
  content: string;
  date: string;
}

const ChatScreen = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [JournalHistory, setJournalHistory] = useState<JournalEntry[]>([]);

  const API_URL = 'https://openrouter.ai/api/v1/chat/completions';
  const MODEL_NAME = 'tngtech/deepseek-r1t2-chimera:free';

  useEffect(() => {
    const fetchHistory = async () => {
      const MoodHistorydata = await AsyncStorage.getItem('moodEntries');
      const JournalHistoryData = await AsyncStorage.getItem('journalEntries')
      if (MoodHistorydata) setMoodHistory(JSON.parse(MoodHistorydata));
      if (JournalHistoryData) setJournalHistory(JSON.parse(JournalHistoryData));
    };
    fetchHistory();
  }, []);

  const sendMessage = async (userInput: string): Promise<Message> => {
    setLoading(true);

    const moodSummary = moodHistory
      .map(entry => `• ${entry.date} — Mood: ${entry.mood ?? 'N/A'}, Note: ${entry.note}`)
      .join('\n');

    const journalSummary = JournalHistory
      .map(entry => `• ${entry.date} — "${entry.content}"`)
      .join('\n');

    const historyContext = `
      You have access to the user's mood and journaling history.
      Here are the latest mood entries:
      ${moodSummary || 'No mood entries yet.'}

      Here are recent journal entries:
      ${journalSummary || 'No journal entries yet.'}

      Use this context to respond empathetically and track user trends when asked about progress, emotional state, or how they’ve been doing lately.
      `;

    try {
      const res = await axios.post(
        API_URL,
        {
          model: MODEL_NAME,
          messages: [
            { role: 'system', content: 'You are a friendly mental health companion. Be empathetic, warm, and helpful.' },
            { role: 'system', content: historyContext },
            { role: 'user', content: userInput },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );
      const content = res.data.choices?.[0]?.message?.content ?? 'Something went wrong!';
      setLoading(false);
      return { role: 'assistant', content };
    } catch (e: any) {
      setLoading(false);
      return { role: 'assistant', content: e.message };
    }
  };
  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    const reply = await sendMessage(input);
    setMessages(prev => [...prev, reply]);
  };

  const renderItem = ({ item }: { item: Message }) => {
    const isUser = item.role === 'user';
    return (
      <View style={[styles.messageContainer, isUser ? styles.userAlign : styles.botAlign]}>
        <Text style={[styles.message, isUser ? styles.userMessage : styles.botMessage]}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.chatArea}
      />

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Thinking...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor={'black'}
        />
        <View style={{ marginTop: 8 }}>
          <Button title="Send" onPress={handleSend} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: '',
  },
  chatArea: {
    paddingBottom: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    alignItems: 'flex-start',
  },
  userAlign: {
    alignSelf: 'flex-end',
  },
  botAlign: {
    alignSelf: 'flex-start',
  },
  message: {
    maxWidth: '70%',
    padding: 10,
    borderRadius: 10,
    fontSize: 15,
  },
  userMessage: {
    backgroundColor: '#dcf8c6',
  },
  botMessage: {
    backgroundColor: '#e6ecf0',
  },
  inputContainer: {
    marginTop: 12,
  },
  input: {
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'beige',
  },
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    gap: 10,
  },
  loadingText: {
    fontStyle: 'italic',
    color: '#444',
  },
});

export default ChatScreen;