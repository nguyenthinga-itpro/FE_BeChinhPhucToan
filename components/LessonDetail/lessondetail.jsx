import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Icons } from "../../constants/Screen/Icons";
import Icon from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "../../constants/Fonts";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import Markdown from 'react-native-markdown-display';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../constants/API";

export default function LessonDetailScreen() {
  const router = useRouter();
  const { lesson } = useLocalSearchParams();
  const { color } = useLocalSearchParams();
  const gradientColors = color ? color.split(",") : ["#FFB6C1", "#FF69B4"];

  const lessonObject = JSON.parse(lesson);

  const lessonDetails = {
    "Khái niệm số tự nhiên": {
      theory:
        "Số tự nhiên là các số từ 0, 1, 2, 3,... dùng để đếm hoặc xác định thứ tự.",
      formula: "Không có công thức cụ thể cho số tự nhiên.",
      attributes: ["Số nguyên không âm", "Có thứ tự liên tiếp", "Bắt đầu từ 0"],
    },
    "Phép cộng và trừ": {
      theory:
        "Phép cộng là phép tính kết hợp hai số để ra kết quả lớn hơn. Phép trừ là lấy một số trừ đi một số khác.",
      if: "Nếu a và b là hai số nguyên dương thì: ",
      formula: "a + b = c",
      inThere: [
        "a là số hạn thứ nhất",
        "b là số hạn thứ 2",
        "c là tổng hai số hạn",
      ],
      attributes: [
        "Tính giao hoán (chỉ cộng)",
        "Tính kết hợp",
        "Có phần tử đơn vị (0)",
      ],
    },
    "Bài tập cộng và trừ": {
      theory:
        "Luyện tập phép cộng và trừ giúp hiểu rõ cách thực hiện và ứng dụng.",
      formula: "Giải các bài tập như: 5 + 3 = 8, 10 - 4 = 6",
      attributes: [
        "Tăng khả năng tính toán",
        "Áp dụng trong đời sống",
        "Thực hành nhiều dạng bài",
      ],
    },
    "Bài tập nhân và chia": {
      theory:
        "Luyện tập phép nhân và chia giúp hiểu rõ cách thực hiện và ứng dụng.",
      formula: "a × b = c, a ÷ b = c",
      attributes: [
        "Tăng khả năng tính toán",
        "Hiểu rõ mối quan hệ giữa nhân và chia",
        "Thực hành qua bài tập",
      ],
    },
  };

  // Lấy dữ liệu chi tiết bài học hoặc mặc định
  const details = lessonDetails[lesson] || {
    theory: "Không có dữ liệu lý thuyết.",
    if: "",
    formula: "Không có công thức.",
    inThere: [],
    attributes: ["Không có thuộc tính."],
  };
  // phúc thêm di chuyển extension
  const [showExtension, setShowExtension] = useState(false);
  const [extensionPosition, setExtensionPosition] = useState({ x: 320, y: 20 });
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

  console.log(lessonObject);

  const content = `
# Phép cộng là gì?
**Giải thích bằng ngôn ngữ đơn giản:**
- **Phép cộng là ghép lại:** Khi ta ghép hai nhóm đồ vật.
- **Phép cộng là tăng thêm:** Giúp biết tổng khi tăng thêm.

## Tính chất của phép cộng
- **Tính giao hoán:** 3 + 5 = 5 + 3
- **Tính kết hợp:** (2 + 3) + 4 = 2 + (3 + 4)
`;

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      {showExtension && (
        <TouchableWithoutFeedback onPress={closeExtension}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.back()}
        >
          <Image source={Icons.back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {lessonObject.name || "Không có tiêu đề"}
        </Text>
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

      {/* Nội dung */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* Lý thuyết */}
        <Text style={styles.sectionTitle}>LÝ THUYẾT</Text>
        {/* <Text style={styles.text}>{lessonObject.description}</Text> */}
        <View style={styles.text}>
        <Markdown
        style={{
          heading1: { fontSize: 24, fontWeight: 'bold', marginBottom: 8, fontFamily: Fonts.NUNITO_BLACK, },
          heading2: { fontSize: 20, fontWeight: 'bold', marginVertical: 6, fontFamily: Fonts.NUNITO_BLACK },
          strong: { fontWeight: 'bold' },
          paragraph: { fontSize: 16, marginBottom: 6, fontFamily: Fonts.NUNITO_BLACK },
          bullet_list: { marginLeft: 16 },
        }}
      >
        {lessonObject.description}
      </Markdown>
        </View>
        

        {/* Công thức tổng quát */}
        {details.if && (
          <Text style={styles.sectionTitle}>CÔNG THỨC TỔNG QUÁT</Text>
        )}
        {details.if && (
          <View style={styles.centeredFormula}>
            <Text style={styles.textIf}>{details.if}</Text>
            <Text style={styles.textFormula}>{details.formula}</Text>
          </View>
        )}

        {/* Giải thích công thức */}
        {details.inThere && details.inThere.length > 0 && (
          <View style={styles.centeredInThere}>
            <Text style={styles.textInThere}>Trong đó: </Text>
            {details.inThere.map((item, index) => (
              <Text key={index} style={styles.textInThere}>
                <Icon name="ellipse" size={10} color="#fff" /> {item}
              </Text>
            ))}
          </View>
        )}

        {/* Thuộc tính cơ bản */}
        {/* <Text style={styles.sectionTitle}>THUỘC TÍNH CƠ BẢN</Text>
        {details.attributes.map((attribute, index) => (
          <Text key={index} style={styles.textAttribute}>
            {attribute}
          </Text>
        ))} */}
      </ScrollView>
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
  title: {
    fontSize: 24,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    left: 20,
  },
  content: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },

  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#333",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  centeredFormula: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
    borderRadius: 5,
    padding: 10,
  },
  textIf: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#333",
    marginBottom: 10,
    marginLeft: 5,
    textAlign: "center",
  },
  textFormula: {
    fontSize: 40,
    color: "#ff6347",
    fontFamily: Fonts.NUNITO_BLACK,
    marginLeft: 5,
    textAlign: "center",
  },
  textInThere: {
    fontSize: 14,
    color: "#fff",
    fontFamily: Fonts.NUNITO_BLACK,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  textAttribute: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#333",
    textTransform: "capitalize",
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
    elevation: 5,
  },
  // phuc thêm
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
    left: -110,
  },
});
