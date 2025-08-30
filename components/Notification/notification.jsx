import React, { useEffect, useState, useRef } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, TouchableWithoutFeedback, Image, Dimensions, Animated } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Fonts } from "../../constants/Fonts";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import ImageChuong from "../../assets/images/Chuong.png";
import ImageBack from "../../assets/images/QuaiTroLai.png";
import api from "../../constants/API";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationsScreen() {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);
    const [contentHeight, setContentHeight] = useState(1);
    const [flatListHeight, setFlatListHeight] = useState(0); // Chiều cao thực tế của FlatList
    useEffect(() => {
        const fetchNotification = async () => {
            try {
                const userId = await AsyncStorage.getItem("UserID");
                console.log("dưuhd", userId);
                if (userId) {
                    fetchNotifications(userId); // Gọi API ngay khi lấy được lớp
                }
            } catch (error) {
                console.error("abc:", error);
            }
        };
        fetchNotification();
    }, []);
    const fetchNotifications = async (userId) => {
        try {
            const response = await api.get(`/NotifyUser/${userId}`, {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.data && Array.isArray(response.data)) {
                // Chuyển đổi dữ liệu API thành danh sách thông báo
                const formattedNotifications = response.data.map(item => {
                    const createdAt = new Date(item.userNotification.createdAt);
                    return {
                        id: item.notificationID, // ID thông báo
                        message: item.userNotification.message, // Nội dung thông báo
                        isRead: item.userNotification.isRead, // Trạng thái đã đọc
                        date: createdAt.toLocaleDateString(),
                        time: createdAt.toLocaleTimeString()
                    }
                });

                setNotifications(formattedNotifications);
                console.log("Formatted Notifications:", formattedNotifications);
            } else {
                // console.log("Dữ liệu thông báo không hợp lệ:", response.data);
            }

        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu thông báo:", error);
        }
    };


    const SCROLL_BAR_HEIGHT = flatListHeight * 0.1;
    const scrollY = useRef(new Animated.Value(0)).current;
    const scrollIndicator = scrollY.interpolate({
        inputRange: [0, Math.max(contentHeight - flatListHeight + 200, 1)],
        outputRange: [0, flatListHeight - SCROLL_BAR_HEIGHT],
        extrapolate: "clamp",
    });

    // phúc thêm di chuyển extension
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
        <LinearGradient colors={['#fff', '#fff']} style={styles.container}>
            {showExtension && (
                <TouchableWithoutFeedback onPress={closeExtension}>
                    <View style={styles.overlay} />
                </TouchableWithoutFeedback>
            )}
            <LinearGradient colors={['#02dbd8', '#02a4f5']} style={styles.header}>
                <TouchableOpacity style={styles.icon} onPress={() => navigation.goBack()}>
                    <Image source={ImageBack} style={styles.iconextension} ></Image>
                </TouchableOpacity>
                <View style={styles.headerTitle}>
                    <Text style={styles.headerTitles}>Tổng Hợp Thông Báo</Text>
                </View>
                {/* phúc thêm extension */}
                <View style={styles.extension}>
                    {showExtension && <ExtensionHome onClose={() => setShowExtension(false)} />}
                </View>
            </LinearGradient>

            <FlatList
                data={notifications}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                style={styles.notificationsContainer}
                renderItem={({ item }) => (
                    <View style={[styles.notificationCard, !item.isRead && styles.unreadNotificationCard]}>
                        <View style={styles.notificationIcon}>
                            <Image source={ImageChuong} style={[styles.iconnotification, { tintColor: item.isRead ? "#00B7F8" : "#fff" }]} />
                        </View>
                        <View style={styles.notificationContent}>
                            <Text style={[styles.notificationText, !item.isRead && styles.unreadNotificationText]}>
                                {item.message}
                            </Text>
                            <View style={styles.notificationFooter}>
                                <Text style={[styles.dateText, !item.isRead && styles.unreadNotificationText]}>{item.date}</Text>
                                <Text style={[styles.timeText, !item.isRead && styles.unreadNotificationText]}>{item.time}</Text>
                            </View>
                        </View>
                    </View>
                )}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                onContentSizeChange={(width, height) => {
                    setContentHeight(height); // Lưu chiều cao nội dung FlatList
                }}
                onLayout={(event) => {
                    setFlatListHeight(event.nativeEvent.layout.height); // Lấy chiều cao hiển thị của FlatList
                }}
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
                        left: extensionPosition.x + 10,
                        top: extensionPosition.y + 20,
                    },
                ]}
                onStartShouldSetResponder={() => true}
                onResponderGrant={handleTouchStart}
                onResponderMove={handleTouchMove}
                onResponderRelease={handleTouchEnd}
            >
                <View style={styles.extensions}>
                    <Image source={iconextension} style={styles.iconextension}></Image>
                </View>
            </View>
        </LinearGradient>
    );
}

// const notifications = [
//     {
//         message: "Thật tuyệt vời! Cá Mập Hehe đã giành ra 2 giờ học trong tuần này!",
//         date: "12/3/2024",
//         time: "13h",
//         isRead: false,
//     },
//     {
//         message: "Hãy giúp đỡ Cá Mập Hehe! Bé đang có ý định đập điện thoại!!",
//         date: "12/3/2024",
//         time: "13h",
//         isRead: true,
//     },
//     {
//         message: "Trong có vẻ Cá Mập Hehe đang gặp khó khăn trong phép chia!",
//         date: "12/3/2024",
//         time: "13h",
//         isRead: true,
//     },
//     {
//         message: "Hãy giúp đỡ Cá Mập Hehe! Bé đang có ý định đập điện thoại!!",
//         date: "12/3/2024",
//         time: "13h",
//         isRead: true,
//     },
//     {
//         message: "Hãy giúp đỡ Cá Mập Hehe! Bé đang có ý định đập điện thoại!!",
//         date: "12/3/2024",
//         time: "13h",
//         isRead: true,
//     },
//     {
//         message: "Hãy giúp đỡ Cá Mập Hehe! Bé đang có ý định đập điện thoại!!",
//         date: "12/3/2024",
//         time: "13h",
//         isRead: true,
//     },

// ];

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: "22%",
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
    notificationsContainer: {
        marginTop: 15,
        marginTop: 15,
        marginHorizontal: 10,
    },
    notificationCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        marginHorizontal: 5,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    unreadNotificationCard: {
        backgroundColor: '#00ACE8', // Màu nền đỏ cho thông báo chưa đọc
    },
    notificationIcon: {
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconnotification: {
        width: 70,
        height: 70,
    },
    notificationContent: {
        flex: 1,
    },
    notificationText: {
        fontSize: 14,
        fontFamily: Fonts.NUNITO_BLACK,
        color: '#00B8F9',
        marginBottom: 5,
    },
    unreadNotificationText: {
        color: '#fff', // Màu đỏ cho text chưa đọc
        fontFamily: Fonts.NUNITO_BLACK,
    },
    notificationFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    dateText: {
        fontSize: 14,
        color: '#00B8F9',
        fontFamily: Fonts.NUNITO_BLACK,
    },
    timeText: {
        fontSize: 14,
        color: '#00B8F9',
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
    },
});
