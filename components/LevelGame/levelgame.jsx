import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Fonts } from "../../constants/Fonts";
import { Video, Audio } from "expo-av";
import { Imgs } from "../../constants/Game/images";
import { Videos } from "../../constants/Game/videos";
import backgroundaudio from "../../assets/games/Audio/Introduction.mp3";

const dataGameQuestionOne = [
  {
    id: 1,
    question: [Imgs.number1, Imgs.cong, Imgs.number1],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number2,
  },
  {
    id: 2,
    question: [Imgs.number1, Imgs.cong, Imgs.number2],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number3,
  },
  {
    id: 3,
    question: [Imgs.number1, Imgs.cong, Imgs.number3],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number4,
  },
  {
    id: 4,
    question: [Imgs.number2, Imgs.cong, Imgs.number1],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number3,
  },
];

const dataGameQuestionTwo = [
  {
    id: 1,
    question: [Imgs.number1, Imgs.cong, Imgs.number1],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number2,
  },
  {
    id: 2,
    question: [Imgs.number1, Imgs.cong, Imgs.number2],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number3,
  },
  {
    id: 3,
    question: [Imgs.number1, Imgs.cong, Imgs.number3],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number4,
  },
  {
    id: 4,
    question: [Imgs.number2, Imgs.cong, Imgs.number1],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number3,
  },
];

const dataGameQuestionThree = [
  {
    id: 1,
    question: [Imgs.number1, Imgs.cong, Imgs.number1],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number2,
  },
  {
    id: 2,
    question: [Imgs.number1, Imgs.cong, Imgs.number2],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number3,
  },
  {
    id: 3,
    question: [Imgs.number1, Imgs.cong, Imgs.number3],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number4,
  },
  {
    id: 4,
    question: [Imgs.number2, Imgs.cong, Imgs.number1],
    options: [Imgs.number1, Imgs.number2, Imgs.number3, Imgs.number4],
    answer: Imgs.number3,
  },
];

const LevelGameScreen = () => {
  const { level } = useLocalSearchParams();
  const router = useRouter();
  const [currentLevel, setCurrentLevel] = useState(parseInt(level) || 1);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [showFeedback, setShowFeedback] = useState(null);
  const [currentData, setCurrentData] = useState([]);
  const [rewards, setRewards] = useState([]);
  const [audioPlayback, setAudioPlayback] = useState(null);
  const [isMuted, setIsMuted] = useState(false);

  const playBackgroundAudio = async () => {
    const { sound } = await Audio.Sound.createAsync(backgroundaudio);
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
  useEffect(() => {
    if (currentLevel === 1) setCurrentData(dataGameQuestionOne);
    else if (currentLevel === 2) setCurrentData(dataGameQuestionTwo);
    else if (currentLevel === 3) setCurrentData(dataGameQuestionThree);
  }, [currentLevel]);

  const currentQuestion = currentData[currentQuestionIndex];

  const handleAnswerPress = (selectedOption) => {
    const isCorrect = selectedOption === currentQuestion.answer;
    setShowFeedback(isCorrect ? "correct" : "incorrect");
    if (isCorrect) setScore(score + 1);

    setTimeout(() => {
      setShowFeedback(null);
      if (currentQuestionIndex < currentData.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        calculateRewards();
        setIsFinished(true);
      }
    }, 1000);
  };

  const calculateRewards = () => {
    const percentage = (score / currentData.length) * 100;
    let rewardArray = [];

    if (percentage >= 50 && percentage < 70) {
      rewardArray =
        Math.random() > 0.5
          ? [Imgs.dau, Imgs.dau]
          : Math.random() > 0.5
          ? [Imgs.sau, Imgs.sau]
          : [Imgs.dau, Imgs.sau];
    } else if (percentage >= 70) {
      rewardArray =
        Math.random() > 0.5
          ? [Imgs.dau, Imgs.dau, Imgs.sau]
          : Math.random() > 0.5
          ? [Imgs.sau, Imgs.sau, Imgs.dau]
          : [Imgs.dau, Imgs.dau, Imgs.dau];
    } else {
      rewardArray = ["Không có phần thưởng nào"];
    }

    setRewards(rewardArray);
  };

  const handleContinue = () => {
    if (currentLevel < 3 && score >= currentData.length / 2) {
      setCurrentLevel(currentLevel + 1);
      setCurrentQuestionIndex(0);
      setIsFinished(false);
      setScore(0);
      setRewards([]);
    } else if (currentLevel >= 3) {
      Alert.alert("Chúc mừng!", "Bạn đã hoàn thành tất cả cấp độ.");
      stopBackgroundAudio();
      router.push("/PlayGameTropical/playgametropical");
    } else {
      Alert.alert("Bạn cần trả lời đúng ít nhất 50% câu hỏi.");
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setIsFinished(false);
    setRewards([]);
    setShowFeedback(null);
  };

  const handleVolumeToggle = () => {
    if (isMuted) {
      playBackgroundAudio();
    } else {
      stopBackgroundAudio();
    }
    setIsMuted(!isMuted);
  };
  return (
    <ImageBackground source={Imgs.background} style={styles.background}>
      <Text style={styles.levelText}>Cấp {currentLevel}</Text>
      <View style={styles.gradient}>
        {!isFinished ? (
          <View style={styles.gameContainer}>
            <View style={styles.questionContainer}>
              {currentQuestion?.question?.map((imgSrc, idx) => (
                <Image key={idx} source={imgSrc} style={styles.questionImage} />
              ))}
            </View>
            <View style={styles.optionsContainer}>
              {currentQuestion?.options?.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswerPress(option)}
                  disabled={!!showFeedback}
                >
                  <Image source={option} style={styles.optionImage} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View style={styles.resultContainer} onPress={stopBackgroundAudio}>
            <Text style={styles.resultText}>Điểm số của bạn: {score} điểm</Text>
            <Text style={styles.rewardText}>Phần thưởng của bạn:</Text>
            <View style={styles.rewardContainer}>
              {rewards.map((reward, index) => {
                if (typeof reward === "string") {
                  return (
                    <Text key={index} style={styles.noRewardText}>
                      {reward}
                    </Text>
                  );
                }
                return (
                  <Image
                    key={index}
                    source={reward}
                    style={styles.rewardImage}
                  />
                );
              })}
            </View>

            <View style={styles.containerButton}>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={handleRestart}
              >
                <Image source={Imgs.reset} style={styles.button}></Image>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.restartButton}
                onPress={handleContinue}
              >
                <Image source={Imgs.next} style={styles.button}></Image>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      {showFeedback && (
        <View style={styles.overlay}>
          <Video
            source={showFeedback === "correct" ? Videos.dung : Videos.sai}
            style={styles.feedbackImage}
            shouldPlay
            isLooping={false}
          />
        </View>
      )}
      <TouchableOpacity
        style={styles.exitButton}
        onPress={() => {
          router.back();
          stopBackgroundAudio();
        }}
      >
        <Image source={Imgs.back} style={styles.button}></Image>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.volumeButton}
        onPress={handleVolumeToggle}
      >
        {!isMuted ? (
          <Image source={Imgs.volume} style={styles.volume} /> 
        ) : (
          <Image source={Imgs.offvolume} style={styles.volume} /> 
        )}
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
  },
  levelText: {
    fontSize: 20,
    fontFamily: Fonts.NUNITO_BLACK,
    textAlign: "center",
    color: "#999999",
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameContainer: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 30,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
  },
  questionContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 30,

    borderRadius: 15,
  },
  questionImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginHorizontal: 5,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  optionButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    borderRadius: 10,
  },
  optionImage: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },
  resultContainer: {
    alignItems: "center",
  },
  resultText: {
    fontSize: 24,
    color: "#000",
    fontFamily: Fonts.NUNITO_BLACK,
    marginBottom: 20,
  },
  containerButton: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 30,
  },
  restartButton: {
    marginVertical: 10,
    padding: 10,
    borderRadius: 50,
    backgroundColor: "#28a745",
    borderRadius: 50,
  },
  button: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },
  volume: {
    width: 30,
    height: 30,
  },
  restartText: {
    color: "white",
    fontSize: 18,
  },
  overlay: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center", 
  },

  feedbackImage: {
    width: 300,
    height: 300,
    resizeMode: "contain", 
    top: "20%",
    left: "10%",
  },

  feedbackText: {
    fontSize: 24,
    color: "white",
  },

  exitButton: {
    position: "absolute",
    top: 20,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#dc3545",
    borderRadius: 50,
    zIndex: 1,
  },
  volumeButton: {
    position: "absolute",
    top: 90,
    left: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#dc3545",
    borderRadius: 50,
    zIndex: 1,
  },
  rewardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  rewardImage: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    resizeMode: "contain",
  },
  rewardText: {
    fontSize: 20,
    color: "#000",
    fontFamily: Fonts.NUNITO_BLACK,
    marginBottom: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  noRewardText: {
    fontSize: 20,
    color: "red",
    fontFamily: Fonts.NUNITO_BLACK,
    marginTop: 10,
  },
});

export default LevelGameScreen;
