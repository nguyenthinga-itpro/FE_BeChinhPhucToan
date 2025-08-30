import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import InputTestScreen from "../../components/InputTest/inputtest";

export default function InputTest() {
    return (
        <View style={styles.container}>
            <InputTestScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
