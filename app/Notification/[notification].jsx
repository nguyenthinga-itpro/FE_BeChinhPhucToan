import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import NotificationScreen from "../../components/Notification/notification";
export default function Notification() {
    return (
        <View style={styles.container}>
            <NotificationScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
