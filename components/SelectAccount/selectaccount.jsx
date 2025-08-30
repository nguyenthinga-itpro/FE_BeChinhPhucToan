import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  FlatList,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Logos } from "../../constants/Screen/Logos";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../constants/API";
import { Fonts } from "../../constants/Fonts";
import { getStudent, addStudent } from "../../api/student";

export default function SelectAccount() {
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newStudent, setNewStudent] = useState({ fullName: "", dateBirth: new Date(), grade: "" });
  const [errors, setErrors] = useState({ fullName: "", dateBirth: new Date(), grade: "" });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const fetchStudents = async () => {
    const userId = await AsyncStorage.getItem("UserID");
    const students = await getStudent(userId);
    if (students) {
      setStudents(students);
      await AsyncStorage.setItem("StudentsList", JSON.stringify(students)); // Lưu danh sách vào AsyncStorage
    }
  };
  useFocusEffect(
    useCallback(() => {
      console.log(students);
      fetchStudents();
    }, [])
  );

  const studentPress = async (student) => {
    await AsyncStorage.setItem("Student", JSON.stringify(student));
    router.push("/Home/home");
  };

  const validateInputs = () => {
    let valid = true;
    let newErrors = { fullName: "", dateBirth: "", grade: "" };

    if (!newStudent.fullName.trim()) {
      newErrors.fullName = "Họ và tên không được để trống";
      valid = false;
    }

    // if (!(newStudent.dateBirth instanceof Date) || isNaN(newStudent.dateBirth)) {
    //   newErrors.dateBirth = "Ngày sinh không hợp lệ";
    //   valid = false;
    // } else {
    //   const today = new Date();
    //   const age = today.getFullYear() - newStudent.dateBirth.getFullYear();

    //   if (newStudent.dateBirth > today) {
    //     newErrors.dateBirth = "Ngày sinh không được ở tương lai";
    //     valid = false;
    //   } else if (age < 0 || age > 80) {
    //     newErrors.dateBirth = "Tuổi không hợp lệ (phải từ 0 đến 80)";
    //     valid = false;
    //   }
    // }

    const gradeNumber = parseInt(newStudent.grade, 10);
    if (isNaN(gradeNumber) || gradeNumber < 1 || gradeNumber > 5) {
      newErrors.grade = "Lớp học chỉ từ 1 đến 5";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toISOString().split("T")[0]; // Chuyển thành "YYYY-MM-DD"
  };
  const handleAddStudent = async () => {
    if (validateInputs()) {
      try {
        const userId = await AsyncStorage.getItem("UserID");
        const studentData = {
          fullName: newStudent.fullName,
          dateOfBirth: formatDate(newStudent.dateBirth),
          grade: newStudent.grade,
          userId: userId,
        };

        // const response = await api.post("/", studentData);
        console.log("Gửi dữ liệu mục tiêu:", JSON.stringify(studentData, null, 2));

        const response = await api.post(`/Student`, studentData, {
          timeout: 5000,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (response.status === 200 || response.status === 201) {
          Alert.alert("Thành công", "Học sinh đã được thêm!", [{ text: "OK" }]);

          setModalVisible(false);
          setNewStudent({ fullName: "", dateBirth: new Date(), grade: "" });
          setErrors({ fullName: "", dateBirth: new Date(), grade: "" });

          fetchStudents(); // Load lại danh sách học sinh
        }
      } catch (error) {
        console.error("Lỗi khi thêm học sinh:", error);
        Alert.alert("Lỗi", "Không thể thêm học sinh, vui lòng thử lại!");
      }
    }
  };


  return (
    <LinearGradient colors={["#02a4f5", "#02dbd8"]} style={styles.container}>
      <View style={styles.header}>
        <Image source={Logos.LogoLogin} style={styles.logo} />
      </View>
      {/* chọn tài khoản */}
      <View style={styles.accountContainer}>
        <Text style={styles.accountTitle}>Chọn Tài Khoản:</Text>
        {/* nút lựa chọn */}
        <TouchableOpacity
          style={styles.accountButton}
          onPress={() => router.push("/ProgressDetail/progressdetail")}
        >
          <LinearGradient
            colors={["#4fcdf2", "#02b5d5"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>Phụ huynh</Text>
          </LinearGradient>
        </TouchableOpacity>
        <View style={styles.viewaccount}>
          <FlatList
            data={students}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.accountButton}
                onPress={() => studentPress(item)}
              >
                <LinearGradient
                  colors={["#4fcdf2", "#02b5d5"]}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>{item.fullName}</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>

      </View>

      {/* Modal nhập thông tin học sinh */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Thêm Học Sinh</Text>

            <TextInput
              style={styles.input}
              placeholder="Họ và tên"
              value={newStudent.fullName}
              onChangeText={(text) => setNewStudent({ ...newStudent, fullName: text })}
            />
            {errors.fullName ? <Text style={styles.errorText}>{errors.fullName}</Text> : null}

            <TouchableOpacity
              style={styles.dateContainer}
              onPress={() => setShowDatePicker(true)}>
              <Text style={styles.buttonTexts}>
                {`${newStudent.dateBirth.getDate()}/${newStudent.dateBirth.getMonth() + 1
                  }/${newStudent.dateBirth.getFullYear()}`}
              </Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={newStudent.dateBirth || new Date()} // Đảm bảo luôn có giá trị Date hợp lệ
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) {
                    setNewStudent({ ...newStudent, dateBirth: selectedDate });
                  }
                }}
              />
            )}

            {/* {errors.dateBirth ? <Text style={styles.errorText}>{errors.dateBirth}</Text> : null} */}

            <TextInput
              style={styles.input}
              placeholder="Lớp học"
              value={newStudent.grade}
              onChangeText={(text) => setNewStudent({ ...newStudent, grade: text })}
            />
            {errors.grade ? <Text style={styles.errorText}>{errors.grade}</Text> : null}

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleAddStudent}>
                <Text style={styles.modalButtonText}>Thêm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    position: "relative",
    top: 0,
  },
  logo: {
    width: "140%",
    height: 200,
  },

  accountContainer: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  viewaccount: {
    maxHeight: 160,
    width: "90%",
  },
  accountTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#009eff",
    marginBottom: 15,
  },
  accountButton: {
    width: "100%",
    marginBottom: 15,
  },
  buttonGradient: {
    width: "auto",
    height: 70,
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontFamily: Fonts.NUNITO_BOLD,
  },
  addButton: {
    width: 50,
    height: 50,
    backgroundColor: "#4fcdf2",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  addButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  // phúc mới thêm
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)"
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 15,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: Fonts.NUNITO_BOLD,
    marginBottom: 15,
    color: "#009eff"
  },
  input: {
    width: "100%",
    fontFamily: Fonts.NUNITO_BOLD,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    marginTop: 10,
    justifyContent: "space-around",
    width: "100%"
  },
  modalButton: {
    backgroundColor: "#4fcdf2",
    padding: 10,
    borderRadius: 8,
    width: "45%",
    alignItems: "center"
  },
  modalButtonText: {
    color: "#fff",
    fontFamily: Fonts.NUNITO_BOLD,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 5,
  },
  dateContainer: {
    width: "100%",
    fontFamily: Fonts.NUNITO_BOLD,
    height: 40,
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonTexts: {
    fontSize: 14,
  }
});
