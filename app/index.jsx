import { StyleSheet, Text, View } from 'react-native'
import { Link } from 'expo-router'
import { Pressable} from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    link: {
        minWidth: 100,
        minHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        borderRadius: 8,
    },
})

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Where Is App</Text>
            <Link style={styles.link} href="/showItemScreen" asChild>
                <Pressable style={({ pressed }) => [
                    styles.link,
                    { backgroundColor: pressed ? '#555' : 'grey' }
                ]}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Show Items</Text>
                </Pressable>
            </Link>
                <View style={{ height: 20 }} />
            <Link style={styles.link} href="/addItems" asChild>
                <Pressable style={({ pressed }) => [
                    styles.link,
                    { backgroundColor: pressed ? '#555' : 'grey' }
                ]}>
                    <Text style={{ color: 'white', fontSize: 15 }}>Add New</Text>
                </Pressable>
            </Link>
        </View>
    )
}

export default App