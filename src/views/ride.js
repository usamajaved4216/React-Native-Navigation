import { View, Text, Button, TouchableOpacity } from "react-native";

function Ride({ navigation }) {
    return (
        <>
            <View>
                <Button
                    title="Press me"
                    onPress={() =>navigation.navigate('PickUp')}
                />
                </View>
        </>
    )
};

export default Ride;

