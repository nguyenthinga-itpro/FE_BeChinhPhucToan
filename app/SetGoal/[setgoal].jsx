import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SetGoalScreen from "../../components/SetGoal/setgoal";

export default function SetGoal() {
    return (
        <View style={styles.container}>
            <SetGoalScreen />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
