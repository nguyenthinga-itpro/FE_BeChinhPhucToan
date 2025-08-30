import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import LoginScreen from "../../components/Login/login";

export default function Login() {
  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
