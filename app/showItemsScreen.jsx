import { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList, Button, Alert, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
})

const ShowItemScreen = ({ navigation }) => {
    const [items, setItems] = useState([])

    const handleUpdate = async (index, updatedItem) => {
        const updatedItems = items.map((item, idx) => (idx === index ? updatedItem : item))
        setItems(updatedItems)
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems))
    }

    const handleDelete = async (index) => {
        const updatedItems = items.filter((_, idx) => idx !== index)
        setItems(updatedItems)
        await AsyncStorage.setItem('items', JSON.stringify(updatedItems))
    }

    const confirmDelete = (index) => {
        Alert.alert(
            "Delete Item",
            "Are you sure you want to delete this item?",
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive", onPress: () => handleDelete(index) }
            ]
        )
    }

    useEffect(() => {
        const loadItems = async () => {
            const stored = await AsyncStorage.getItem('items')
            setItems(stored ? JSON.parse(stored) : [])
        }
        loadItems()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.text}></Text>
            <FlatList
                data={items}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item, index }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>{item.title}</Text>
                        <Text>Description: {item.description}</Text>
                        <View style={{ height: 10 }} />
                        {item.image && (
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 100, height: 100 }}
                            />
                        )}
                        <View style={{ height: 5 }} />
                        {item.location && (
                            <Text>{item.location.latitude} (latitude), {item.location.longitude} (longitude)</Text>
                        )}
                        <View style={{ height: 10 }} />
                        <Text>Created At: {new Date(item.createdAt).toLocaleString()}</Text>
                        <View style={{ height: 10 }} />
                        <Button
                            title="Update"
                            color="green"
                            onPress={() => navigation.navigate('UpdateItems', {itemToBeUpdated: item, index})}
                        />
                        <Button
                            title="View"
                            color="blue"
                            onPress={() => navigation.navigate('ViewOneItem', {selectedItem: item})}
                        />
                        <Button
                            title="Delete"
                            color="red"
                            onPress={() => confirmDelete(index)}
                        />
                    </View>
                )}
                ListEmptyComponent={<Text>No items found.</Text>}
            />
        </View>
    )
}

export default ShowItemScreen