import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../constants/Fonts";
import { Icons } from "../../constants/Screen/Icons";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";


export default function MissionScreen() {
  const navigation = useNavigation();
  const { color } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState("Mới");
  const gradientColors = color ? color.split(",") : ["#FFB6C1", "#FF69B4"];
  const secondColor = gradientColors[1];
  const theoryData = [
    {
      id: "1",
      title: "Nhiệm vụ hôm nay",
      content: "Hoàn thành 5 bài tập chương 1",
      reward: "10 hạt đậu",
    },
    {
      id: "2",
      title: "Nhiệm vụ tuần",
      content: "Hoàn thành 3 bài học",
      reward: "10 hạt đậu",
    },
    {
      id: "3",
      title: "Nhiệm vụ tháng",
      content: "Hoàn thành 15 bài học",
      reward: "10 hạt đậu",
    },
  ];

  const exerciseData = [
    {
      id: "1",
      title: "Nhiệm vụ hôm nay",
      content: "Hoàn thành 5 bài tập chương 2",
      reward: "10 hạt đậu",
    },
    {
      id: "2",
      title: "Nhiệm vụ tuần",
      content: "Hoàn thành 3 bài học",
      reward: "10 hạt đậu",
    },
  ];

  const dataToDisplay = selectedTab === "Mới" ? theoryData : exerciseData;
  // phúc thêm di chuyển extension
  const [showExtension, setShowExtension] = useState(false);
  const [extensionPosition, setExtensionPosition] = useState({ x: 300, y: 30 });
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
    <LinearGradient colors={gradientColors} style={styles.container}>
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
        <Text style={styles.title}>Nhiệm Vụ</Text>
        <View style={styles.extension}>
          {showExtension && (
            <ExtensionHome onClose={() => setShowExtension(false)} />
          )}
        </View>
      </View>
      <View style={styles.tab}>
        <TouchableOpacity
          style={[styles.buttonTab, selectedTab === "Mới" && styles.activeTab]}
          onPress={() => setSelectedTab("Mới")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "Mới" && { color: secondColor },
            ]}
          >
            Mới
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonTab,
            selectedTab === "Đã hoàn thành" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Đã hoàn thành")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "Đã hoàn thành" && { color: secondColor },
            ]}
          >
            Đã hoàn thành
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={dataToDisplay}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.lessonItem}>
            <Text style={[styles.lessonTextItem, { color: secondColor }]}>
              {item.title}
            </Text>

            <Text style={styles.lessonContentItem}>
              Yêu cầu : {item.content}
            </Text>
            <Text style={styles.lessonRewardItem}>
              Phần thưởng: {item.reward}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
      {/* phúc thêm extension */}
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
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  title: {
    fontSize: 36,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
  },
  goBackButton: {
    position: "absolute",
    left: 10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  back: {
    width: 30,
    height: 30,
  },
  tab: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 16,
  },
  buttonTab: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 50,
    borderColor: "#fff",
    borderWidth: 2,
    marginHorizontal: 15,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
  },
  lessonItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    elevation: 3,
  },
  lessonTextItem: {
    fontSize: 18,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  lessonContentItem: {
    marginTop: 5,
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BOLD,
    color: "#999",
  },
  lessonRewardItem: {
    marginTop: 5,
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#ff6347",
  },

  //phúc thêm
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 1,
  },
  extensionhome: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    width: 40,
  },
  iconextension: {
    width: "100%",
    height: 40,
  },
  extension: {
    // zIndex: 10,
    top: -10,
    left: -80,
  },
});
