import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Logo from "../../assets/images/Logo.png";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendOtp, login } from "../../api/auth";
import { getUserExist } from "../../api/user";

export default function VerifyPinScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const [pin, setPin] = useState(Array(6).fill(""));
  const [pinError, setPinError] = useState("");
  const [loading, setLoading] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(30);

  const handlePinChange = (text, index) => {
    if (/^\d*$/.test(text)) {
      const newPin = [...pin];
      newPin[index] = text;
      setPin(newPin);

      if (text && index < 5) {
        const nextInput = index + 1;
        const nextInputRef = inputsRef[nextInput];
        if (nextInputRef) {
          nextInputRef.focus();
        }
      }
    }
  };

  const handleVerifyPin = async () => {
    try {
      if (pin.join("").length !== 6) {
        setPinError("Please enter a valid 6-digit PIN");
      } else {
        const email = await AsyncStorage.getItem("Email");
        const pinString = pin.join("");
        const token = await login(email, pinString);
        await AsyncStorage.setItem("Token", JSON.stringify(token));
        router.push("/SelectAccount/selectaccount");
      }
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Đã có lỗi xảy ra.");
    }
  };

  const handleRequestNewPin = async () => {
    try {
      const email = await AsyncStorage.getItem("Email");
      await sendOtp(email);
      setLoading(true);
      setSecondsRemaining(30);
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Đã có lỗi xảy ra.");
    }
  };

  useEffect(() => {
    if (secondsRemaining === 0) {
      setLoading(false);
    } else if (loading) {
      const timer = setInterval(() => {
        setSecondsRemaining((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [secondsRemaining, loading]);

  const inputsRef = [];

  return (
    <LinearGradient colors={["#029cf5", "#15ebed"]} style={styles.container}>
      <Image source={Logo} style={styles.logo} />
      <View style={styles.container}>
        <Text style={styles.title}>Xác Nhận Mã Pin</Text>

        <View style={styles.pinContainer}>
          {pin.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.pinInput}
              value={digit}
              onChangeText={(text) => handlePinChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={(ref) => (inputsRef[index] = ref)}
            />
          ))}
        </View>

        {pinError ? <Text style={styles.errorText}>{pinError}</Text> : null}

        <LinearGradient colors={["#a9f279", "#59d36a"]} style={styles.button}>
          <TouchableOpacity onPress={handleVerifyPin}>
            <Text style={styles.buttonText}>Xác Nhận</Text>
          </TouchableOpacity>
        </LinearGradient>

        <LinearGradient colors={["#a9f279", "#59d36a"]} style={styles.button}>
          <TouchableOpacity onPress={handleRequestNewPin} disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? `Gửi Lại Mã (${secondsRemaining}s)` : "Gửi Lại Mã"}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>

      <TouchableOpacity
        style={styles.buttonRegister}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonTextRegister}>Quay lại</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: "100%",
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#009eff",
  },
  pinContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 30,
  },
  pinInput: {
    width: 45,
    height: 45,
    backgroundColor: "#f1f2f2",
    borderRadius: 50,
    textAlign: "center",
    fontSize: 18,
    marginRight: 5,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  button: {
    padding: 15,
    borderRadius: 30,
    width: 200,
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonRegister: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    width: "150",
    alignItems: "center",
  },
  buttonTextRegister: {
    color: "#808285",
    fontSize: 24,
    fontWeight: "bold",
  },
});
