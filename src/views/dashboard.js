import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

function Dashboard({ navigation }) {
    return (
        <>
            <View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('Pickup')}
                >
                    <Text style={styles.buttonText}>Pickup</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.mainlogo}>
                <Image style={styles.logo} source={require("../../assets/Careem.logo.png")} />
            </View>
        </>
    );
}

export default Dashboard;
const styles = StyleSheet.create({
    button: {
        width: 300,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
        alignSelf: 'center',
        marginTop:10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    mainlogo:{
        marginTop:10
    },
    logo: {
        width: '100%'
    }

})