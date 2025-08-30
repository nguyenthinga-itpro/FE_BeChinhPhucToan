import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import MathwarScreen from "../../components/MathWar/mathwar";

export default function MathWar() {
    return (
        <View style={styles.container}>
            <MathwarScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
