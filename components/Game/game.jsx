import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { Video, Audio } from "expo-av";
import { Imgs } from "../../constants/Game/images";
import { Videos } from "../../constants/Game/videos";
import { Audios } from "../../constants/Game/audios";
import { router } from "expo-router";
import { Fonts } from "../../constants/Fonts";

const GameScreen = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [screenDimensions, setScreenDimensions] = useState(
    Dimensions.get("window")
  );
  const [audioPlayback, setAudioPlayback] = useState(null);
  const videoSources = [
    Videos.introduction,
    Videos.introduction1,
    Videos.introduction2,
  ];

  useEffect(() => {
    const lockOrientation = async () => {
      try {
        await ScreenOrientation.lockAsync(
          ScreenOrientation.OrientationLock.LANDSCAPE
        );
      } catch (error) {
        Alert.alert("Lỗi", "Không thể khóa màn hình vào chế độ ngang.");
        console.error("Failed to lock screen orientation:", error);
      }
    };
    lockOrientation();

    const onChange = ({ window }) => {
      setScreenDimensions(window);
    };
    const subscription = Dimensions.addEventListener("change", onChange);

    return () => {
      ScreenOrientation.unlockAsync();
      subscription?.remove();
    };
  }, []);

  const handleSkip = () => {
    if (currentVideoIndex < videoSources.length - 1) {
      setCurrentVideoIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsVideoFinished(true);
    }
  };

  const playBackgroundAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(Audios.backgroundaudio);
    setAudioPlayback(sound);
    await sound.playAsync();
  };

  const stopBackgroundAudio = async () => {
    if (audioPlayback) {
      await audioPlayback.stopAsync();
      await audioPlayback.unloadAsync();
      setAudioPlayback(null);
    }
  };
  useEffect(() => {
    playBackgroundAudio();
  }, []);
  return (
    <View style={styles.container}>
      {showBackground ? (
        <View style={styles.backgroundContainer}>
          <Image source={Imgs.backgroundgame} style={styles.background} />
          <Text style={styles.title}>Hãy chọn cổng</Text>
          <View style={styles.imagesContainer}>
            <TouchableOpacity
              onPress={() => router.push("/PlayGameTropical/playgametropical")}
            >
              <Image source={Imgs.NhietDoi} style={styles.image} />
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          {isVideoFinished ? (
            <View style={styles.buttonContainer}>
              <Image source={Imgs.backgroundgame} style={styles.background} />
              <TouchableOpacity
                style={styles.startButton}
                onPress={() => {
                  setShowBackground(true);
                  stopBackgroundAudio();
                }}
              >
                <Text style={styles.startButtonText}>Bắt đầu</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ flex: 1 }}>
              <Video
                source={videoSources[currentVideoIndex]}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="cover"
                shouldPlay
                style={{
                  width: screenDimensions.width,
                  height: screenDimensions.height,
                }}
                onError={(error) => {
                  console.error("Lỗi phát video:", error);
                  Alert.alert("Lỗi", "Không thể phát video. Vui lòng thử lại.");
                }}
              />
              <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
                <Text style={styles.skipButtonText}>Bỏ qua</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundContainer: {
    flex: 1,
    position: "relative",
  },
  title: {
    fontSize: 40,
    fontFamily: Fonts.NUNITO_BLACK,
    textAlign: "center",
    marginTop: 30,
    color: "#fff",
    zIndex: 1,
  },
  background: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  imagesContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
    marginVertical: 10,
  },
  image: {
    width: 150,
    height: 150,
    margin: 20,
    borderColor: "#FFF",
    borderWidth: 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  startButton: {
    backgroundColor: "#4CAF50",
    padding: 20,
    borderRadius: 30,
    borderColor: "#fff",
    borderWidth: 3,
    position: "absolute",
    zIndex: 1,
  },
  startButtonText: {
    color: "#FFF",
    fontSize: 20,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  skipButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#FF6347",
    padding: 10,
    borderRadius: 5,
  },
  skipButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default GameScreen;
