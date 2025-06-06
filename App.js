import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './app/index';
import AddItems from './app/addItems';
import ShowItemScreen from './app/showItemScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="ShowItemScreen" component={ShowItemScreen} options={{ title: "List of Items"}}/>
        <Stack.Screen name="AddItems" component={AddItems} options={{ title: "Add new Item"}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}