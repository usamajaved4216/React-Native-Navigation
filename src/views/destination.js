import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import * as Location from 'expo-location';

function Destination({ route, navigation }) {
    const { pickup } = route.params
    const [location, setLocation] = useState(null);
    const [places, setPlaces] = useState([]);
    const [destination, setDestination] = useState('');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        (async () => {
            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 1,
            }, (location) => {
                setLocation(location);
                console.log("🚀 ~ location:", location)
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
        setDestination(item);
        setSearchText(''); // Clear search text
        setPlaces([]); // Clear places
    }

    const clearDestination = () => {
        setDestination('');
    }

    if (!location) {
        return <Text style={styles.loadingText}>Loading...</Text>
      }

    return (
        <View>
            <TextInput
                style={styles.input}
                placeholder='Search'
                value={searchText}
                onChangeText={searchLocation}
            />
            <View>
                <Text>{pickup.name},{pickup.location.address}</Text>
            </View>
            {!destination && <View>
                {places.map((item, index) => (
                    <TouchableOpacity key={index} onPress={() => onPlaceSelect(item)} style={styles.itemContainer}>
                        <Text style={styles.itemText}>{item.name},{item.location.address}</Text>
                    </TouchableOpacity>
                ))}
            </View>}
            {destination && (
                <View  style={styles.selectedLocationContainer}>
                    <Text>Your selected location </Text>
                    <Text>{destination.name}, {destination.location.address}</Text>
                    <TouchableOpacity onPress={clearDestination}>
                        <Text style={styles.clearText}>Clear</Text>
                    </TouchableOpacity>
                </View>
            )}
            <MapView
                showsMyLocationButton
                showsUserLocation
                style={styles.map}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0001,
                    longitudeDelta: 0.0001,
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
                style={styles.button}
                disabled={!destination}
                onPress={() => navigation.navigate('Vehicle', { pickup, destination })}
            >
                <Text style={styles.buttonText}>Select vehicle</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Destination;

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '50%',
        zIndex: 0
    },
    input: {
        width: '90%',
        height: 50,
        backgroundColor: 'rgb(179, 178, 178)',
        borderRadius: 8,
        alignSelf: 'center',
        paddingLeft: 10,
        marginTop: 20
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
    itemContainer: {
        backgroundColor: '#f0f0f0',
        padding: 5,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: '#ccc',
    },
    itemText: {
        fontSize: 14,
    },
    selectedLocationContainer: {
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
        // backgroundColor: 'lightgray',
        borderRadius: 8,
      },
    clearText: {
        color: 'red',
        marginTop: 5,
        alignSelf: 'flex-end',
    },
    loadingText: {
        fontSize: 20,
        fontWeight: 'bold',
      },
});
