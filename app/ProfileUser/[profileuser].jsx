import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ProfileUserScreen from "../../components/ProfileUser/profileuser";
export default function Profileuser() {
    return (
        <View style={styles.container}>
            <ProfileUserScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
