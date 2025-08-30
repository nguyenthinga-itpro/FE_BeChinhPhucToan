import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import GameScreen from "../../components/Game/game";

export default function Game() {
  return (
    <View style={styles.container}>
      <GameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
