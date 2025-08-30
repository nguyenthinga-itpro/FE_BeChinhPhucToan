import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal, Button, Animated } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import { useRouter } from "expo-router";
import backgroundmathwar from "../../assets/images/backgroundmathwar.jpg";
import witch from "../../assets/images/witch.png";
import volumeOnIcon from "../../assets/images/volume.png";
import volumeOffIcon from "../../assets/images/silent.png";
import { Fonts } from "../../constants/Fonts";

const mathOperations = [
    { id: 1, name: "Cộng", image: require("../../assets/images/Phep Cong.png"), type: "addition" },
    { id: 2, name: "Trừ", image: require("../../assets/images/Phep Tru.png"), type: "subtraction" },
    { id: 3, name: "Nhân", image: require("../../assets/images/Phep Nhan.png"), type: "multiplication" },
    { id: 4, name: "Chia", image: require("../../assets/images/Phep Chia.png"), type: "division" },
    { id: 5, name: "Hình học", image: require("../../assets/images/Hinh Hoc.png"), type: "geometry" },
];

export default function SelectionMathWar() {
    const router = useRouter();
    const [isSoundOn, setIsSoundOn] = useState(true);
    const [sound, setSound] = useState(null);
    useEffect(() => {
        const lockOrientation = async () => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
        };
        lockOrientation();
        playBackgroundMusic();

        return () => {
            if (sound) {
                sound.stopAsync();
                sound.unloadAsync();
            }
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        };
    }, []);

    const playBackgroundMusic = async () => {
        if (!isSoundOn) return;
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/games/Audio/backgroundsound.mp3'), // Đường dẫn đến file nhạc
            { isLooping: true } // Lặp lại nhạc nền
        );
        setSound(sound);
        await sound.playAsync();
    };
    const toggleSound = () => {
        setIsSoundOn(!isSoundOn);
    };
    const handleSelectOperation = (operationType, operationName) => {
        router.push(`/MathWar/mathwar?operation=${operationType}&operationName=${operationName}`);
    };

    return (
        <ImageBackground source={backgroundmathwar} style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.icon}
                    onPress={() => router.push("/Home/home")}
                >
                    <Image source={require("../../assets/images/QuaiTroLai.png")} style={styles.iconextension} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.soundToggle} onPress={toggleSound}>
                    <Image source={isSoundOn ? volumeOnIcon : volumeOffIcon} style={styles.soundIcon} />
                </TouchableOpacity>
                <View style={styles.headerTitle}>
                    <Text style={styles.title}>CHỌN MỘT LOẠI PHÉP TÍNH</Text>
                </View>
            </View>
            <View style={styles.Imagewitch}>
                <Image source={witch} style={styles.character} />
            </View>
            <View style={styles.mathOptions}>
                {mathOperations.map((operation) => (
                    <TouchableOpacity
                        key={operation.id}
                        style={styles.optionButton}
                        onPress={() => handleSelectOperation(operation.type, operation.name)}
                    >
                        <Image source={operation.image} style={styles.operation} />
                    </TouchableOpacity>
                ))}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        resizeMode: 'cover',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    headerTitle: {
        backgroundColor: '#F761DF',
        paddingHorizontal: 20,
        right: 120,
        paddingVertical: 10,
        borderRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        fontFamily: Fonts.NUNITO_BLACK,
    },
    icon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F761DF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    iconextension: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain',
    },
    mathOptions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        bottom: 50,
    },
    Imagewitch: {
        top: 145,
        left: 40,
    },
    optionButton: {
        backgroundColor: '#F761DF',
        padding: 10,
        borderRadius: 15,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    operation: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
    },
    character: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    soundToggle: {
        position: 'absolute',
        backgroundColor: '#F761DF',
        borderRadius: 30,
        padding: 5,
        top: 10,
        right: 30,
        zIndex: 10,
    },
    soundIcon: {
        width: 30,
        height: 30,
    },
});
