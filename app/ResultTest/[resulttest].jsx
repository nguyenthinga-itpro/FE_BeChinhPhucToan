import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ResultTestScreen from "../../components/ResultTest/resulttest";

export default function ResultTest() {
    return (
        <View style={styles.container}>
            <ResultTestScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
