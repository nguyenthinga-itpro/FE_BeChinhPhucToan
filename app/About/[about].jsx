import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import AboutScreen from "../../components/About/about";

export default function Information() {
  return (
    <View style={styles.container}>
      <AboutScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
