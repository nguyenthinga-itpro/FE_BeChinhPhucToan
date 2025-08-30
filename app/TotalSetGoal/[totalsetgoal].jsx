import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import TotalSetGoalScreen from "../../components/TotalSetGoal/totalsetgoal";

export default function SetGoal() {
  return (
    <View style={styles.container}>
      <TotalSetGoalScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
