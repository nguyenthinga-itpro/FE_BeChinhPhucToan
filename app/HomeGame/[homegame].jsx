import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import HomeGameScreen from "../../components/HomeGame/homegame";

export default function HomeGame() {
  return (
    <View style={styles.container}>
      <HomeGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
