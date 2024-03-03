import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ride from '../views/ride';
import PickUp from '../views/pickup';
import Destination from '../views/destination';
import Vechile from '../views/vechile';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
  return (
    <NavigationContainer >
      <Stack.Navigator >
        <Stack.Screen name="Ride" component={Ride} />
        <Stack.Screen name="PickUp" component={PickUp} />
        <Stack.Screen name="Destination" component={Destination} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

function WhatsappApp() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Ride" component={Ride} />
      <Tab.Screen name="PickUp" component={PickUp} />
      <Tab.Screen name="Destination" component={Destination} />

    </Tab.Navigator>
  );
}

function MyDrawer() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Ride" component={Ride} />
      <Drawer.Screen name="PickUp" component={PickUp} />
      <Drawer.Screen name="Destination" component={Destination} />
      <Drawer.Screen name="Vechile" component={Vechile} />
    </Drawer.Navigator>
  );
}

export {
  AppNavigator,
  WhatsappApp,
  MyDrawer
};