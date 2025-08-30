import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import PickerModal from "./Modal";
import { mathSkills } from "./data";
import { Fonts } from "../../constants/Fonts";
import api from "../../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function SkillsModal({ reloadKey }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [skillsList, setSkillsList] = useState([]);
  const [selectedClass, setSelectedClass] = useState("1"); // Giá trị mặc định
  const [selectedSkillIds, setSelectedSkillIds] = useState([]);

  useEffect(() => {
    fetchSelectedClass();
  }, [reloadKey]);

  const fetchSelectedClass = async () => {
    try {
      const storedClass = await AsyncStorage.getItem("selectedClass");
      if (storedClass) {
        setSelectedClass(storedClass);
        fetchSkills(storedClass); // Gọi API ngay khi lấy được lớp
      }
    } catch (error) {
      // console.error("Lỗi khi lấy dữ liệu lớp:", error);
    }
  };

  const fetchSkills = async (classValue) => {
    try {
      const response = await api.get(`/LessonType?grade=${classValue}`, {
        timeout: 5000, // Thời gian chờ tối đa là 5 giây
        headers: {
          'Content-Type': 'application/json'
        }
      });

      setSkillsList(response.data); // Giả sử API trả về một mảng kỹ năng
      console.log("API Response:", response); // In toàn bộ phản hồi API
      console.log("Response Data:", response.data); // In phần dữ liệu API trả về

    } catch (error) {
      // console.error("Lỗi khi lấy dữ liệu kỹ năng:", error);
    }
  };

  const handleSkillSelect = async (skillName) => {
    const selectedSkill = skillsList.find(skill => skill.name === skillName);
    if (!selectedSkill) return;

    setSelectedSkillIds(prevSkills => {
      const exists = prevSkills.some(skill => skill.id === selectedSkill.id);
      const updatedSkills = exists
        ? prevSkills.filter(skill => skill.id !== selectedSkill.id)
        : [...prevSkills, selectedSkill];

      // Lưu danh sách ID vào AsyncStorage
      AsyncStorage.setItem("selectedSkillIds", JSON.stringify(updatedSkills.map(skill => skill.id)));

      return updatedSkills;
    });
  };

  useEffect(() => {
    // Lấy danh sách kỹ năng đã chọn từ AsyncStorage
    const loadSelectedSkills = async () => {
      try {
        const storedSkillIds = await AsyncStorage.getItem("selectedSkillIds");
        if (storedSkillIds) {
          const parsedIds = JSON.parse(storedSkillIds);
          const selectedSkillDetails = skillsList.filter(skill => parsedIds.includes(skill.id));
          setSelectedSkillIds(selectedSkillDetails);
        }
      } catch (error) {
        console.error("Lỗi khi lấy kỹ năng đã lưu:", error);
      }
    };
    loadSelectedSkills();
  }, []);


  return (
    <View key={reloadKey} style={styles.Container}>
      <Text style={styles.title}>Kỹ năng áp dụng</Text>
      <>
        <TouchableOpacity
          style={styles.skillContainer}
          onPress={async () => {
            await fetchSkills(); // Gọi API để cập nhật danh sách kỹ năng mới nhất
            await fetchSelectedClass();
            setModalVisible(true); // Mở modal sau khi lấy dữ liệu xong
          }}>
          <Text style={styles.buttonText}>
            {selectedSkillIds.length > 0
              ? `Kỹ năng đã chọn: ${selectedSkillIds.map(skill => skill.name).join(", ")}`
              : "Chọn kỹ năng toán học"}
          </Text>
        </TouchableOpacity>

        <PickerModal
          visible={modalVisible}
          data={skillsList.map((item) => item.name)}
          title="Chọn Kỹ Năng Toán Học"
          onSelect={handleSkillSelect}
          onClose={() => setModalVisible(false)}
        />
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 10,
  },
  title: {
    color: "#ddd",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  skillContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFF273",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#999b9d",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
    fontFamily: Fonts.NUNITO_BOLD,
  },
});
