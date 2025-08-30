import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import MissionScreen from "../../components/Mission/mission";

export default function Register() {
  return (
    <View style={styles.container}>
      <MissionScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
