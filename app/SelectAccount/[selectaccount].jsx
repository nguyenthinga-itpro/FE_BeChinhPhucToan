import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SelectAcocuntScreen from "../../components/SelectAccount/selectaccount";

export default function SelectAccount() {
    return (
        <View style={styles.container}>
            <SelectAcocuntScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
