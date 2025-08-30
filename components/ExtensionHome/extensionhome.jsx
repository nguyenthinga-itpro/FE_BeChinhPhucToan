import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "../../constants/Fonts";
import Icons from "react-native-vector-icons/Ionicons";
import iconextension from "../../assets/images/four-extension.png";
import { useRouter } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../constants/API";

export default function ExtensionHome({ onClose }) {
  const router = useRouter();
  const { height } = Dimensions.get("window");

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("Token");
      router.push("/Login/login");
    } catch (error) {
      console.error("Lỗi khi đăng xuất:", error);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#02a4f5", "#02dbd8"]}
        style={[styles.extension, { height: height }]}
      >
        <View style={styles.header}>
          <View style={styles.extensions}>
            <Image source={iconextension} style={styles.iconextension}></Image>
          </View>
          <Text style={styles.title}>Tiện ích</Text>
        </View>

        <View style={styles.body}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/ProfileUser/profileuser")}
          >
            <View style={styles.buttondot}></View>
            <Text style={styles.buttonText}>Hồ sơ cá nhân</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/TotalSetGoal/totalsetgoal")}
          >
            <View style={styles.buttondot}></View>
            <Text style={styles.buttonText}>Tổng hợp mục tiêu</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/SetGoal/setgoal")}
          >
            <View style={styles.buttondot}></View>
            <Text style={styles.buttonText}>Goal</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}
            onPress={() => router.push("/About/about")}
          >
            <View style={styles.buttondot}></View>
            <Text style={styles.buttonText}>Thông tin ứng dụng</Text>
          </TouchableOpacity>
          <View style={styles.backbutton}>
            <TouchableOpacity style={styles.backbuttons} onPress={onClose}>
              <Icons name="arrow-back" size={34} color="#02dbd8" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.logout}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={logout}
          >
            <Text style={styles.logoutText}>Đăng Xuất</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  extension: {
    width: 210,
    position: "absolute",
    top: -15,
    right: 0,
    left: -30,
    bottom: 0,
    padding: 20,
    zIndex: 1,
    borderLeftWidth: 2,
    borderColor: "#fff",
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  buttondot: {
    width: 20, // Kích thước dấu chấm
    height: 20,
    borderRadius: 10, // Để làm tròn
    backgroundColor: "white",
    // marginRight: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
    fontFamily: Fonts.NUNITO_BLACK,
    // textAlign: "right",
  },

  title: {
    fontSize: 30,
    color: "#fff",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  body: {
    flex: 1,
    justifyContent: "flex-start",
    marginTop: 100,
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#3EC0F4",
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  logoutButton: {
    width: "60%",
    backgroundColor: "#ff4d4d",
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  extensions: {
    width: 50,
  },
  iconextension: {
    width: "100%",
    height: 50,
  },
  logout: {
    alignItems: "flex-end",
  },
  backbutton: {
    // justifyContent: 'space-between',
    alignItems: "center",
    marginTop: 10,
  },
  backbuttons: {
    backgroundColor: "#CCCCCC",
    borderRadius: 50,
  },
});
