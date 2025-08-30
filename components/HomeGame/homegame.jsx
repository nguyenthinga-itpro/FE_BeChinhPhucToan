import { useEffect, useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { Video } from "expo-av";
import { Imgs } from "../../constants/Game/images";
import { Videos } from "../../constants/Game/videos";
import { router } from "expo-router";
import { Colors } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../constants/API";
const HomeGameScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      router.push("/Game/game");
    }
  }, [progress, router]);

  return (
    <View style={styles.container}>
      <Image source={Imgs.Logo} style={styles.logo} />
      <Video
        source={Videos.BackgroundHomeGame}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="contain"
        shouldPlay
        isLooping
        style={styles.video}
        onError={(error) => console.error("Lỗi phát video:", error)}
      />
      <View style={styles.overlay}>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={Colors.GREENN}
            style={[styles.progressBarFill, { width: `${progress}%` }]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  video: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  logo: {
    position: "absolute",
    top: 30,
    width: "100%",
    resizeMode: "contain",
    alignSelf: "center",
    zIndex: 1,
  },
  overlay: {
    position: "absolute",
    bottom: 50,
    width: "100%",
    zIndex: 2,
  },
  progressBar: {
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  progressBarFill: {
    height: 10,
    borderRadius: 5,
  },
});

export default HomeGameScreen;
