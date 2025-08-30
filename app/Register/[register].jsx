import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import RegisterScreen from "../../components/Register/register"

export default function Register() {
  return (
    <View style={styles.container}>
      <RegisterScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
