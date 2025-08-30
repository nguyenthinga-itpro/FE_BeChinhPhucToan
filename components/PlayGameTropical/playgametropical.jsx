import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { Video } from "expo-av";
import { useRouter } from "expo-router";
import { Fonts } from "../../constants/Fonts";
import { Imgs } from "../../constants/Game/images";
import { Videos } from "../../constants/Game/videos";
const PlayGameScreen = () => {
  const router = useRouter();
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleLevelPress = (level) => {
    console.log(`Bắt đầu cấp độ ${level}`);
    router.push(`/LevelGame/levelgame?level=${level}`);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleOptionPress = (option) => {
    if (option === "home") {
      router.push("/Home/home");
    } else if (option === "information") {
      Alert.alert("Thông tin", "Đây là màn hình thông tin.");
    }
    setShowMenu(false);
  };
  return (
    <View style={styles.container}>
      {!isVideoFinished && (
        <Video
          source={Videos.playgame}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          style={styles.video}
          onError={(error) => {
            console.error("Lỗi phát video:", error);
            Alert.alert("Lỗi", "Không thể phát video. Vui lòng thử lại.");
          }}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setIsVideoFinished(true);
            }
          }}
        />
      )}
      {isVideoFinished && (
        <ImageBackground
          source={Imgs.playgamenhietdoi}
          style={[styles.background, isVideoFinished ? {} : styles.hidden]}
        >
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={toggleMenu} style={styles.icon}>
              <Image source={Imgs.menu} style={styles.menu} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.back()} style={styles.icon}>
              <Image source={Imgs.back} style={styles.back} />
            </TouchableOpacity>
          </View>
          {showMenu && (
            <View style={styles.menuOptions}>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionPress("home")}
              >
                <Image source={Imgs.home} style={styles.menu} />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.menuOption}
                onPress={() => handleOptionPress("information")}
              >
                <Image source={Imgs.info} style={styles.menu} />
              </TouchableOpacity>
            </View>
          )}
          <View style={styles.overlay}>
            <View style={styles.gradient}>
              <Text style={styles.title}>Chọn cấp độ</Text>
              <ScrollView contentContainerStyle={styles.levelsContainer}>
                {Array.from({ length: Math.ceil(24 / 6) }, (_, rowIndex) => {
                  const start = rowIndex * 6;
                  const levels = Array.from(
                    { length: 6 },
                    (_, colIndex) => start + colIndex + 1
                  ).filter((level) => level <= 24);

                  return (
                    <View key={rowIndex} style={styles.levelRow}>
                      {levels.map((level) => (
                        <TouchableOpacity
                          key={level}
                          style={styles.levelButton}
                          onPress={() => handleLevelPress(level)}
                        >
                          <Text style={styles.levelText}>{level}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  );
                })}
              </ScrollView>
            </View>
          </View>
        </ImageBackground>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  hidden: {
    display: "none",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    color: "#000",
    marginBottom: 10,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  iconContainer: {
    position: "absolute",
    marginLeft: 20,
    marginTop: 10,
  },
  icon: {
    marginVertical: 10,
  },
  menu: {
    width: 40,
    height: 40,
  },
  back: {
    width: 40,
    height: 40,
  },
  volume: {
    width: 40,
    height: 40,
  },
  levelsContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  levelButton: {
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    marginHorizontal: 15,
    borderColor: "#fff",
    borderWidth: 3,
  },
  levelText: {
    color: "#000",
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  menuOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    position: "absolute",
    top: 5,
    left: 70,
    backgroundColor: "#fff",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    padding: 10,
    borderRadius: 8,
    width: 150,
    zIndex: 2,
  },
  menuOption: {
    paddingVertical: 5,
  },
  menuOptionText: {
    color: "#FFF",
    fontSize: 18,
    textAlign: "center",
    fontFamily: Fonts.NUNITO_BLACK,
  },
});

export default PlayGameScreen;
