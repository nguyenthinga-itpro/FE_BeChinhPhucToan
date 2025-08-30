import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import CommentResultTestScreen from "../../components/CommentResultTest/commentresulttest";

export default function CommentResultTest() {
    return (
        <View style={styles.container}>
            <CommentResultTestScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
