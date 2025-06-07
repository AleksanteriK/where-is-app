import { StyleSheet, Text, View, Pressable } from 'react-native'

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
        marginBottom: 10,
    },
})

function Home ({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Where Is App</Text>
            <Pressable
                style={({ pressed }) => [
                    styles.link,
                    { backgroundColor: pressed ? '#555' : 'grey' }
                ]}
                onPress={() => navigation.navigate('ShowItemScreen')}
            >
            <Text style={{ color: 'white', fontSize: 15 }}>Show Items</Text>
            </Pressable>
            <Pressable
                style={({ pressed }) => [
                    styles.link,
                    { backgroundColor: pressed ? '#555' : 'grey' }
                ]}
                onPress={() => navigation.navigate('AddItems')}
            >
            <Text style={{ color: 'white', fontSize: 15 }}>Add New</Text>
            </Pressable>
        </View>
    )
}

export default Home