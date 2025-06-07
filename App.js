import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './app/index'
import AddItems from './app/addItems'
import ShowItemScreen from './app/showItemsScreen'
import ViewOneItem from './app/viewOneItem'
import UpdateItems from './app/updateItem'

const Stack = createStackNavigator();

export default function App() {
	return (
	<NavigationContainer>
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={Home}/>
			<Stack.Screen name="ShowItemScreen" component={ShowItemScreen} options={{ title: "List of Items"}}/>
			<Stack.Screen name="UpdateItems" component={UpdateItems} options={{ title: "Update existing"}}/>
			<Stack.Screen name="AddItems" component={AddItems} options={{ title: "Add new Item"}}/>
			<Stack.Screen name="ViewOneItem" component={ViewOneItem} options={{ title: "View"}}/>
		</Stack.Navigator>
	</NavigationContainer>
	)
}