import React, { useState, useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import PickerModal from "./Modal";
import { rewards } from "./data";
import { Fonts } from "../../constants/Fonts";
import api from "../../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function RewardsModal() {
  const [selectedRewards, setSelectedRewards] = useState([]);
  const [rewardsModalVisible, setRewardsModalVisible] = useState(false);
  // const [rewards, setRewards] = useState([]); // Lưu danh sách phần thưởng từ API
  // const [loading, setLoading] = useState(true); // Trạng thái loading

  // useEffect(() => {
  //   // Gọi API để lấy danh sách phần thưởng
  //   const fetchRewards = async () => {
  //     try {
  //       const response = await api.get(`/Reward`); // Thay API thật vào đây
  //       setRewards(response.data); // Lưu danh sách phần thưởng từ API
  //     } catch (error) {
  //       console.error("Lỗi khi lấy phần thưởng:", error);
  //     } finally {
  //       setLoading(false); // Dừng loading
  //     }
  //   };

  //   fetchRewards();
  // }, []);


  const toggleReward = (reward) => {
    if (selectedRewards.includes(reward)) {
      setSelectedRewards(selectedRewards.filter((item) => item !== reward));
    } else {
      setSelectedRewards([...selectedRewards, reward]);
    }
  };

  const handleRewardSelect = (reward) => {
    toggleReward(reward);
  };

  return (
    <View style={styles.Container}>
      <Text style={styles.title}>Phần thưởng</Text>
      <>
        <TouchableOpacity
          style={styles.awardContainer}
          onPress={() => setRewardsModalVisible(true)}
        >
          <Text style={styles.buttonText}>
            {selectedRewards.length > 0
              ? `Phần thưởng đã chọn: ${selectedRewards.map(r => r.name).join(", ")}`
              : "Chọn phần thưởng"}
          </Text>
        </TouchableOpacity>

        <PickerModal
          visible={rewardsModalVisible}
          data={rewards}
          title="Chọn Phần Thưởng"
          onSelect={handleRewardSelect}
          onClose={() => setRewardsModalVisible(false)}
        />
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
  awardContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#FFAB50",
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#999B9D",
  },
  buttonText: {
    fontSize: 14,
    color: "#333",
    fontFamily: Fonts.NUNITO_BOLD,
  },
});
