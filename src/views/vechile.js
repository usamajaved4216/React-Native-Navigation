import { View, Text, Button } from "react-native";

function Vechile({ route }) {
    const { pickup, destination } = route.params
    console.log("🚀 ~ Vechile ~ pickup:", pickup)

    const bikeCharge = {
        bike: 100,
        Auto: 150,
        Car: 300,
    }

    const calculatedistance = (vechile) => {
        const { latitude: pickuplat, longitude: pickuplong } = pickup.geocodes.main
        const { latitude: destinationlat, longitude: destinationlong } = destination.geocodes.main
        const distance = calcCrow(pickuplat, pickuplong, destinationlat, destinationlong)
        const fare = bikeCharge[vechile] * distance
        alert('RS' + fare.toFixed(2))
    }

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371;
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    return (
        <>
            <View>
                <Text>
                    {pickup.name}, {pickup.location.address}
                </Text>
                <Button title="Bike" onPress={() => calculatedistance('bike')} />
                <Button title="Auto" onPress={() => calculatedistance('Auto')} />
                <Button title="Car" onPress={() => calculatedistance('Car')} />
            </View>
        </>
    );
}

export default Vechile;