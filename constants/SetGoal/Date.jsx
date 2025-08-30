import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DatePicker() {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());


  // Load dữ liệu ngày từ AsyncStorage khi component được mount
  useEffect(() => {
    const loadDates = async () => {
      try {
        const storedStartDate = await AsyncStorage.getItem("startDate");
        const storedEndDate = await AsyncStorage.getItem("endDate");
        if (storedStartDate) setStartDate(new Date(storedStartDate));
        if (storedEndDate) setEndDate(new Date(storedEndDate));
      } catch (error) {
        console.error("Lỗi khi load ngày từ AsyncStorage:", error);
      }
    };

    loadDates();
  }, []);
  // Hàm lưu ngày vào AsyncStorage
  const saveDateToStorage = async (key, date) => {
    try {
      await AsyncStorage.setItem(key, date.toISOString());
    } catch (error) {
      console.error(`Lỗi khi lưu ${key} vào AsyncStorage:`, error);
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    setShowStartPicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
      saveDateToStorage("startDate", selectedDate);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndPicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
      saveDateToStorage("endDate", selectedDate);
    }
  };

  return (
    <View style={styles.Container}>
      <>
        <Text style={styles.title}>Thời gian bắt đầu</Text>
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => setShowStartPicker(true)}
        >
          <Text style={styles.buttonText}>
            {`${startDate.getDate()}/${startDate.getMonth() + 1
              }/${startDate.getFullYear()}`}
          </Text>
        </TouchableOpacity>
        {showStartPicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="default"
            onChange={onStartDateChange}
          />
        )}
        <Text style={styles.title}>Thời gian kết thúc</Text>
        <TouchableOpacity
          style={styles.dateContainer}
          onPress={() => setShowEndPicker(true)}
        >
          <Text style={styles.buttonText}>
            {`${endDate.getDate()}/${endDate.getMonth() + 1
              }/${endDate.getFullYear()}`}
          </Text>
        </TouchableOpacity>
        {showEndPicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="default"
            onChange={onEndDateChange}
          />
        )}
      </>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 10,
    marginVertical: 10,
  },
  title: {
    color: "#ddd",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  dateContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#ddd",
    borderRadius: 30,
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
    fontFamily: Fonts.NUNITO_BOLD,
  },
});
