import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground, Modal, Button, Animated } from "react-native";
import * as ScreenOrientation from 'expo-screen-orientation';
import backgroundmathwar from "../../assets/images/backgroundmathwar.jpg";
import { Audio } from 'expo-av';
import { useRouter } from "expo-router";
import dragon from "../../assets/images/dragon.png";
import witch from "../../assets/images/witch.png";
import { Fonts } from "../../constants/Fonts";
import spell from "../../assets/images/spell.png";
import fire from "../../assets/images/fire.png";
import volumeOnIcon from "../../assets/images/volume.png";
import volumeOffIcon from "../../assets/images/silent.png";
import { useLocalSearchParams } from "expo-router";

export default function Mathwar() {
    const router = useRouter();
    const { operation, operationName } = useLocalSearchParams();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [dragonHp, setDragonHp] = useState(100);
    const [witchHp, setWitchHp] = useState(100);
    const [modalVisible, setModalVisible] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [score, setScore] = useState(0);
    const [selectedOperation, setSelectedOperation] = useState(operation); // Trạng thái phép toán đã chọn
    const [effect, setEffect] = useState({ type: null, visible: false, timestamp: null });
    const [selectedAnswer, setSelectedAnswer] = useState(null); // Lưu đáp án đã chọn
    const [isSoundOn, setIsSoundOn] = useState(true); // Trạng thái âm thanh

    // Animated values for effects
    const firePosition = useState(new Animated.Value(0))[0]; // Fire effect position
    const spellPosition = useState(new Animated.Value(0))[0]; // Spell effect position
    const [sound, setSound] = useState(null);

    const questions = {
        addition: [
            { question: "8 + 18 =", answers: ["56", "14", "26", "10"], correctAnswer: "26" },
            { question: "12 + 7 =", answers: ["5", "6", "19", "8"], correctAnswer: "19" },
        ],
        subtraction: [
            { question: "12 - 7 =", answers: ["5", "6", "4", "8"], correctAnswer: "5" },
            { question: "15 - 2 =", answers: ["12", "13", "14", "16"], correctAnswer: "13" },
        ],
        multiplication: [
            { question: "15 x 2 =", answers: ["30", "25", "40", "20"], correctAnswer: "30" },
            { question: "7 x 4 =", answers: ["28", "24", "30", "32"], correctAnswer: "28" },
        ],
        division: [
            { question: "16 ÷ 4 =", answers: ["4", "6", "3", "5"], correctAnswer: "4" },
            { question: "20 ÷ 5 =", answers: ["5", "6", "4", "3"], correctAnswer: "4" },
        ],
    };

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
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);

        };
    }, []);

    const playSound = async (soundFile) => {
        if (!isSoundOn) return;
        const { sound } = await Audio.Sound.createAsync(soundFile);
        await sound.playAsync();
    };

    const playBackgroundMusic = async () => {
        if (!isSoundOn) return;
        const { sound } = await Audio.Sound.createAsync(
            require('../../assets/sounds/backgroundsound.mp3'), // Đường dẫn đến file nhạc
            { isLooping: true } // Lặp lại nhạc nền
        );
        setSound(sound);
        await sound.playAsync();
    };

    const handleAnswerPress = (answer) => {
        setSelectedAnswer(answer); // Đánh dấu đáp án đã chọn
        setTimeout(() => {
            const currentQuestion = questions[selectedOperation][currentQuestionIndex];

            if (answer === currentQuestion.correctAnswer) {
                playSound(require('../../assets/sounds/correct.mp3'));
                // Witch bắn phép thuật vào Dragon
                setEffect({ type: "spell", visible: true });
                // Animate the spell effect moving towards the witch
                Animated.timing(spellPosition, {
                    toValue: 1.5, // Adjust value to make it move
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    setEffect({ type: null, visible: false });
                    spellPosition.setValue(0); // Reset animation value
                });

                setDragonHp((prev) => Math.max(prev - 10, 0));
            } else {
                playSound(require('../../assets/sounds/dragon.mp3'));
                // Dragon bắn lửa vào Witch
                setEffect({ type: "fire", visible: true });
                // Animate the fire effect moving towards the dragon
                Animated.timing(firePosition, {
                    toValue: 1.5, // Adjust value to make it move
                    duration: 500,
                    useNativeDriver: true,
                }).start(() => {
                    setEffect({ type: null, visible: false });
                    firePosition.setValue(0); // Reset animation value
                });
                setWitchHp((prev) => Math.max(prev - 10, 0));
            }

            if (dragonHp - 10 <= 0) {
                handleGameEnd("win");
            } else if (witchHp - 10 <= 0) {
                handleGameEnd("lose");
            } else if (currentQuestionIndex < questions[selectedOperation].length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
            setSelectedAnswer(null); // Reset đáp án đã chọn
        }, 2000);
    };



    const handleGameEnd = (result) => {
        if (result === "win") {
            playSound(require('../../assets/sounds/chienthang.mp3'));
            setResultMessage("Bạn đã thắng!");
            setScore((prev) => prev + 1);
        } else if (result === "lose") {
            playSound(require('../../assets/sounds/thuacuoc.mp3'));
            setResultMessage("Bạn đã thua!");
        }
        setModalVisible(true);
    };

    const handleNavigate = () => {
        setModalVisible(false);
        setSelectedOperation(null); // Reset phép toán đã chọn để quay lại form chọn phép tính
        setCurrentQuestionIndex(0); // Đặt lại câu hỏi về câu đầu tiên
        setDragonHp(100); // Reset máu của dragon
        setWitchHp(100); // Reset máu của witch
    };

    const toggleSound = async () => {
        setIsSoundOn(!isSoundOn);
        if (sound) {
            if (isSoundOn) {
                await sound.pauseAsync();
            } else {
                await sound.playAsync();
            }
        }
    };
    return (
        <ImageBackground
            source={backgroundmathwar}
            style={styles.container}>
            <View style={styles.questionContainer}>
                {effect.visible && (
                    <Animated.Image
                        source={effect.type === "spell" ? spell : fire}
                        style={[
                            styles.effect,
                            effect.type === "spell" ? styles.spellEffect : styles.fireEffect,
                            {
                                transform: [
                                    {
                                        translateX: effect.type === "spell" ? spellPosition.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, 200], // Adjust movement range for spell
                                        }) : firePosition.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [0, -200], // Adjust movement range for fire
                                        }),
                                    },
                                ],
                            },
                        ]}
                    />
                )}
                <View style={styles.header}>
                    <TouchableOpacity style={styles.icon} onPress={() => router.back()}>
                        <Image source={require('../../assets/images/QuaiTroLai.png')} size={24} style={styles.iconextension}></Image>
                    </TouchableOpacity>
                    <View style={styles.questions}>
                        <Text style={styles.questionText}>
                            {questions[selectedOperation][currentQuestionIndex].question} ?
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.soundToggle} onPress={toggleSound}>
                        <Image source={isSoundOn ? volumeOnIcon : volumeOffIcon} style={styles.soundIcon} />
                    </TouchableOpacity>
                </View>
                {/* Khu vực nhân vật */}
                <View style={styles.characterContainer}>
                    {/* Witch */}
                    <View style={styles.characterWithHp}>
                        <View style={styles.healthBarContainer}>
                            <View style={[styles.healthBar, { width: `${witchHp}%` }]} />
                        </View>
                        <Image source={witch} style={styles.character} />
                    </View>

                    {/* Dragon */}
                    <View style={styles.characterWithHp}>
                        <View style={styles.healthBarContainer}>
                            <View style={[styles.healthBar, { width: `${dragonHp}%` }]} />
                        </View>
                        <Image source={dragon} style={styles.monster} />
                    </View>
                </View>

                {/* Lựa chọn đáp án */}
                <View style={styles.answerContainer}>
                    {questions[selectedOperation][currentQuestionIndex].answers.map((answer, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.answerButton,
                                selectedAnswer === answer && (
                                    answer === questions[selectedOperation][currentQuestionIndex].correctAnswer
                                        ? styles.correctAnswer
                                        : styles.incorrectAnswer
                                ),
                            ]}
                            onPress={() => handleAnswerPress(answer)} >
                            <Text style={styles.answerText}>{answer}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            {/* Modal thông báo kết quả */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)} >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.resultText}>{resultMessage}</Text>
                        <Button title="OK" onPress={handleNavigate} />
                    </View>
                </View>
            </Modal>
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
        marginTop: 45,
    },
    icon: {
        width: 40,
        height: 40,
        top: -25,
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
    questionContainer: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        padding: 20,
        borderRadius: 10,
    },
    questions: {
        backgroundColor: '#F761DF',
        top: -20,
        left: -150,
        width: "50%",
        padding: 10,
        borderRadius: 10,
    },
    questionText: {
        fontSize: 32,
        color: '#fff',
        textAlign: 'center',
    },
    answerContainer: {
        top: -130,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    answerButton: {
        backgroundColor: '#F761DF',
        width: "10%",
        alignItems: 'center',
        margin: 10,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    answerText: {
        fontSize: 18,
        color: '#fff',
    },
    characterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        top: 80,
        padding: 20,
    },
    characterWithHp: {
        alignItems: 'center',
    },
    healthBarContainer: {
        width: 100,
        height: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        marginBottom: 5,
    },
    healthBar: {
        height: '100%',
        backgroundColor: '#00FF00',
        borderRadius: 5,
    },
    character: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    monster: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    resultText: {
        fontSize: 24,
        marginBottom: 20,
    },
    // hiệu ứng bắn 
    effect: {
        position: "absolute",
        width: 50,
        height: 50,
        resizeMode: "contain",
    },
    spellEffect: {
        top: 230,
        left: 200, // Vị trí tia phép từ Witch đến Dragon
    },
    fireEffect: {
        top: 230,
        right: 200, // Vị trí lửa từ Dragon đến Witch
    },
    correctAnswer: {
        backgroundColor: 'green',
    },
    incorrectAnswer: {
        backgroundColor: 'red',
    },
    soundToggle: {
        position: 'absolute',
        backgroundColor: '#F761DF',
        borderRadius: 30,
        padding: 5,
        top: -10,
        right: 10,
        zIndex: 10,
    },
    soundIcon: {
        width: 30,
        height: 30,
    },
});
