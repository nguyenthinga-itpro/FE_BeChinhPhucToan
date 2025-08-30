import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import PlayGameScreen from "../../components/PlayGameTropical/playgametropical";

export default function Login() {
  return (
    <View style={styles.container}>
      <PlayGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
