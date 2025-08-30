import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LessonScreen from "../../components/Lesson/lesson";

export default function Login() {
  return (
    <View style={styles.container}>
      <LessonScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
