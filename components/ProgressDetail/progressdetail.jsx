import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import { PieChart } from "react-native-chart-kit";
import { useState } from "react";
import { router } from "expo-router";
import ExtensionHome from "../ExtensionHome/extensionhome";
import iconextension from "../../assets/images/four-extension.png";

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
};

const topics = ["Phép Cộng", "Phép Trừ", "Phép Nhân", "Phép Chia", "Hình Học"];
const details = {
  "Phép Cộng": [
    { title: "Khái Niệm Cơ Bản", completed: true },
    { title: "Cộng với số có 1 chữ số", completed: true },
    { title: "Cộng với số có 2 chữ số", completed: true },
    { title: "Cộng với số phức tạp", completed: false },
  ],
  "Phép Trừ": [
    { title: "Khái Niệm Cơ Bản", completed: true },
    { title: "Trừ với số có 1 chữ số", completed: false },
  ],
};

const data = [
  {
    name: "Phép Cộng",
    percentage: 89,
  },
  {
    name: "Phép Trừ",
    percentage: 84,
  },
  {
    name: "Phép Nhân",
    percentage: 45,
  },
  {
    name: "Phép Chia",
    percentage: 32,
  },
  {
    name: "Hình Học",
    percentage: 10,
  },
];
export default function ProgressDetailScreen() {
  const [selectedTopic, setSelectedTopic] = useState("Phép Cộng");
  const [selectedMonth, setSelectedMonth] = useState(1); // Khởi tạo tháng hiện tại là 1 (tháng 1)
  const monthNames = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];

  const handleMonthChange = (value) => {
    // Giới hạn tháng trong khoảng từ 1 đến 12
    const newMonth = Math.max(1, Math.min(12, selectedMonth + value));
    setSelectedMonth(newMonth);
  };
  // phúc thêm di chuyển extension
  const speedFactor = 1;
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
    <LinearGradient colors={["#02a4f5", "#02dbd8"]} style={styles.container}>
      {/* phúc thêm để làm mờ những phân khác */}
      {showExtension && (
        <TouchableWithoutFeedback onPress={closeExtension}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.header}>
        <View style={styles.notificationIcon}>
          <TouchableOpacity
            onPress={() => router.push("/Notification/notification")}
          >
            <Icon name="bell" size={40} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.headers}>
          <Text style={styles.headerTitle}>Xin chào!</Text>
          <Text style={styles.headerTitle}>Phụ huynh của Cá Mập</Text>
        </View>
        {/* phúc thêm extension */}
        <View style={styles.extension}>
          {showExtension && (
            <ExtensionHome onClose={() => setShowExtension(false)} />
          )}
        </View>
      </View>

      <View style={styles.userInfoCard}>
        <View style={styles.userInforImage}>
          <LinearGradient
            colors={["#02dbd8", "#02a4f5"]}
            style={styles.userImage}
          >
            <View style={styles.userLike}>
              <TouchableOpacity style={styles.iconButton}>
                <Icon name="thumbs-up" size={20} color="#fff" />
                <Text style={styles.likenumber}>1700</Text>
              </TouchableOpacity>
            </View>
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={styles.avatar}
            />
            <View style={styles.rankuser}>
              <Text style={styles.rankusertitle}>
                <Text style={styles.boldText}>THÀNH TÍCH</Text>
              </Text>
              <Text style={styles.rankusertitle}>
                Xếp hạng đơn: <Text style={styles.boldText}>Immortal</Text>
              </Text>
              <Text style={styles.rankusertitle}>
                Xếp hạng đôi: <Text style={styles.boldText}>Diamond</Text>
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.userDetails}>
          <Text style={styles.userTag}>#YL-2019</Text>
          <Text style={styles.userName}>Cá Mập Hehe</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.chartContainer}>
              {data.map((item, index) => (
                <LinearGradient
                  colors={["#02dbd8", "#02a4f5"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  key={index}
                  style={styles.chartRow}
                >
                  <PieChart
                    data={[
                      {
                        name: "Phần còn lại",
                        population: 100 - item.percentage,
                        color: "#02dbd8", // Màu nền trùng với phần còn lại
                        legendFontSize: 15,
                      },
                      {
                        name: item.name,
                        population: item.percentage,
                        color: "#ffcf44", // Màu gradient cho phần chiếm được
                        legendFontColor: "#ff9254",
                        legendFontSize: 15,
                      },
                    ]}
                    width={100}
                    height={35}
                    chartConfig={chartConfig}
                    accessor="population"
                    backgroundColor="transparent"
                    paddingLeft="10"
                    center={[20, 0]}
                    hasLegend={false}
                    style={styles.charts}
                  />
                  <View style={styles.chart}>
                    <Text style={styles.chartTitle}>{item.name}</Text>
                    <Text style={styles.chartTitle}>{item.percentage}%</Text>
                  </View>
                </LinearGradient>
              ))}
            </View>
          </View>
        </View>
      </View>

      <View style={styles.progressDetailsContainer}>
        <Text style={styles.progresstitle}>CHI TIẾT TIẾN ĐỘ</Text>
        <View style={styles.progressfillter}>
          <Text style={styles.month}>{monthNames[selectedMonth - 1]}</Text>
          <View style={styles.months}>
            <TouchableOpacity onPress={() => handleMonthChange(1)}>
              <Icon name="caret-up" size={10} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleMonthChange(-1)}>
              <Icon name="caret-down" size={10} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.progressDetails}>
        <ScrollView style={styles.leftColumn}>
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.progressItem}
              onPress={() => setSelectedTopic(topic)}
            >
              <Text style={styles.progressText}>{topic}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <ScrollView style={styles.rightColumn}>
          {details[selectedTopic]?.map((detail, index) => (
            <LinearGradient
              colors={
                detail.completed
                  ? ["#a7f178", "#5ed56b"]
                  : ["#d3d3d3", "#c0c0c0"]
              }
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              key={index}
              style={[
                styles.detailCard,
                detail.completed ? styles.completed : styles.notCompleted,
              ]}
            >
              <Text style={styles.detailTitle}>{detail.title}</Text>
              <Text style={styles.detailStatus}>
                {detail.completed ? "ĐÃ HOÀN THÀNH" : "CHƯA HOÀN THÀNH"}
              </Text>
            </LinearGradient>
          ))}
          {/* </LinearGradient> */}
        </ScrollView>
      </View>
      {/* phúc thêm nút extension */}
      <View
        style={[
          styles.extensionhome,
          {
            left: extensionPosition.x,
            top: extensionPosition.y,
          },
        ]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handleTouchStart}
        onResponderMove={handleTouchMove}
        onResponderRelease={handleTouchEnd}
      >
        <Image source={iconextension} style={styles.iconextension}></Image>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    padding: 10,
  },
  headers: {
    alignItems: "flex-start",
    marginRight: 70,
  },
  notificationIcon: {
    marginLeft: 10,
    marginTop: 10,
  },
  icon: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  userInfoCard: {
    flexDirection: "row",
    backgroundColor: "#fff",
    margin: 10,
    borderRadius: 20,
    height: "30%",
    alignItems: "center",
  },
  userInforImage: {
    width: "38%",
  },
  userImage: {
    flex: 1,
    padding: "1%",
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  userLike: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row", // Đặt nút like và số theo hàng ngang
  },
  rankuser: {
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  rankusertitle: {
    fontSize: 10,
    color: "#fff",
  },
  boldText: {
    fontWeight: "bold",
  },
  iconButton: {
    alignItems: "center", // Căn giữa theo trục dọc
    justifyContent: "center",
    padding: 5,
    borderRadius: 10,
  },
  likenumber: {
    color: "#fff",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginLeft: "18%",
  },
  userDetails: {
    flex: 1,
    padding: 2,
    top: -10,
  },
  userTag: {
    fontSize: 8,
    color: "#262262",
  },
  userName: {
    fontSize: 16,
    color: "#262262",
    fontWeight: "bold",
    marginBottom: 10,
  },
  // mới thêm 7/1
  progressDetailsContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  progresstitle: {
    color: "#fff",
    fontWeight: "bold",
    padding: 5,
  },
  progressfillter: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    width: "22%",
    padding: 5,
    borderTopLeftRadius: 20,
  },
  month: {
    fontSize: 12,
    color: "#2b3990",
    fontWeight: "bold",
  },
  moths: {
    flexDirection: "column",
  },
  space: {
    backgroundColor: "#fff",
  },
  progressDetails: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
  },
  progressItem: {
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  progressText: {
    color: "#2b3990",
    fontSize: 16,
    fontWeight: "bold",
  },
  lessonDetailsContainer: {
    width: "55%",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  lessonTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  lessonItem: {
    fontSize: 16,
    color: "#000",
    paddingVertical: 5,
  },
  // mới thêm
  progressBarContainer: {},
  charts: {
    marginLeft: -35,
  },
  chart: {
    marginTop: 3,
  },
  chartContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  chartRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "48%",
    marginLeft: 3,
    marginBottom: 5,
    borderRadius: 10,
  },
  chartTitle: {
    fontSize: 10,
    fontWeight: "bold",
    marginLeft: -28,
  },
  // thử
  rightColumn: {
    width: "65%",
    padding: 5,
    marginLeft: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  detailCard: {
    padding: 15,
    borderRadius: 20,
    marginBottom: 15,
    justifyContent: "space-between",
    alignItems: "center",
  },
  completed: {
    backgroundColor: "lightgreen",
  },
  notCompleted: {
    backgroundColor: "white",
  },
  detailTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  detailStatus: {
    color: "#fff",
    fontSize: 10,
    marginTop: 5,
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
    borderRadius: 50,
    width: 40,
  },
  iconextension: {
    width: "100%",
    height: 40,
  },
  extension: {
    top: -10,
    left: -170,
  },
});
