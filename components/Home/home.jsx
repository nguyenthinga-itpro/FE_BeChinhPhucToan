import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Animated, Dimensions, TouchableWithoutFeedback, Alert } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import { Icons } from "../../constants/Screen/Icons";
import ExtensionHome from "../ExtensionHome/extensionhome";
import iconextension from "../../assets/images/four-extension.png";
import * as ScreenOrientation from "expo-screen-orientation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLessonType } from "../../api/lessonTypes";
import api from "../../constants/API";

export const GradientColors = [
  {
    id: 1,
    title: "Phép cộng",
    image: Icons.cong,
  },
  {
    id: 2,
    title: "Phép trừ",
    image: Icons.tru,
  },
  {
    id: 3,
    title: "Phép nhân",
    image: Icons.nhan,
  },
  {
    id: 4,
    title: "Phép chia",
    image: Icons.chia,
  },
  {
    id: 5,
    title: "Hình học",
    image: Icons.hinh,
  },
];

const getColorForId = (id) => {
  switch (id) {
    case 1:
      return Colors.GREENN;
    case 2:
      return Colors.BLUE;
    case 3:
      return Colors.PURPLE;
    case 4:
      return Colors.RED;
    case 5:
      return Colors.ORANGE;
    default:
      return;
  }
};

export default function HomeScreen() {
  const router = useRouter();  
  const [student, setStudent] = useState([]);

  const lockPortraitMode = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );

    setStudent(JSON.parse(await AsyncStorage.getItem("Student")));
  };


  useEffect(() => {
    lockPortraitMode();
  }, []);

  const [isClassOpen, setIsClassOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("Lớp 1");
  const classes = ["Lớp 1", "Lớp 2", "Lớp 3", "Lớp 4", "Lớp 5"];

  const handlePress = async (item) => {
    try {
      const grade = parseInt(selectedClass.slice(-1), 10);
      const name = item.title;
      const lessonTypeId = await getLessonType(name, grade);
      await AsyncStorage.setItem("LessonTypeID", JSON.stringify(lessonTypeId.id));
      const color = getColorForId(item.id);
      const colorsString = encodeURIComponent(JSON.stringify(color));
      router.push(`/Chapter/chapter?colors=${colorsString}`);
    } catch (error) {
      Alert.alert("Lỗi", error.response?.data?.message || "Đã có lỗi xảy ra.");
    }
  };

  const { height } = Dimensions.get("window");
  const SCROLL_BAR_HEIGHT = height * 0.1;
  const scrollY = useRef(new Animated.Value(0)).current;

  const scrollIndicator = scrollY.interpolate({
    inputRange: [0, GradientColors.length * 70],
    outputRange: [0, height - SCROLL_BAR_HEIGHT],
    extrapolate: "clamp",
  });
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
    <LinearGradient colors={Colors.PRIMARY} style={styles.container}>
      {/* phúc thêm để làm mờ những phân khác */}
      {showExtension && (
        <TouchableWithoutFeedback onPress={closeExtension}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.header}>
        <Image source={{ uri: student.image ?? "https://cellphones.com.vn/sforum/wp-content/uploads/2023/10/avatar-trang-4.jpg" }} style={styles.avatar} />
        <View>
          <Text style={styles.text}>Xin Chào!</Text>
          <Text style={styles.name}>{student.fullName}</Text>
        </View>
        {/* phúc thêm extension */}
        <View style={styles.extension}>
          {showExtension && (
            <ExtensionHome onClose={() => setShowExtension(false)} />
          )}
        </View>
      </View>

      <View style={styles.programAndClass}>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setIsClassOpen(!isClassOpen)}
        >
          <Text style={[styles.labelText, { fontWeight: "bold" }]}>
            {selectedClass}
          </Text>
          <Icon
            name={isClassOpen ? "caret-up" : "caret-down"}
            size={14}
            color="#666"
          />
        </TouchableOpacity>

        {isClassOpen && (
          <View style={styles.dropdownMenu}>
            {classes.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectedClass(item);
                  setIsClassOpen(false);
                }}
              >
                {index > 0 && <View style={styles.divider} />}
                <Text
                  style={[
                    styles.dropdownItem,
                    item === selectedClass && { fontWeight: "bold" },
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <FlatList
        data={GradientColors}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ListContent}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePress(item)}>
            <View style={styles.cardContainer}>
              <LinearGradient
                colors={getColorForId(item.id)}
                style={styles.card}
              >
                <Image source={item.image} style={styles.cardImage} />
              </LinearGradient>
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      />

      <View style={styles.scrollBarContainer}>
        <View style={styles.scrollBar}>
          <Animated.View
            style={[
              styles.scrollThumb,
              {
                height: SCROLL_BAR_HEIGHT,
                transform: [{ translateY: scrollIndicator }],
              },
            ]}
          />
        </View>
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
    padding: 16,
    backgroundColor: Colors.light.background,
  },
  header: {
    flexDirection: "row",
    marginLeft: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 12,
  },
  text: {
    color: "#fff",
    fontSize: 14,
    fontFamily: Fonts.NUNITO_MEDIUM,
  },
  name: {
    fontSize: 24,
    color: "#fff",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  labelText: {
    fontSize: 16,
    color: "#666",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 70,
    padding: 5,
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 15,
    marginLeft: 10,
    marginVertical: 10,
  },
  dropdownMenu: {
    position: "absolute",
    top: 50, // Điều chỉnh vị trí phù hợp
    left: 0,
    right: 0,
    width: "30%",
    backgroundColor: Colors.light.background,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    zIndex: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // Dành cho Android để tạo hiệu ứng đổ bóng
  },
  dropdownItem: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#666",
    paddingLeft: 16,
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  ListContent: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 30,
  },
  cardContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 25,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  card: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 50,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 50,
    padding: 30,
    marginRight: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImage: {
    width: 60,
    padding: 30,
    height: 60,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    color: Colors.ORANGE[0],
    flex: 1,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  scrollBarContainer: {
    position: "absolute",
    top: "25%",
    right: 5,
  },
  scrollBar: {
    width: 3,
    backgroundColor: "#666",
    borderRadius: 5,
    paddingBottom: 350,
    alignItems: "center",
  },
  scrollThumb: {
    width: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: "#666",
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
    top: -1,
    left: 0,
  },
});
