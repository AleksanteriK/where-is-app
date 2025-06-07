import { Text, View, StyleSheet, Image} from 'react-native'

function ViewOneItem ({ route }) {
    const { selectedItem } = route.params

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'lightgray',
            alignItems: 'center',
            justifyContent: 'center'
        },
        title: {
            fontSize: 30,
            color: 'black',
        },
        description : {
            fontSize: 18
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{selectedItem.title}</Text>
            <View style={{ height: 20 }} />
            <Text style={styles.description}>{selectedItem.description}</Text>
            <View style={{ height: 10 }} />
            {selectedItem.image && (
                <Image
                    source={{ uri: selectedItem.image }}
                    style={{ width: 300, height: 300 }}
                />
            )}
            <View style={{ height: 10 }} />
            {selectedItem.location && (
                <View>
                    <Text style={styles.description}>Latitude: {selectedItem.location.latitude}</Text>
                    <Text style={styles.description}>Longitude: {selectedItem.location.longitude}</Text>
                </View>
            )}
        </View>
    )
}

export default ViewOneItem
