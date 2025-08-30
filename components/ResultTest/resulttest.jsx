import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function ResultTest() {
  const results = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    isCorrect: i + 1 !== 20, // Câu 20 là sai
  }));

  return (
    <LinearGradient colors={["#fff", "#fff"]} style={styles.container}>
      {/* Header */}
      <LinearGradient colors={["#02a4f5", "#02dbd8"]} style={styles.header}>
        <TouchableOpacity style={styles.icon} onPress={() => router.back()}>
          <Text style={styles.iconText}>←</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.subtitle}>Kết Quả</Text>
          <Text style={styles.title}>TIẾN TIẾN</Text>
          <Text style={styles.subtitle}>Số câu đúng: 19</Text>
          <Text style={styles.subtitle}>
            Thời gian hoàn thành: 19 phút 29 giây
          </Text>
        </View>
        <TouchableOpacity
          style={styles.icon}
          onPress={() => router.push("/Setting/setting")}
        >
          <Text style={styles.iconText}>⚙</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Danh sách kết quả */}
      <ScrollView contentContainerStyle={styles.resultContainer}>
        <View style={styles.grid}>
          {results.map((item) => (
            <LinearGradient
              key={item.id}
              colors={
                item.isCorrect ? ["#a7f178", "#5ed56b"] : ["#ff3b30", "#ff6666"]
              }
              start={{ x: 0, y: 0 }} // Bắt đầu từ phía bên trái
              end={{ x: 1, y: 0 }} // Kết thúc ở phía bên phải
              style={styles.resultButton}
            >
              <Text style={styles.resultText}>Câu {item.id}</Text>
            </LinearGradient>
          ))}
        </View>
      </ScrollView>

      {/* Nút xem nhận xét */}
      <TouchableOpacity
        style={styles.reviewButton}
        onPress={() => router.push("/CommentResultTest/commentResultTest")}
      >
        <Text style={styles.reviewButtonText}>Xem nhận xét</Text>
      </TouchableOpacity>
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
    padding: 15,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  icon: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    backgroundColor: "#fff",
  },
  iconText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#02a4f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffd700",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center",
  },
  resultContainer: {
    padding: 20,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  resultButton: {
    width: "30%",
    height: 50,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: "3%",
  },
  resultText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  reviewButton: {
    margin: 20,
    marginLeft: "20%",
    width: "60%",
    paddingVertical: 15,
    backgroundColor: "#f9ed32",
    borderRadius: 20,
    alignItems: "center",
  },
  reviewButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
});
