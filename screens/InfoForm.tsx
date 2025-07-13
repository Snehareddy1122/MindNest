import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

const IntroForm = () => {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [ageGroup, setAgeGroup] = useState('');

    const navigation = useNavigation<any>();

    const handleSubmit = async () => {
        if (!name || !ageGroup || !gender) {
            Alert.alert('Please fill in all required fields.');
            return;
        }

        const profile = { name, ageGroup, gender };
        await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
        navigation.replace('MainApp'); // navigate to Home after saving
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Welcome to MindNest 🧠</Text>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Name <Text style={styles.asterisk}>*</Text></Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Gender <Text style={styles.asterisk}>*</Text>
                </Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={gender}
                        onValueChange={(itemValue) => setGender(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#000"
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Transgender" value="transgender" />
                        <Picker.Item label="Prefer not to say" value="prefer_not_to_say" />
                    </Picker>
                </View>
            </View>

            <View style={styles.formGroup}>
                <Text style={styles.label}>Age Group <Text style={styles.asterisk}>*</Text></Text>
                <View style={styles.pickerWrapper}>
                    <Picker
                        selectedValue={ageGroup}
                        onValueChange={(itemValue) => setAgeGroup(itemValue)}
                        style={styles.picker}
                        dropdownIconColor="#000"

                    >
                        <Picker.Item label="Select Age Group" value="" />
                        <Picker.Item label="0-12" value="0-12" />
                        <Picker.Item label="13-18" value="13-18" />
                        <Picker.Item label="19-25" value="19-25" />
                        <Picker.Item label="26-35" value="26-35" />
                        <Picker.Item label="36-50" value="36-50" />
                        <Picker.Item label="51+" value="51+" />
                    </Picker>
                </View>
            </View>


            <Button title="Continue" onPress={handleSubmit} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 24, justifyContent: 'center', backgroundColor: 'beige' },
    heading: { fontSize: 22, fontWeight: '600', marginBottom: 20, textAlign: 'center', fontStyle: 'italic' },
    formGroup: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    asterisk: {
        color: 'red',
        fontWeight: 'bold',
    },
    pickerWrapper: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    picker: {
        height: 60,
        color: '#333',
    }

});

export default IntroForm;
