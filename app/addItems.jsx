import { Text, View } from 'react-native'
import { useState } from 'react'
import { TextInput, Button, Image, StyleSheet } from 'react-native'
import Header from './header'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
        color: '#333',
        backgroundColor: '#fff',
    },
    image: { width: 200, height: 200, marginBottom: 10 },
    error: { color: 'red', marginBottom: 10 },
});

const AddItems = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });

    if (!result.canceled) {
        setImage(result.assets[0].uri);
    }
    };

    const saveItem = async (item) => {
        try {
            const existing = await AsyncStorage.getItem('items');
            const itemscollection = existing ? JSON.parse(existing) : [];
            itemscollection.push(item);
            await AsyncStorage.setItem('items', JSON.stringify(itemscollection));
        } 
        
        catch (e) {
            setErrorMsg('Failed to save item.');
        }
    };

    const handleSubmit = async () => {
        if (!title || !description) {
            setErrorMsg('Fill name and description');
            return;
        }

        setErrorMsg('');

        const item = {
            title,
            description,
            image,
            location,
            createdAt: new Date().toISOString(),
        };

        await saveItem(item);
        setTitle('');
        setDescription('');
        setImage(null);
        setLocation(null);
    };

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
        }

        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc.coords);
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={title}
                onChangeText={setTitle}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <Button title="Pick an image" onPress={pickImage} />
            {image && <Image source={{ uri: image }} style={styles.image} />}
            <Button title="Get Location" onPress={getLocation} />
            {location && (
                <Text>
                    Location: {location.latitude}, {location.longitude}
                </Text>
            )}
            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
            <Button title="Save" onPress={handleSubmit} />
            <View style={{ height: 20 }} />
            <Header />
        </View>
    );
};

export default AddItems