import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { Icons } from "../../constants/Screen/Icons";
import ClassAndLessonModalComponent from "../../constants/SetGoal/ClassAndLesson";
import SkillsModal from "../../constants/SetGoal/Skills";
import DatePicker from "../../constants/SetGoal/Date";
import Reward from "../../constants/SetGoal/Rewards";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../constants/API";

export default function SetGoalScreen() {
  const navigation = useNavigation();
  const [students, setStudents] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Lưu ID của tài khoản được chọn

  useEffect(() => {
    const getStudentsFromStorage = async () => {
      try {
        const studentsData = await AsyncStorage.getItem("StudentsList");
        if (studentsData !== null) {
          const studentsList = JSON.parse(studentsData);
          setStudents(studentsList);

          // Chọn mặc định tài khoản đầu tiên
          if (studentsList.length > 0) {
            setSelectedStudentId(studentsList[0].id);
            console.log("Tài khoản mặc định được chọn:", studentsList[0].id);
          }
        } else {
          console.log("StudentID không tồn tại trong AsyncStorage");
        }
      } catch (error) {
        console.error("Lỗi khi lấy StudentID:", error);
      }
    };
    getStudentsFromStorage();
  }, []);

  const handleSelectAccount = (accountId) => {
    setSelectedStudentId(accountId);
    console.log("ID tài khoản được chọn:", accountId);
  };
  const handleSetGoal = async () => {
    try {
      // const selectedClass = await AsyncStorage.getItem("selectedClass");
      const selectedLesson = await AsyncStorage.getItem("selectedLesson");
      const startDate = await AsyncStorage.getItem("startDate");
      const endDate = await AsyncStorage.getItem("endDate");
      const selectedSkillIds = await AsyncStorage.getItem("selectedSkillIds");
      const selectedreward = 1;
      const lessonTypeID = selectedSkillIds ? JSON.parse(selectedSkillIds)[0] : null;
      const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        return date.toISOString().split("T")[0]; // Chuyển thành "YYYY-MM-DD"
      };
      const goalData = {
        studentID: selectedStudentId,
        badgeId: 1,
        numberLesson: selectedLesson ? JSON.parse(selectedLesson) : null,
        dateStart: formatDate(startDate),
        dateEnd: formatDate(endDate),
        lessonTypeID: lessonTypeID,
        reward: selectedreward,
      };
      console.log("Gửi dữ liệu mục tiêu:", JSON.stringify(goalData, null, 2));

      const response = await api.post(`/Goal`, goalData, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Mục tiêu đã được tạo:", response.data);
      Alert.alert("Thành công", "Thiết lập mục tiêu thành công!");
    } catch (error) {
      if (error.response) {
        console.error("Lỗi từ API:", error.response.data);
        Alert.alert("Lỗi", `API trả về lỗi: ${JSON.stringify(error.response.data)}`);
      } else if (error.request) {
        console.error("Không nhận được phản hồi từ API:", error.request);
        Alert.alert("Lỗi", "Không thể kết nối đến server. Vui lòng kiểm tra mạng!");
      } else {
        console.error("Lỗi khi gửi request:", error.message);
        Alert.alert("Lỗi", `Lỗi không xác định: ${error.message}`);
      }
    }
  };

  // phúc thêm extension
  const [showExtension, setShowExtension] = useState(false);
  const [extensionPosition, setExtensionPosition] = useState({ x: 300, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  const handleTouchStart = (e) => {
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      setExtensionPosition({
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    toggleExtension();
  };

  const toggleExtension = () => {
    console.log("Toggling extension:", !showExtension);
    setShowExtension((prev) => !prev);
  };

  const closeExtension = () => setShowExtension(false);
  return (
    <ScrollView>
      <LinearGradient colors={Colors.PRIMARY} style={styles.container}>
        {showExtension && (
          <TouchableWithoutFeedback onPress={closeExtension}>
            <View style={styles.overlay} />
          </TouchableWithoutFeedback>
        )}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.goBackButton}
            onPress={() => navigation.goBack()}
          >
            <Image source={Icons.back} style={styles.back} />
          </TouchableOpacity>
          <Text style={styles.textTitle}>Thiết lập mục tiêu</Text>
          <View style={styles.extension}>
            {showExtension && (
              <ExtensionHome onClose={() => setShowExtension(false)} />
            )}
          </View>
          <View
            style={[
              styles.extensionhome,
              { left: extensionPosition.x, top: extensionPosition.y },
            ]}
            onStartShouldSetResponder={() => true}
            onResponderGrant={handleTouchStart}
            onResponderMove={handleTouchMove}
            onResponderRelease={handleTouchEnd}
          >
            <Image source={iconextension} style={styles.iconextension} />
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.contentContainer}>
            <Text style={styles.text}>Chọn tài khoản</Text>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.accountScroll}>
              {students.map((account) => (
                <TouchableOpacity
                  key={account.id}
                  style={[
                    styles.accountButton,
                    {
                      backgroundColor: selectedStudentId === account.id ? "#4CAF50" : "transparent",
                      borderColor: selectedStudentId === account.id ? "#4CAF50" : "#ccc",
                    },
                  ]}
                  onPress={() => handleSelectAccount(account.id)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      {
                        color: selectedStudentId === account.id ? "#fff" : "#ddd",
                      },
                    ]}
                  >
                    {account.fullName}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <ClassAndLessonModalComponent />
            <DatePicker />
            <SkillsModal />
            <Reward />
          </View>
          <LinearGradient colors={Colors.GREENN} style={styles.setButton}>
            <TouchableOpacity onPress={handleSetGoal}>
              <Text style={styles.buttonSetText}>Thiết lập</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = {
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
  goBackButton: {
    position: "absolute",
    left: 15,
    zIndex: 2,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  back: {
    width: 30,
    height: 30,
  },
  textTitle: {
    fontSize: 24,
    color: "#fff",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    marginHorizontal: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    // elevation: 8,
  },
  text: {
    fontSize: 12,
    color: "#ccc",
    textAlign: "center",
    padding: 20,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  accountButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  accountScroll: {
    maxWidth: "90%", // Giới hạn chiều ngang
    paddingHorizontal: 10,
  },
  accountButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 2,
    borderRadius: 30,
    marginHorizontal: 5, // Khoảng cách giữa các tài khoản
    minWidth: 100, // Kích thước tối thiểu để tránh bị nhỏ quá
    alignItems: "center",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  setButton: {
    height: 50,
    width: 150,
    borderRadius: 30,
    marginTop: 10,
    marginLeft: 60,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonSetText: {
    fontSize: 20,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
  },
  // phúc thêm extension 
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 3,
  },
  extensionhome: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    zIndex: 2,
    width: 40,
  },
  iconextension: {
    width: "100%",
    height: 40,
  },
  extension: {
    zIndex: 10,
    top: -5,
    left: -105,
  },
};
