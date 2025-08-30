import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import PickerModal from "./Modal";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ClassAndLessonModalComponent({ setReloadKey }) {
  const [isClassModalVisible, setClassModalVisible] = useState(false);
  const [isLessonModalVisible, setLessonModalVisible] = useState(false);

  const [selectedClass, setSelectedClass] = useState(1);
  const [selectedLesson, setSelectedLesson] = useState(1);

  const classData = [1, 2, 3, 4, 5];
  const lessonData = [1, 2, 3, 4, 5];

  useEffect(() => {
    loadData();
  }, []);
  // Lấy dữ liệu từ AsyncStorage khi ứng dụng chạy lần đầu
  const loadData = async () => {
    try {
      const storedClass = await AsyncStorage.getItem("selectedClass");
      const storedLesson = await AsyncStorage.getItem("selectedLesson");
      if (storedClass) {
        setSelectedClass(JSON.parse(storedClass));
      }
      if (storedLesson) {
        setSelectedLesson(JSON.parse(storedLesson));
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const saveData = async (classValue, lessonValue) => {
    try {
      await AsyncStorage.setItem("selectedClass", JSON.stringify(classValue));
      await AsyncStorage.setItem("selectedLesson", JSON.stringify(lessonValue));
      console.log("Lưu thành công:", { classValue, lessonValue });
      setReloadKey(prevKey => prevKey + 1);
    } catch (error) {
      // console.error("Lỗi khi lưu dữ liệu:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerRow}>
        {/* Class Picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Lớp</Text>
          <TouchableOpacity
            style={[styles.pickerContainer, styles.classPicker]}
            onPress={() => setClassModalVisible(true)}
          >
            <Text style={styles.text}>{selectedClass}</Text>
          </TouchableOpacity>
        </View>
        {/* Lesson Picker */}
        <View style={styles.pickerWrapper}>
          <Text style={styles.label}>Số lượng</Text>
          <TouchableOpacity
            style={styles.pickerContainer}
            onPress={() => setLessonModalVisible(true)}
          >
            <Text style={styles.text}>{selectedLesson}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <PickerModal
        visible={isClassModalVisible}
        data={classData}
        title="Chọn Lớp"
        onSelect={(item) => {
          setSelectedClass(item);
          saveData(item, selectedLesson); // Giữ nguyên lesson khi chọn class
          setClassModalVisible(false);
        }}
        onClose={() => setClassModalVisible(false)}
      />
      <PickerModal
        visible={isLessonModalVisible}
        data={lessonData}
        title="Chọn Số Lượng Bài"
        onSelect={(item) => {
          setSelectedLesson(item);
          saveData(selectedClass, item); // Giữ nguyên class khi chọn lesson
          setLessonModalVisible(false);
        }}
        onClose={() => setLessonModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    marginHorizontal: 30,
  },
  pickerRow: {
    flexDirection: "row",
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerWrapper: {
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'center',
  },
  label: {
    position: "absolute",
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
    zIndex: 10,
    color: "#ddd",
    top: -25,
  },
  pickerContainer: {
    width: 60,
    height: 40,
    marginHorizontal: 10,
    backgroundColor: "#ddd",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BOLD,
    color: "#333",
    textAlign: "center",
  },
});
