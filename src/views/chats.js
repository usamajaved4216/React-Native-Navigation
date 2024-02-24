import { View, Text, Button, TouchableOpacity } from "react-native";

function Chats({ navigation }) {
    return (
        <>
            <View>
                <Button
                    title="Press me"
                    onPress={() =>navigation.navigate('Updates')}
                />
                </View>
        </>
    )
};

export default Chats;

