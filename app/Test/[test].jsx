import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import TestScreen from "../../components/Test/test"

export default function Register() {
  return (
    <View style={styles.container}>
      <TestScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
