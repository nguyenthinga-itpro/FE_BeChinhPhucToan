import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ProgressDetailScreen from "../../components/ProgressDetail/progressdetail";
export default function ProgressDetail() {
    return (
        <View style={styles.container}>
            <ProgressDetailScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
