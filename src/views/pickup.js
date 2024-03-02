import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, Button } from "react-native";
import * as Location from 'expo-location';

function PickUp({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);


  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync({
        accuracy: 6,
        distanceInterval: 1,
      }, (newLocation) => {
        setLocation(newLocation);
        console.log("🚀 ~ newLocation:", newLocation)
      });

    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <>
        {location && (
      <View style={styles.container}>
        <Button
          title="Press me"
          onPress={() => navigation.navigate('Destination')}
        />
        <Text>
          Pickup
        </Text>
        <MapView style={styles.map}
        showsMyLocationButton
        showsUserLocation
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.0001,
            longitudeDelta: 0.0001,
          }}
        >
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title={"Your Location"}
            description={"Usama Sarkar House "}
          />
        </MapView>
      </View>

      )}
    </>
  );
}

export default PickUp;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});