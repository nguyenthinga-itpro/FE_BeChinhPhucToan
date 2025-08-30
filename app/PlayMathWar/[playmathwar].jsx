import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import PlayMathwarScreen from "../../components/MathWar/playmathwar";

export default function PlayMathWar() {
    return (
        <View style={styles.container}>
            <PlayMathwarScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});