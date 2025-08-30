import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { Icons } from "../../constants/Screen/Icons";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import { Fonts } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";

export default function TotalSetGoalScreen() {
  const router = useRouter();

  const statusData = [
    {
      id: "1",
      title: "Hoàn thành bài học",
      time: new Date().toLocaleString(),
      status: "Đã hoàn thành",
      startDate: "01/02/2024",
      endDate: "10/02/2024",
      numberLesson: 5,
      skills: "Phép cộng",
    },
    {
      id: "2",
      title: "Hoàn thành bài học",
      time: new Date().toLocaleString(),
      status: "Chưa hoàn thành",
      startDate: "05/02/2024",
      endDate: "15/02/2024",
      numberLesson: 7,
      skills: "Phép chia",
    },
    {
      id: "3",
      title: "Hoàn thành bài học",
      time: new Date().toLocaleString(),
      status: "Đang thực hiện",
      startDate: "05/02/2024",
      endDate: "15/02/2024",
      numberLesson: 7,
      skills: "Phép chia",
    },
    {
      id: "4",
      title: "Hoàn thành bài học",
      time: new Date().toLocaleString(),
      status: "Chưa hoàn thành",
      startDate: "05/02/2024",
      endDate: "15/02/2024",
      numberLesson: 7,
      skills: "Phép chia",
    },
    {
      id: "5",
      title: "Hoàn thành bài học",
      time: new Date().toLocaleString(),
      status: "Đã hoàn thành",
      startDate: "05/02/2024",
      endDate: "15/02/2024",
      numberLesson: 7,
      skills: "Phép chia",
    },
  ];

  const [showExtension, setShowExtension] = useState(false);
  const [extensionPosition, setExtensionPosition] = useState({ x: 300, y: 30 });
  const [isDragging, setIsDragging] = useState(false);
  const [expandedItem, setExpandedItem] = useState(null);

  const handleTouchStart = () => setIsDragging(true);

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

  const toggleExtension = () => setShowExtension((prev) => !prev);
  const closeExtension = () => setShowExtension(false);
  const toggleExpand = (id) => {
    setExpandedItem(expandedItem === id ? null : id);
  };

  return (
    <LinearGradient colors={Colors.PRIMARY} style={styles.container}>
      {showExtension && (
        <TouchableWithoutFeedback onPress={closeExtension}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.back()}
        >
          <Image source={Icons.back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Tổng Hợp Mục Tiêu</Text>
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
      <FlatList
        data={statusData}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleExpand(item.id)}>
            <LinearGradient
              colors={
                item.status === "Đã hoàn thành"
                  ? Colors.GREENN
                  : item.status === "Chưa hoàn thành"
                  ? Colors.RED
                  : Colors.WHITE
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.lessonItem}
            >
              <View style={styles.containerItem}>
                <View style={styles.containerIcon}>
                  <Image
                    source={
                      item.status === "Đã hoàn thành"
                        ? Icons.dung
                        : item.status === "Chưa hoàn thành"
                        ? Icons.sai
                        : Icons.setting
                    }
                    style={styles.Icon}
                  />
                </View>
                <View
                  colors={
                    item.status === "Đã hoàn thành" ? Colors.GREENN : Colors.RED
                  }
                >
                  <Text
                    style={[
                      styles.lessonTextItem,
                      {
                        color:
                          item.status === "Đã hoàn thành" ? "#000" : "#FFF",
                      },
                    ]}
                  >
                    [Mục tiêu] {item.title}
                  </Text>
                  <Text
                    style={[
                      styles.timeText,
                      {
                        color:
                          item.status === "Đã hoàn thành" ? "#000" : "#FFF",
                      },
                    ]}
                  >
                    Thời gian: {item.time}
                  </Text>
                  <Text
                    style={[
                      styles.lessonTextItem,
                      {
                        color:
                          item.status === "Đã hoàn thành" ? "#fff" : "#fbd54c",
                      },
                    ]}
                  >
                    Trạng thái: {item.status}
                  </Text>
                  {expandedItem === item.id && (
                    <View style={styles.detailsContainer}>
                      <Text
                        style={[
                          styles.timeText,
                          {
                            color:
                              item.status === "Đã hoàn thành" ? "#000" : "#FFF",
                          },
                        ]}
                      >
                        Ngày bắt đầu: {item.startDate}
                      </Text>
                      <Text
                        style={[
                          styles.timeText,
                          {
                            color:
                              item.status === "Đã hoàn thành" ? "#000" : "#FFF",
                          },
                        ]}
                      >
                        Ngày kết thúc: {item.endDate}
                      </Text>
                      <Text
                        style={[
                          styles.timeText,
                          {
                            color:
                              item.status === "Đã hoàn thành" ? "#000" : "#FFF",
                          },
                        ]}
                      >
                        Số lượng bài học: {item.numberLesson}
                      </Text>
                      <Text
                        style={[
                          styles.timeText,
                          {
                            color:
                              item.status === "Đã hoàn thành" ? "#000" : "#FFF",
                          },
                        ]}
                      >
                        Kỹ năng áp dụng: {item.skills}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
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
    fontSize: 40,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    shadowColor: "#000",
    elevation: 6,
    textAlign: "center",
    marginHorizontal: 40,
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
  lessonItem: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 20,
    borderRadius: 60,
    shadowColor: "#000",
    elevation: 8,
    alignItems: "center",
  },
  lessonTextItem: {
    fontFamily: Fonts.NUNITO_BLACK,
    fontSize: 16,
  },
  timeText: {
    fontFamily: Fonts.NUNITO_REGULAR,
    marginTop: 5,
  },
  statusText: {
    fontFamily: Fonts.NUNITO_BLACK,
    textAlign: "center",
    marginTop: 5,
    marginBottom: 10,
  },
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
    top: -5,
    left: -56,
  },
  containerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  containerIcon: {
    borderRadius: 50,
    padding: 10,
    marginRight: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  Icon: {
    width: 30,
    height: 30,
  },
});
