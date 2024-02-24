import { View, Text, Button } from "react-native";

function Updates({ navigation }) {
    return(
        <>
        <View>
            <Text>
                Status
            </Text>
            <Button
                    title="Press me"
                    onPress={() => navigation.navigate('Calls')}
                />
        </View>
        </>
    );
}

export default Updates;