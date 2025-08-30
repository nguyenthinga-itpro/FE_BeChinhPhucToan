import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import HomeScreen from "../../components/Home/home";
export default function Home() {
  return (
    <View style={styles.container}>
      <HomeScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
