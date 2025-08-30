import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import VerifyPinScreen from "../../components/VerifyPin/verifypin";

export default function VerifyPin() {
  return (
    <View style={styles.container}>
      <VerifyPinScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
