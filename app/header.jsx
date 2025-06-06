import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { Pressable, Text } from 'react-native'

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
    },
    homeLink: {
        minWidth: 100,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 8,
    },
})

const Header = () => {
    return (
    <View style={styles.header}>
        <Link style={styles.homeLink} href="/" asChild>
            <Pressable style={({ pressed }) => [
                styles.homeLink,
                { backgroundColor: pressed ? '#555' : 'grey' }
            ]}>
                <Text style={{ color: 'white', fontSize: 20 }}>Home</Text>
            </Pressable>
        </Link>
    </View>
    )
}

export default Header