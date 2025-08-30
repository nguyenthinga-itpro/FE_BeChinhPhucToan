import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import ChapterScreen from "../../components/Chapter/chapter";

export default function Login() {
  return (
    <View style={styles.container}>
      <ChapterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
