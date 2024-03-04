import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView
} from "react-native";

function Dashboard({ navigation }) {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Pickup')}
            >
                <Text style={styles.buttonText}>Pickup</Text>
            </TouchableOpacity>


            <Image
                source={{ uri: "https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2fe395112571921.60174372ca4fa.gif" }}
                style={styles.gif}
                resizeMode="contain"
            />

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Top Offer</Text>
                <View style={styles.adsContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Donation')} >
                        <Image
                            source={require('../../assets/Donation.jpg')}
                            style={styles.ads}
                        />
                    </TouchableOpacity>
                    <Image
                        source={require('../../assets/ads2.jpg')}
                        style={styles.ads}
                    />
                </View>
            </View>

            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Get More With Careem</Text>
                <View style={styles.adsContainer}>
                    <Image
                        source={require('../../assets/ads3.jpg')}
                        style={styles.ads}
                    />
                    <Image
                        source={require('../../assets/ads4.jpg')}
                        style={styles.ads}
                    />
                </View>
            </View>

            <View style={{ height: 100 }} />
        </ScrollView>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 10,
    },
    button: {
        width: 300,
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10
    },
    buttonText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    gif: {
        width: "100%",
        height: 200,
    },
    sectionContainer: {
        marginTop: 20,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 10,
        // textAlign: 'center',
        // fontFamily: 'Arial',
    },
    adsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    ads: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
    },
});
