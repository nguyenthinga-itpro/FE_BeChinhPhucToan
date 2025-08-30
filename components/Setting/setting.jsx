import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { Fonts } from "../../constants/Fonts";
import { Colors } from "../../constants/Colors";
import { Icons } from "../../constants/Screen/Icons";
import Icon from "react-native-vector-icons/Ionicons";

export default function SettingScreen() {
  const [volumeLevel, setVolumeLevel] = useState(1); // Initial volume level
  const [isMuted, setIsMuted] = useState(false); // Mute state

  const handleIncreaseVolume = () => {
    if (!isMuted && volumeLevel < 3) setVolumeLevel(volumeLevel + 1);
  };

  const handleDecreaseVolume = () => {
    if (!isMuted && volumeLevel > 1) setVolumeLevel(volumeLevel - 1);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      setVolumeLevel(0); // Set volume to 0 when muted
    } else {
      setVolumeLevel(1); // Default to volume level 1 when unmuted
    }
  };
  const navigation = useNavigation();
  return (
    <LinearGradient colors={Colors.BLUE} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTitle}>Cài Đặt</Text>
      </View>
      <Text style={styles.textTitle}>Âm thanh</Text>
      <View style={styles.volumeControl}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleDecreaseVolume}
          disabled={isMuted}
        >
          <Icon name="remove" size={24} color={isMuted ? "gray" : "#fff"} />
        </TouchableOpacity>

        <View style={styles.volumeBar}>
          {[1, 2, 3].map((level) => (
            <View
              key={level}
              style={[
                styles.volumeLevel,
                isMuted
                  ? styles.mutedLevel
                  : volumeLevel >= level && styles.activeLevel,
              ]}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={handleIncreaseVolume}
          disabled={isMuted}
        >
          <Icon name="add" size={24} color={isMuted ? "gray" : "#fff"} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.muteButton} onPress={handleMute}>
        <Icon
          name={isMuted ? "volume-mute" : "volume-high"}
          size={24}
          color="#fff"
        />
        <Text style={styles.muteText}>
          {isMuted ? "Tắt tiếng" : "Bật tiếng"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => navigation.goBack()}
      >
        <Image source={Icons.back} style={styles.back} />
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    alignItems: "center",
    position: "absolute",
    top: 0,
    paddingTop: 20,
  },
  textTitle: {
    fontSize: 24,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    paddingTop: 10,
  },
  volumeControl: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    marginHorizontal: 20,
  },
  volumeBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 200,
    height: 20,
    borderRadius: 10,
    padding: 2,
  },
  volumeLevel: {
    flex: 1,
    marginHorizontal: 2,
    height: "100%",
    backgroundColor: "transparent",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  activeLevel: {
    backgroundColor: "#fff",
  },
  mutedLevel: {
    backgroundColor: "gray",
    borderColor: "gray",
  },
  muteButton: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 10,
  },
  muteText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 10,
    fontFamily: Fonts.NUNITO_BOLD,
  },
  goBackButton: {
    position: "absolute",
    bottom: 30,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  back: {
    width: 30,
    height: 30,
  },
});
