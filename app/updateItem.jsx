import { Text, View, TextInput, Button, Image, StyleSheet } from 'react-native'
import { useState } from 'react'
import * as Location from 'expo-location'
import * as ImagePicker from 'expo-image-picker'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
    image: { 
        width: 200, 
        height: 200, 
        marginBottom: 10 
    },
    error: { 
        color: 'red', 
        marginBottom: 10 
    },
})

const UpdateItems = ({ route }) => {
    const { itemToBeUpdated, index } = route.params
    const [title, setTitle] = useState(itemToBeUpdated.title)
    const [description, setDescription] = useState(itemToBeUpdated.description)
    const [image, setImage] = useState(itemToBeUpdated.image)
    const [location, setLocation] = useState(itemToBeUpdated.location)
    const [errorMsg, setErrorMsg] = useState('')
    const [showSuccess, setShowSuccess] = useState(false)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
    })

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

    const updateItem = async (updatedItem) => {
        try {
            const existing = await AsyncStorage.getItem('items')
            const itemscollection = existing ? JSON.parse(existing) : []

            if (index >= 0 && index < itemscollection.length) {
                itemscollection[index] = updatedItem
            } 
            
            else {
                setErrorMsg('An error occurred when trying to locate the item from records')
                return
            }

            await AsyncStorage.setItem('items', JSON.stringify(itemscollection))
        } 
        
        catch (e) {
            setErrorMsg('Failed to update item.')
        }

        finally {
            setShowSuccess(true)
            setTimeout(() => setShowSuccess(false), 3000)
        }
    }

    const handleSubmit = async () => {
        if (!title || !description) {
            setErrorMsg('Fill name and description')
            return
        }

        setErrorMsg('')

        const updatedItem = {
        ...itemToBeUpdated,
        title,
        description,
        image,
        location,
        }

        await updateItem(updatedItem)
    }

    const getLocation = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync()

        if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied')
            return;
        }

        let loc = await Location.getCurrentPositionAsync({})
        setLocation(loc.coords)
    }

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
            <Button title="Update" onPress={handleSubmit} />
            <View style={{ height: 20 }} />
            {errorMsg ? <Text style={styles.error}>{errorMsg}</Text> : null}
            {showSuccess && <Text style={{ color: 'green', marginBottom: 10 }}>Item updated!</Text>}
        </View>
    )
}

export default UpdateItems