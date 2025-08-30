import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TouchableWithoutFeedback, Image, Dimensions, Animated, FlatList } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from "../../constants/Fonts";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import ImageBack from "../../assets/images/QuaiTroLai.png";

const data = [
  { key: "Buổi học hoàn thành: 12" },
  { key: "Trình độ: Lớp 3" },
  { key: "Danh Hiệu: Học sinh khá" },
];
export default function profileuser() {
    const navigation = useNavigation();
    const [showExtension, setShowExtension] = useState(false);
    const [extensionPosition, setExtensionPosition] = useState({ x: 290, y: 30 });
    const [isDragging, setIsDragging] = useState(false);
    // thanh cuộn
    const { height } = Dimensions.get("window");
    const SCROLL_BAR_HEIGHT = height * 0.1;
    const scrollY = useRef(new Animated.Value(0)).current;

  const scrollIndicator = scrollY.interpolate({
    inputRange: [0, 1000], // Adjust this range based on your content height
    outputRange: [0, height - SCROLL_BAR_HEIGHT],
    extrapolate: "clamp",
  });
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
        <LinearGradient colors={['#fff', '#fff']} style={styles.container}>
            {showExtension && (
                <TouchableWithoutFeedback onPress={closeExtension}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}
            <LinearGradient colors={['#02dbd8', '#02a4f5']} style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                    <Image source={ImageBack} size={24} style={styles.iconextension}></Image>
                </TouchableOpacity>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerTitles}>Hồ Sơ</Text>
                </View>
                {/* phúc thêm extension */}
                <View style={styles.extension}>
                    {showExtension && <ExtensionHome onClose={() => setShowExtension(false)} />}
                </View>
            </LinearGradient>

            <View style={styles.userInfoCard}>
                <View style={styles.userInforImage}>
                    <View style={styles.userImage}>
                        <Image
                            source={{ uri: 'https://via.placeholder.com/100' }}
                            style={styles.avatar}
                        />
                        <View style={styles.rankuser}>
                            <Text style={styles.rankusertitle}><Text style={styles.boldText}>Immortal</Text></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.userDetails}>
                    <Text style={styles.userName}>Tổng Kết</Text>
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <Text style={styles.detailrank}>• {item.key}</Text>
                        )}
                    />
                </View>
            </View>
            <View style={styles.infoSection}>
                <Text style={styles.infoLabel}>Họ và Tên</Text>
                <Text style={styles.infoValue}>Cá Mập Hehe</Text>
                <Text style={styles.infoLabel}>Sinh Nhật</Text>
                <Text style={styles.infoValue}>17/05/2022</Text>
                <Text style={styles.infoLabel}>Tên Tài Khoản</Text>
                <Text style={styles.infoValue}>Camaphocanhoibigioi</Text>
            </View>
            <LinearGradient colors={['#02dbd8', '#02a4f5']} style={styles.saveButton}>
                <TouchableOpacity>
                    <Text style={styles.saveButtonText}>Lưu Cài Đặt</Text>
                </TouchableOpacity>
            </LinearGradient>
            {/* phúc thêm nút extension */}
            <View
                style={[
                    styles.extensionhome,
                    {
                        left: extensionPosition.x + 10,
                        top: extensionPosition.y + 5,
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
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "17%",
        padding: 15,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
    },
    icon: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        backgroundColor: '#13a9c2',
    },
    headerTitle: {
        width: "80%",
        marginRight: 30,
    },
    headerTitles: {
        fontSize: 37,
        fontFamily: Fonts.NUNITO_BLACK,
        color: '#fff',
        textAlign: 'center',
    },
    accountContainer: {
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        padding: 20,
        borderRadius: 15,
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    accountButton: {
        backgroundColor: "#fff",
        justifyContent: 'center',
        alignItems: "center",
        width: "90%",
        height: "30%",
        padding: 20,
        borderRadius: 100,
        marginBottom: 30,
        borderWidth: 2,
        borderColor: "#909699",
    },
    buttonText: {
        textAlign: 'center',
        color: "#6C6D70",
        fontSize: 28,
        fontFamily: Fonts.NUNITO_BLACK,
    },
    footer: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    footers: {
        backgroundColor: "#F9ED32",
        justifyContent: 'center',
        alignItems: 'center',
        width: "90%",
        height: 40,
        marginTop: -20,
        borderRadius: 50,
    },
    footerText: {
        fontSize: 24,
        color: "#404041",
        fontFamily: Fonts.NUNITO_BLACK,
    },
    //khung hìnhg
    userInfoCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        height: "20%",
        alignItems: 'center',
        margin: 10,
        top: 25,
        borderRadius: 30,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        // elevation: 5,
        borderWidth: 0.8,
        borderColor: '#ccc',
        zIndex: 1,
    },
    userInforImage: {
        width: "38%",
    },
    userImage: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        padding: "1%",
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    avatar: {
        position: 'absolute',
        top: -15,
        width: 90,
        height: 90,
        borderRadius: 50,
        marginLeft: "17%",
    },
    rankuser: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        top: 20,
        marginTop: 10,
    },
    boldText: {
        fontSize: 16,
        color: '#EC008C',
        fontFamily: Fonts.NUNITO_BLACK,
    },
    iconButton: {
        alignItems: 'center', // Căn giữa theo trục dọc
        justifyContent: 'center',
        padding: 5,
        borderRadius: 10,
    },
    userDetails: {
        flex: 1,
        paddingTop: 10,
    },
    userName: {
        fontSize: 24,
        color: '#414042',
        fontFamily: Fonts.NUNITO_BLACK,
    },
    detailrank: {
        fontSize: 14,
        color: '#616063',
        fontFamily: Fonts.NUNITO_BLACK,
    },
    //mới thêm 12/1
    infoSection: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 16,
        color: "#616063",
        marginTop: 10,
    },
    infoValue: {
        width: '80%',
        textAlign: 'center',
        backgroundColor: "#F1F2F2",
        fontSize: 16,
        padding: 15,
        marginTop: 5,
        borderRadius: 30,
        fontFamily: Fonts.NUNITO_BLACK,
    },
    saveButton: {
        width: "100%",
        marginTop: "8%",
        padding: 15,
        alignItems: "center",
    },
    saveButtonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

  //phúc thêm
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9,
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
    left: -165,
    zIndex: 10,
  },
});
