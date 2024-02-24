import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Chats from '../views/chats'
import Updates from '../views/updates';
import Calls from '../views/calls';

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();
const Drawer = createDrawerNavigator();

function AppNavigator() {
    return (
        <NavigationContainer >
            <Stack.Navigator >
                <Stack.Screen name="Chats" component={Chats} />
                <Stack.Screen name="Updates" component={Updates} />
                <Stack.Screen name="Calls" component={Calls} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function WhatsappApp() {
    return (
      <Tab.Navigator>
        <Tab.Screen name="Chats" component={Chats} />
        <Tab.Screen name="Updates" component={Updates} />
        <Tab.Screen name="Calls" component={Calls} />

      </Tab.Navigator>
    );
  }

  function MyDrawer() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Chats" component={Chats} />
        <Drawer.Screen name="Updates" component={Updates} />
        <Drawer.Screen name="Calls" component={Calls} />
      </Drawer.Navigator>
    );
  }

export {
    AppNavigator,
    WhatsappApp,
    MyDrawer
} 