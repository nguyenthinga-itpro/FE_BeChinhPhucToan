import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LoadMathwarScreen from "../../components/MathWar/loadmathwar";

export default function LoadMathWar() {
    return (
        <View style={styles.container}>
            <LoadMathwarScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});