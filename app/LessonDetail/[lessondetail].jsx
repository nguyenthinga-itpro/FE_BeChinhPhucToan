import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LessonDetailScreen from "../../components/LessonDetail/lessondetail";

export default function Login() {
  return (
    <View style={styles.container}>
      <LessonDetailScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
