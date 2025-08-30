import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Fonts } from "../../constants/Fonts";
import { getUserNoneExist, addUser } from "../../api/user"
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function RegisterScreen() {
  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Address, setAddress] = useState("");
  const router = useRouter();

  const validateInputs = () => {
    const phoneRegex = /^[0-9]{9,10}$/;
    const yearRegex = /^(19|20)\d{2}$/;

    if (!Email) return "Vui lòng nhập địa chỉ email!";
    // if (!phoneRegex.test(Email)) return "Số điện thoại không hợp lệ!";
    if (!Name) return "Vui lòng nhập họ và tên!";
    if (!Birthday) return "Vui lòng nhập sinh nhật!";
    if (!yearRegex.test(Birthday)) return "Sinh nhật không hợp lệ!";
    if (!Address) return "Vui lòng nhập thành phố!";
    return null;
  };

  const handleRegister = async () => {
    try {
      const error = validateInputs();
      if (error) {
        Alert.alert("Lỗi", error);
        return;
      }
      const user = {
        Email,
        FullName: Name,
        DateOfBirth: `${Birthday}-01-01`,
        Address,
      };
      await getUserNoneExist(Email);
      await addUser(user);
      await AsyncStorage.setItem("Email", Email);
      Alert.alert("Thông báo", "Tạo tài khoản thành công.");
      router.push("/Login/login");
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Đã có lỗi xảy ra.");
    }
  };

  return (
    <LinearGradient colors={["#029cf5", "#15ebed"]} style={styles.container}>
      <View style={styles.containerLogin}>
        <Text style={styles.textTitle}>Tạo Tài Khoản</Text>

        {[
          {
            label: "Địa chỉ email",
            value: Email,
            setValue: setEmail,
            keyboardType: "email-address",
          },
          {
            label: "Họ và tên",
            value: Name,
            setValue: setName,
            keyboardType: "default",
          },
          {
            label: "Năm sinh",
            value: Birthday,
            setValue: setBirthday,
            keyboardType: "numeric",
          },
          {
            label: "Thành phố",
            value: Address,
            setValue: setAddress,
            keyboardType: "default",
          },
        ].map(({ label, value, setValue, keyboardType }) => (
          <View key={label}>
            <Text style={styles.titleInput}>{label}</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder={`Nhập ${label.toLowerCase()} vào đây`}
                placeholderTextColor="#d1d3d4"
                value={value}
                onChangeText={setValue}
                keyboardType={keyboardType}
              />
            </View>
          </View>
        ))}

        <LinearGradient
          colors={["#a9f279", "#59d36a"]}
          style={styles.buttonGradient}
        >
          <TouchableOpacity style={styles.buttonLogin} onPress={handleRegister}>
            <Text style={styles.buttonText}>Đăng Ký</Text>
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
  },
  containerLogin: {
    backgroundColor: "#fff",
    width: 300,
    height: "85%",
    alignItems: "center",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    marginTop: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  textTitle: {
    fontSize: 24,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#009eff",
    paddingTop: 10,
  },
  titleInput: {
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#808285",
    marginTop: 10,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    backgroundColor: "#f1f2f2",
    borderRadius: 30,
    width: 270,
    height: 50,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: "#f1f2f2",
    height: "100%",
    fontFamily: Fonts.NUNITO_BOLD,
    color: "#000",
    borderRadius: 30,
    textAlign: "center",
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
  buttonRegister: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 20,
  },
  buttonTextRegister: {
    color: "#808285",
    fontSize: 24,
    fontFamily: Fonts.NUNITO_BLACK,
  },
});
