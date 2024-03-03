import React, { useEffect, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, Text, StyleSheet, Button, TextInput, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';


function Destination({ navigation, route}) {
    const {pickup}= route.params
    const [location, setLocation] = useState(null);
    const [places, setPlaces] = useState([]);
    const [destination, setDestination] = useState('');

    
  useEffect(() => {
    (async () => {

     

      Location.watchPositionAsync({
        accuracy: 6,
        distanceInterval: 1,
      }, (Location) => {
        setLocation(Location);
        console.log("🚀 ~ Location:", Location)
      });

    })();
  }, []);

  const searchLocation = (text) => {
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
    setDestination(item);
  }


  if (!location) {
    return<Text>Loading...</Text>
  }
 
    return(
        <>
        <View>
            <View><Text>{pickup.name}, {pickup.location.address}</Text></View>
            
            <TextInput placeholder='Search' onChangeText={searchLocation} />
          {!destination && <View>
            {places.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)}>
                  <Text>{item.name},{item.location.address}</Text>
                </TouchableOpacity>
              )
            })}
          </View>}

          {destination && <View>
            <Text>Your selected location </Text>
            <Text>{destination.name}, {destination.location.address}</Text>
          </View>
          }

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
            <Button
            title="Vechile"
            disabled = {!destination}
            onPress={() => navigation.navigate('Vechile',{pickup,destination})}
          />
         
        </View>
        </>
    );
}

export default Destination;

const styles = StyleSheet.create({
    container: {
    flex: 1,
},
  map: {
    width: '100%',
  height: '70%',
  zIndex: 0
},
});