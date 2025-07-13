import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    FlatList,
    Alert,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface JournalEntry {
    id: string;
    content: string;
    date: string;
}

const JournalingPage = () => {
    const [entry, setEntry] = useState('');
    const [entries, setEntries] = useState<JournalEntry[]>([]);

    const handleSave = () => {
        if (!entry.trim()) {
            Alert.alert('Please write something before saving.');
            return;
        }

        const newEntry: JournalEntry = {
            id: Date.now().toString(),
            content: entry,
            date: new Date().toLocaleString(),
        };

        setEntries([newEntry, ...entries]);
        setEntry('');
        Alert.alert('Journal Saved ✅');
    };

    return (
        <LinearGradient colors={['#fff', '#f9f1ff']} style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>🖊️ Journal Your Thoughts</Text>

                {/* Writing Area */}
                <View style={styles.card}>
                    <Text style={styles.label}>New Entry</Text>
                    <TextInput
                        style={styles.input}
                        multiline
                        numberOfLines={5}
                        placeholder="Write about your day, thoughts, or emotions..."
                        value={entry}
                        onChangeText={setEntry}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                        <Text style={styles.saveText}>Save Entry</Text>
                    </TouchableOpacity>
                </View>

                {/* Past Entries */}
                <Text style={styles.subtitle}>📚 Past Entries</Text>
                {entries.length === 0 ? (
                    <Text style={styles.noEntries}>No journal entries yet.</Text>
                ) : (
                    <FlatList
                        data={entries}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.pastEntry}>
                                <Text style={styles.entryDate}>{item.date}</Text>
                                <Text style={styles.entryContent}>{item.content}</Text>
                            </View>
                        )}
                    />
                )}
            </ScrollView>
        </LinearGradient>
    );
};

export default JournalingPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 16,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        elevation: 2,
    },
    input: {
        height: 120,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        textAlignVertical: 'top',
        padding: 10,
        fontSize: 15,
        color: '#333',
        marginBottom: 12,
    },
    saveButton: {
        flexDirection: 'row',
        backgroundColor: '#7b4eb7',
        padding: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    saveText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
    },
    noEntries: {
        textAlign: 'center',
        color: '#888',
        fontStyle: 'italic',
        marginTop: 10,
    },
    pastEntry: {
        backgroundColor: '#fdfbff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 1,
    },
    entryDate: {
        fontSize: 12,
        color: '#666',
        marginBottom: 6,
    },
    entryContent: {
        fontSize: 15,
        color: '#333',
    },
});
