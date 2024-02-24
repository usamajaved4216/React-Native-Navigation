import { StyleSheet, View } from 'react-native';
import { AppNavigator,  MyDrawer,  WhatsappApp } from './src/config/navigation';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';

export default function App() {
  return (
    <>
      <AppNavigator>
        <View style={styles.container}></View>
      </AppNavigator>

      <NavigationContainer>
        <WhatsappApp />
      </NavigationContainer>

      <NavigationContainer>
        <MyDrawer/>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
