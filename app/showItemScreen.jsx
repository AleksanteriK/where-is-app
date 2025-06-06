import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import Header from './header'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Image } from 'react-native'

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
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
})

const ShowItemScreen = () => {
    const [items, setItems] = useState([])

    useEffect(() => {
        const loadItems = async () => {
            const stored = await AsyncStorage.getItem('items')
            setItems(stored ? JSON.parse(stored) : [])
        }
        loadItems()
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <Text style={styles.text}>Items:</Text>
            <FlatList
                data={items}
                keyExtractor={(_, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text style={styles.text}>Name: {item.title}</Text>
                        <Text>Description: {item.description}</Text>
                        {item.image && (
                            <Image
                                source={{ uri: item.image }}
                                style={{ width: 100, height: 100 }}
                            />
                        )}
                        {item.location && (
                            <Text>Location (coordinates): {item.location.latitude} (latitude),
                             {item.location.longitude} (longitude)</Text>
                        )}
                    </View>
                )}
                ListEmptyComponent={<Text>No items found.</Text>}
            />
        </View>
    )
}

export default ShowItemScreen