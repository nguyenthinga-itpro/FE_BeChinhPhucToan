import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

export default function CommentResultTest() {
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

      {/* Comment Section */}
      <View style={styles.containbody}>
        <Text style={styles.suggestionTitle}>Nhận Xét</Text>
        <LinearGradient
          colors={["#ffdb41", "#ff8957"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.commentBox}
        >
          <Text style={styles.commentText}>
            Khả năng tính toán tốt, nhưng sai đúng 1 câu cố gắng lên nhé!
          </Text>
        </LinearGradient>

        {/* Suggestions */}
        <View style={styles.suggestionContainer}>
          <Text style={styles.suggestionTitle}>Đề xuất học phần</Text>
          <LinearGradient
            colors={["#04a5f4", "#13e6ee"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.suggestionBox, styles.slowAndSteady]}
          >
            <Text style={styles.suggestionText}>Tính chậm, tính chắc</Text>
            <Text style={styles.suggestionSubtitle}>
              Học cách tính toán kĩ lưỡng hơn!
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={["#5ad46a", "#a4f078"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.suggestionBox, styles.mathPsychology]}
          >
            <Text style={styles.suggestionText}>Tâm lý trong toán học</Text>
            <Text style={styles.suggestionSubtitle}>
              Tiến tới logic và ổn định
            </Text>
          </LinearGradient>
          <LinearGradient
            colors={["#fb5fde", "#b525e4"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.suggestionBox, styles.mathDebate]}
          >
            <Text style={styles.suggestionText}>Phản biện trong toán học</Text>
            <Text style={styles.suggestionSubtitle}>
              Học kỹ năng phản biện toán tốt hơn!
            </Text>
          </LinearGradient>
        </View>
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
  commentBox: {
    backgroundColor: "#FFA74D", // Màu nền khung nhận xét
    borderRadius: 15, // Bo góc khung
    padding: 25, // Khoảng cách nội dung bên trong
    marginHorizontal: 20, // Căn lề hai bên
    marginVertical: 15, // Căn lề trên và dưới
    shadowColor: "#000", // Tạo bóng
    shadowOffset: { width: 0, height: 4 }, // Tọa độ bóng
    shadowOpacity: 0.25, // Độ trong suốt của bóng
    shadowRadius: 4, // Độ lan của bóng
    elevation: 5, // Hiệu ứng nổi (Android)
  },
  commentText: {
    fontSize: 18, // Tăng kích thước chữ
    fontWeight: "bold", // Đậm chữ
    color: "white", // Màu chữ
    textAlign: "center", // Căn giữa nội dung
    lineHeight: 25, // Khoảng cách giữa các dòng
  },
  suggestionContainer: {
    marginBottom: 20,
  },
  suggestionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  suggestionBox: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  slowAndSteady: {
    backgroundColor: "#00CCFF",
  },
  mathPsychology: {
    backgroundColor: "#00FFCC",
  },
  mathDebate: {
    backgroundColor: "#FF88FF",
  },
  suggestionText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  suggestionSubtitle: {
    fontSize: 12,
    color: "white",
  },
  containbody: {
    margin: 20,
  },
});
