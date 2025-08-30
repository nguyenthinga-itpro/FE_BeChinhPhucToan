import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Icons } from "../../constants/Screen/Icons";
import { useRouter } from "expo-router";
const AboutScreen = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Giới thiệu</Text>
      <Text style={styles.text}>Ứng dụng này sử dụng hình ảnh từ Canvas</Text>
      <Text style={styles.source}>
        Ảnh bởi nhiều tác giả trên Canvas. Một số sticker được lấy từ
        @CanvaOriginalStickers, @doodlerco, @eustas-designs, @gitasetstudio,
        @madanipro, @nestoreliyashevskiy, @blankids, @blankids,
        @cloverlittleworld, @frog-mugi, @nattayattaicons, @studio-mrpor,
        @anndesign, @ummaqi, @cgdeaws-images, @ashwdsart, @cloverlittleworld,
        @lisayasier, @ninasitkevich, @anastasi17, @heni-silvias-images,
        @anchaleear, @lemoncraftstd, @canvaoriginalstickers, @gettysignature,
        @brand401730313, @infinitys-studio, @putracetol, @emiltimplaru
      </Text>
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => router.back()}
        accessibilityLabel="Quay lại"
        accessible={true}
      >
        <Image source={Icons.back} style={styles.back} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    color: "gray",
    marginTop: 10,
    textAlign: "center",
  },
  source: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
    fontStyle: "italic",
    textAlign: "center",
  },
  goBackButton: {
    position: "absolute",
    bottom: 20,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  back: {
    width: 30,
    height: 30,
  },
});

export default AboutScreen;
