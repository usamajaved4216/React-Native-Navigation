import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const DonationScreen = () => {
    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Support a Cause</Text>
                </View>
                <View style={styles.donationCard}>
                    <Text style={styles.donationTitle}>Education for All</Text>
                    <Text style={styles.donationDescription}>Help us provide education to underprivileged children in remote areas.</Text>
                    <TouchableOpacity style={styles.donateButton}>
                        <Text style={styles.donateButtonText}>Donate Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.donationCard}>
                    <Text style={styles.donationTitle}>Feed the Hungry</Text>
                    <Text style={styles.donationDescription}>Contribute towards providing meals to those in need.</Text>
                    <TouchableOpacity style={styles.donateButton}>
                        <Text style={styles.donateButtonText}>Donate Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.donationCard}>
                    <Text style={styles.donationTitle}>Shelter for Homeless</Text>
                    <Text style={styles.donationDescription}>Support our efforts to provide shelter and basic amenities to homeless individuals.</Text>
                    <TouchableOpacity style={styles.donateButton}>
                        <Text style={styles.donateButtonText}>Donate Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.donationCard}>
                    <Text style={styles.donationTitle}>Medical Assistance</Text>
                    <Text style={styles.donationDescription}>Help us in providing medical aid and treatment to the sick and injured.</Text>
                    <TouchableOpacity style={styles.donateButton}>
                        <Text style={styles.donateButtonText}>Donate Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Thank you for your generosity!</Text>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingTop: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    donationCard: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 20,
        marginBottom: 20,
    },
    donationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    donationDescription: {
        fontSize: 16,
        marginBottom: 15,
    },
    donateButton: {
        backgroundColor: 'green',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignSelf: 'flex-end',
    },
    donateButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 18,
        fontStyle: 'italic',
    },
});

export default DonationScreen;
