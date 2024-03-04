import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity, ScrollView } from "react-native";
import * as Location from 'expo-location';

function PickUp({ navigation }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [places, setPlaces] = useState([]);
  const [pickup, setPickup] = useState('');
  const [searchText, setSearchText] = useState('');

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
      }, (location) => {
        setLocation(location);
        console.log("🚀 ~ Location:", location)
      });

    })();
  }, []);

  const searchLocation = (text) => {
    setSearchText(text); // Update search text state
    if (text.trim() === '') {
      setPlaces([]);
      return;
    }

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'fsq3WHMGprK/+av7EmgdCAvnn1Qwm112bsOx/pmYmcyLiyg='
      }
    };

    const { latitude, longitude } = location.coords;

    fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}&radius=3000`, options)
      .then(response => response.json())
      .then(response => {
        console.log(response)
        setPlaces(response.results)
      })
      .catch(err => console.error(err));
  }

  const onPlaceSelect = (item) => {
    setPickup(item);
    setSearchText(''); // Clear search text
    setPlaces([]); // Clear places
  }

  const clearPickup = () => {
    setPickup('');
    setSearchText('');
    setPlaces([]);
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  if (!location) {
    return <Text style={styles.loadingText}>Loading...</Text>
  }

  return (
    <>
      {location && (
        <ScrollView style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Search'
            value={searchText}
            onChangeText={searchLocation}
          />
          {!pickup && <View>
            {places.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
                <Text>{item.name}, {item.location.address}</Text>
              </TouchableOpacity>
            ))}
          </View>}
          {pickup && (
            <View style={styles.selectedLocationContainer}>
              <Text>Your selected location:</Text>
              <Text>{pickup.name}, {pickup.location.address}</Text>
              <TouchableOpacity onPress={clearPickup}>
                <Text style={styles.clearPickupText}>Clear</Text>
              </TouchableOpacity>
            </View>
          )}
          <MapView
            showsMyLocationButton
            showsUserLocation
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
              latitudeDelta: 0.0010,
              longitudeDelta: 0.0010,
            }}>
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title={"My location"}
              description={"This is my marker description"} />
          </MapView>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: pickup ? 'green' : 'gray' }]}
            disabled={!pickup}
            onPress={() => navigation.navigate('Destination', { pickup })}>
            <Text style={styles.buttonText}>Destination</Text>
          </TouchableOpacity>
        </ScrollView>
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
    height: 300,
    marginTop: 10,
  },
  input: {
    width: '90%',
    height: 50,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignSelf: 'center',
    paddingLeft: 10,
    marginTop: 20,
  },
  button: {
    width: 300,
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  selectedLocationContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: 'lightgray',
    borderRadius: 8,
  },
  clearPickupText: {
    color: 'red',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  loadingText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});
