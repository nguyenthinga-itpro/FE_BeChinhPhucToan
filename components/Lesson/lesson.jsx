import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Icons } from "../../constants/Screen/Icons";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import { Fonts } from "../../constants/Fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { exerciseGetByLessonType } from "../../api/exercise";

export default function LessonScreen() {
  const router = useRouter();
  const { color } = useLocalSearchParams();
  const [selectedTab, setSelectedTab] = useState("Lý Thuyết");
  const gradientColors = color ? color.split(",") : ["#FFB6C1", "#FF69B4"];
  const firstColor = gradientColors[1];

  const [theoryData, setTheoryData] = useState();
  const [exerciseData, setExerciseData] = useState();

  const fetchData = async () => {
    try {
      const storedData1 = await AsyncStorage.getItem("Lessons");
      console.log(storedData1);
      
      setTheoryData(JSON.parse(storedData1));

      const lessonTypeId = JSON.parse(
        await AsyncStorage.getItem("LessonTypeID")
      );
      const storedData2 = await exerciseGetByLessonType(lessonTypeId);
      setExerciseData(storedData2);
    } catch (error) {
      console.error("Error retrieving data from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Gọi hàm fetchData khi component mount
  }, []); // useEffect chạy một lần khi component mount

  // const theoryData = [
  //   { id: "1", title: "Khái niệm số tự nhiên" },
  //   { id: "2", title: "Phép cộng và trừ" },
  // ];

  // const exerciseData = [
  //   { id: "3", title: "Bài tập cộng và trừ" },
  //   { id: "4", title: "Bài tập nhân và chia" },
  // ];

  const gameData = [
    {
      id: "11",
      title: "Đại chiến toán học",
      image: Icons.daichientoanhoc,
      route: "/LoadMathWar/loadmathwar",
    },
    {
      id: "2",
      title: "Đố vui toán học",
      image: Icons.dovuitoanhoc,
      route: "/HomeGame/homegame",
    },
  ];

  const dataToDisplay =
    selectedTab === "Lý Thuyết"
      ? theoryData
      : selectedTab === "Bài Tập"
        ? exerciseData
        : gameData;

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
    <LinearGradient colors={gradientColors} style={styles.container}>
      {showExtension && (
        <TouchableWithoutFeedback onPress={closeExtension}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.back()}
          accessibilityLabel="Quay lại"
          accessible={true}
        >
          <Image source={Icons.back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Bài Học</Text>
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
      <View style={styles.tab}>
        <TouchableOpacity
          style={[
            styles.buttonTab,
            selectedTab === "Lý Thuyết" && styles.activeTab,
          ]}
          onPress={() => {
            setSelectedTab("Lý Thuyết");
            fetchData();
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "Lý Thuyết" && { color: firstColor },
            ]}
          >
            Lý Thuyết
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonTab,
            selectedTab === "Bài Tập" && styles.activeTab,
          ]}
          onPress={() => {
            setSelectedTab("Bài Tập");
            fetchData();
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "Bài Tập" && { color: firstColor },
            ]}
          >
            Bài Tập
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.buttonTab,
            selectedTab === "Trò chơi" && styles.activeTab,
          ]}
          onPress={() => setSelectedTab("Trò chơi")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedTab === "Trò chơi" && { color: firstColor },
            ]}
          >
            Trò chơi
          </Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={dataToDisplay}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[selectedTab !== "Trò chơi" ? styles.lessonItem : null]}
            onPress={() =>
              selectedTab === "Bài Tập"
                ?
                router.push(
                  `/Exercise/exercise?color=${encodeURIComponent(
                    color
                  )}&exerciseData=${encodeURIComponent(JSON.stringify(item))}`
                )
                // console.log (item)
                : router.push(
                  `/LessonDetail/lessondetail?color=${encodeURIComponent(
                    color
                  )}&lesson=${encodeURIComponent(JSON.stringify(item))}`
                )
            }
            // accessibilityLabel={item.name}
            accessible={true}
          >
            {/* {selectedTab === "Trò chơi" ? (
              <TouchableOpacity
                onPress={() => router.push("/HomeGame/homegame")}
                style={styles.gameItemContainer}
              >
                <View style={styles.gameItem}>
                  <Image source={item.image} style={styles.gameImage} />
                  <View>
                    <Text style={styles.gameTitle}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <Text
                style={styles.lessonTextItem}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                {item.name}
              </Text>
            )} */}
            {selectedTab === "Trò chơi" ? (
              <TouchableOpacity
                onPress={() => router.push(item.route)} // Sử dụng route từ gameData
                style={styles.gameItemContainer}
              >
                <View style={styles.gameItem}>
                  <Image source={item.image} style={styles.gameImage} />
                  <View>
                    <Text style={styles.gameTitle}>{item.title}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ) : (
              <Text
                style={styles.lessonTextItem}
                adjustsFontSizeToFit
                numberOfLines={2}
              >
                {item.name}
              </Text>
            )}

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
    fontSize: 48,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    shadowColor: "#000",
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
    marginBottom: 20,
  },
  buttonTab: {
    backgroundColor: "transparent",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
    borderColor: "#fff",
    borderWidth: 2,
    marginHorizontal: 10,
    shadowColor: "#000",
    // elevation: 15,
  },
  activeTab: {
    backgroundColor: "#fff",
  },
  buttonText: {
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
  },
  lessonItem: {
    padding: 30,
    textAlign: "center",
    justifyContent: "center",
    height: 120,
    marginVertical: 8,
    marginHorizontal: 30,
    backgroundColor: "#fff",
    borderRadius: 30,
    shadowColor: "#000",
    elevation: 8,
  },
  lessonTextItem: {
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#333",
    textAlign: "center",
  },
  // phúc thêm extension
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
    left: -89,
  },
  gameItemContainer: {
    marginVertical: 15,
    marginHorizontal: 50,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    elevation: 5,
    padding: 10,
    borderRadius: 30,
  },
  gameItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  gameImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    marginRight: 15,
    borderWidth: 2,
    borderColor: "#FF69B4",
    alignItems: "center",
    justifyContent: "center",
  },
  gameTitle: {
    fontFamily: Fonts.NUNITO_BLACK,
    fontSize: 18,
    color: "#333",
    textAlign: "left",
    fontWeight: "bold",
    marginBottom: 10,
  },
});
