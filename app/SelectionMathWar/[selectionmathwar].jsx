import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SelectionMathWarScreen from "../../components/SelectionMathWar/selectionmathwar";

export default function SelectionMathWar() {
    return (
        <View style={styles.container}>
            <SelectionMathWarScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
