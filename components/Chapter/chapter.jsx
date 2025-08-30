import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Animated,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Logos } from "../../constants/Screen/Logos";
import { Icons } from "../../constants/Screen/Icons";
import { Colors } from "../../constants/Colors";
import { Fonts } from "../../constants/Fonts";
import ScrollBar from "../../constants/ScrollBar";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lessonGetByLessonType, getLessonCount } from "../../api/lesson";
import { getExerciseCount } from "../../api/exercise";

export default function ChapterScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { colors } = useLocalSearchParams();
  const scrollY = useRef(new Animated.Value(0)).current;
  const gradientColors = colors
    ? JSON.parse(decodeURIComponent(colors))
    : Colors.PINK;

    const [lessonCount, setLessonCount] = useState(0);
      const [exerciseCount, setExerciseCount] = useState(0);

  const fetchData = async () => {
    try {
      if (colors) {
        const decodedColors = decodeURIComponent(colors);
        const parsedColors = JSON.parse(decodedColors);
        if (Array.isArray(parsedColors) && parsedColors.length === 2) {
          console.log("object parsedColors", parsedColors);
        } else {
          console.error("Màu sắc không hợp lệ, phải có 2 màu.");
        }
      }

      const lessonTypeId = await AsyncStorage.getItem("LessonTypeID");
      setLessonCount(await getLessonCount(lessonTypeId))
      setExerciseCount(await getExerciseCount(lessonTypeId))
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
      fetchData(); // Gọi hàm fetchData khi component mount
    }, []); // useEffect chạy một lần khi component mount

  // useEffect(() => {
  //   if (colors) {
  //     try {
  //       const decodedColors = decodeURIComponent(colors);
  //       const parsedColors = JSON.parse(decodedColors);
  //       if (Array.isArray(parsedColors) && parsedColors.length === 2) {
  //         console.log("object parsedColors", parsedColors);
  //       } else {
  //         console.error("Màu sắc không hợp lệ, phải có 2 màu.");
  //       }
  //     } catch (error) {
  //       console.error("Lỗi khi phân tích màu sắc:", error);
  //     }
  //   }

  //   const lessonTypeId = JSON.parse(AsyncStorage.getItem("LessonTypeID"));
  //   console.log(lessonTypeId);
  // }, [colors]);
  
  const categories = [
    {
      id: 1,
      title: "Bài học",
      theory: lessonCount + " bài",
      exercises: exerciseCount + " bài",
    },
    {
      id: 2,
      title: "Bài kiểm tra",
      code: "001",
      description: "Đề kiểm tra gồm 20 câu hỏi trắc nghiệm",
    },
    {
      id: 3,
      title: "Nhiệm vụ",
      description: "Hoàn thành nhiệm vụ để đạt thành tích.",
    },
  ];

  const handlePress = async (categoryId) => {
    const selectedColor =
      categoryId === 1
        ? gradientColors
        : categoryId === 2
          ? gradientColors
          : gradientColors;

    if (categoryId === 1) {
      const lessonTypeId = JSON.parse(
        await AsyncStorage.getItem("LessonTypeID")
      );
      const lessons = await lessonGetByLessonType(lessonTypeId);
      await AsyncStorage.setItem("Lessons", JSON.stringify(lessons));
      router.push(`/Lesson/lesson?color=${encodeURIComponent(selectedColor)}`);
    } else if (categoryId === 2) {
      Alert.alert("Thông báo", "Tính năng đang phát triển.");
      // router.push(`/Test/test?color=${encodeURIComponent(selectedColor)}`);
    } else {
      router.push(
        `/Mission/mission?color=${encodeURIComponent(selectedColor)}`
      );
    }
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => handlePress(item.id)}
    >
      <LinearGradient colors={gradientColors} style={styles.titleContainer}>
        <Text style={styles.categoryTitle}>{item.title}</Text>
      </LinearGradient>

      <View style={styles.categoryContent}>
        {item.theory && (
          <Text style={styles.categorySubTitle}>Lý thuyết: {item.theory}</Text>
        )}
        {item.exercises && (
          <Text style={styles.categorySubTitle}>Bài tập: {item.exercises}</Text>
        )}
        {item.code && (
          <Text style={styles.categorySubTitle}>Mã đề: {item.code}</Text>
        )}
        {item.description && (
          <Text style={styles.categorySubTitle}>{item.description}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
  // phúc thêm di chuyển extension
  const [showExtension, setShowExtension] = useState(false);
  const [extensionPosition, setExtensionPosition] = useState({ x: 300, y: 35 });
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
    <View style={styles.container}>
      {showExtension && (
        <TouchableWithoutFeedback onPress={closeExtension}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <LinearGradient colors={gradientColors} style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.back()}
        >
          <Image source={Icons.back} style={styles.back} />
        </TouchableOpacity>
        <Image source={Logos.LogoLogin} style={styles.logo} />
        <View style={styles.extension}>
          {showExtension && (
            <ExtensionHome onClose={() => setShowExtension(false)} />
          )}
        </View>
      </LinearGradient>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCategory}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      />
      <ScrollBar scrollY={scrollY} />
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  goBackButton: {
    position: "absolute",
    left: 10,
    top: 30,
    zIndex: 2,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  back: {
    width: 30,
    height: 30,
  },
  logo: {
    width: "100%",
    height: 100,
    zIndex: 1,
    marginBottom: 8,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  categoryCard: {
    backgroundColor: "#fff",
    borderRadius: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    height: 200,
  },
  titleContainer: {
    width: "100%",
    paddingVertical: 20,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginBottom: 30,
  },
  categoryTitle: {
    fontSize: 36,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    textAlign: "center",
  },
  categorySubTitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginTop: 4,
    fontFamily: Fonts.NUNITO_BOLD,
  },

  //phúc thêm
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 3,
  },
  extensionhome: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 50,
    zIndex: 2,
    width: 40,
  },
  iconextension: {
    width: "100%",
    height: 40,
  },
  extension: {
    zIndex: 10,
    top: -120,
    left: 180,
  },
});
