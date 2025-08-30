import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LevelGameScreen from "../../components/LevelGame/levelgame";

export default function Login() {
  return (
    <View style={styles.container}>
      <LevelGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
