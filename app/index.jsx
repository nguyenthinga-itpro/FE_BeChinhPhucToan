import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Logos } from "../constants/Screen/Logos";
import { Icons } from "../constants/Screen/Icons";
import { Colors } from "../constants/Colors";
import { Fonts } from "../constants/Fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function IntroScreen() {
  const router = useRouter();
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const [loadingCompleted, setLoadingCompleted] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingPercentage((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setLoadingCompleted(true);
          return prev;
        }
      });
    }, 60);

    if (loadingCompleted) {
      const token = AsyncStorage.getItem("Token");
      if (token) {
        router.push("/SelectAccount/selectaccount");
      } else {
        router.push("/Login/login");
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [loadingCompleted, router]);

  return (
    <LinearGradient colors={Colors.PRIMARY} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textInfo}>
          Được phát triển bởi <Text style={styles.boldText}>FPT-Students</Text>
        </Text>
      </View>
      <Image source={Logos.LogoLogin} style={styles.logo}></Image>
      <Text style={styles.textFor}>
        Ứng dụng học toán dành cho học sinh cấp tiểu học từ lớp 1 - 5
      </Text>
      <Image source={Icons.setting} style={styles.setting}></Image>
      <Text style={styles.textSett}>Đang tải... {loadingPercentage}%</Text>

      {loadingCompleted && <Text style={styles.completedText}>Tải xong!</Text>}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 0,
    paddingTop: 20,
  },
  textInfo: {
    fontSize: 10,
    color: "#ffffff",
    fontFamily: Fonts.NUNITO_MEDIUM,
  },
  boldText: {
    fontFamily: Fonts.NUNITO_BLACK,
  },
  logo: {
    width: "100%",
    height: 200,
  },
  setting: {
    width: 30,
    height: 30,
  },
  textFor: {
    fontSize: 10,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#ffffff",
    paddingBottom: 100,
  },
  textSett: {
    fontSize: 16,
    color: "#ffffff",
    paddingTop: 5,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  completedText: {
    fontSize: 18,
    color: "#ffffff",
    marginTop: 20,
    fontFamily: Fonts.NUNITO_BLACK,
  },
});
