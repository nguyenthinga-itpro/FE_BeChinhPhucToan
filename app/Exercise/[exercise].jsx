import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ExerciseScreen from "../../components/Exercise/exercise";

export default function Exercise() {
  return (
    <View style={styles.container}>
      <ExerciseScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
