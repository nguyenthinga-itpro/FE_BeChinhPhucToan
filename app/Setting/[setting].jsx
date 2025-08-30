import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import SettingScreen from "../../components/Setting/setting";

export default function Login() {
  return (
    <View style={styles.container}>
      <SettingScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
