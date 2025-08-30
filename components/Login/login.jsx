import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Logos } from "../../constants/Screen/Logos";
import { Fonts } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import { sendOtp } from "../../api/auth"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function LoginScreen() {
  const [Numberphone, setNumberphone] = useState("");
  const router = useRouter();
  const isPhoneNumberValid = (phone) => {
    const regex = /^(0[3|5|7|8|9]|(84))[0-9]{8}$/;
    return regex.test(phone);
  };

  const handlePhoneNumberChange = (text) => {
    const filteredText = text.replace(/[^0-9]/g, "");
    setNumberphone(filteredText);
  };

  // const handleLogin = () => {
  //   if (Numberphone.trim() === "") {
  //     Alert.alert("Vui lòng nhập số điện thoại!");
  //   } else if (!isPhoneNumberValid(Numberphone)) {
  //     Alert.alert("Số điện thoại không hợp lệ! Vui lòng nhập lại.");
  //   } else {
  //     router.push("/VerifyPin/verifypin");
  //   }
  // };

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emailRegister = await AsyncStorage.getItem("Email");
        setEmail(emailRegister);
      } catch (error) {
        console.log("Lỗi", "Đã có lỗi xảy ra.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSendOtp = async () => {
    setLoading(true);
    try {
      const user = await sendOtp(email);
      await AsyncStorage.setItem("UserID", user.user.id);
      router.push("/VerifyPin/verifypin")
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Đã có lỗi xảy ra.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={Colors.PRIMARY} style={styles.container}>
      <View style={styles.header}>
        <Image source={Logos.LogoLogin} style={styles.logo} />
      </View>
      <View style={styles.containerLogin}>
        <Text style={styles.textTitle}>Đăng Nhập</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nhập email vào đây"
            placeholderTextColor="#d1d3d4"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
        </View>

        <LinearGradient
          colors={["#a9f279", "#59d36a"]}
          style={styles.buttonGradient}
        >
          <TouchableOpacity style={styles.buttonLogin} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Đăng Nhập</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <LinearGradient colors={["#a9f279", "#59d36a"]} style={styles.footer}>
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => router.push("/Register/register")}
        >
          <Text style={styles.buttonTextRegister}>Tạo Tài Khoản</Text>
        </TouchableOpacity>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 70,
  },
  header: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 0,
  },
  logo: {
    width: "100%",
    height: 200,
  },
  containerLogin: {
    backgroundColor: "#fff",
    width: 300,
    height: 220,
    alignItems: "center",
    borderRadius: 15,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 1,
    elevation: 12,
  },

  textTitle: {
    fontSize: 24,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#009eff",
    paddingTop: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#f1f2f2",
    width: 270,
    height: 50,
    borderRadius: 30,
  },
  prefix: {
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#808285",
    paddingLeft: 15,
  },
  pipe: {
    fontSize: 40,
    color: "#808285",
    bottom: 5,
    transform: [{ scaleX: 0.5 }],
    fontFamily: Fonts.NUNITO_BOLD,
  },
  input: {
    backgroundColor: "#f1f2f2",
    // width: 210,
    height: 50,
    borderRadius: 30,
    paddingLeft: 20,
    fontSize: 12,
    color: "#808285",
    fontFamily: Fonts.NUNITO_BOLD,
  },
  buttonGradient: {
    height: 50,
    width: 150,
    borderRadius: 30,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  footer: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonRegister: {
    height: 60,
    width: 400,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTextRegister: {
    color: "#fff",
    fontSize: 24,
    fontFamily: Fonts.NUNITO_BLACK,
  },
});
