import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Image } from "react-native";
import { useRouter } from "expo-router";
import * as ScreenOrientation from 'expo-screen-orientation'; 
import witch from "../../assets/images/witch.png"; // Not used in this code, but kept in case you need it
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "../../constants/Fonts";

export default function LoadMathWar() {
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    // Simulate loading time (e.g., 3 seconds) and lock screen orientation to landscape
    useEffect(() => {
        // Lock screen to landscape mode when the component mounts
        ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        const timer = setTimeout(() => {
            setIsLoading(false);
            // Navigate to another screen after loading is complete
            router.push("/SelectionMathWar/selectionmathwar");
        }, 3000); // Simulate 3 seconds loading time

        return () => {
            clearTimeout(timer);
            // Optionally unlock orientation on component unmount
            ScreenOrientation.unlockAsync();
        };
    }, [router]);

    return (
        <LinearGradient colors={["#F761DF", "#B526E4"]} style={styles.appContainer}>
            <View style={styles.gameContent}>
                <Text style={styles.gameText}>Đại Chiến Toán Học</Text>
            </View>
            <View style={styles.loadingContainer}>
                <Image source={witch} style={styles.character} />

                <ActivityIndicator size="large" color="#3498db" />
            </View>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    character: {
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    loadingTitle: {
        fontSize: 36,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
    },
    gameContent: {
        justifyContent: "center",
        alignItems: "center",
    },
    gameText: {
        fontSize: 24,
        color: "#333",
        fontFamily: Fonts.NUNITO_BLACK,
    },
});
