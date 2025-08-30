import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TouchableWithoutFeedback } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter, useLocalSearchParams } from "expo-router";
import ExtensionHome from "../../app/ExtensionHome/[extensionhome]";
import iconextension from "../../assets/images/four-extension.png";
import tinycolor from "tinycolor2";
import { Fonts } from "../../constants/Fonts";
import { Icons } from "../../constants/Screen/Icons";
export default function TestScreen() {
  const navigation = useNavigation();
  const router = useRouter();
  const { color } = useLocalSearchParams();
  const totalQuestions = 3;
  const totalTime = 1200;
  const gradientColors = color ? color.split(",") : ["#FFB6C1", "#FF69B4"];
  const firstColor = gradientColors[0];
  const secondColor = gradientColors[1];
  const darkerFirstColor = tinycolor(firstColor).darken(15).toString();
  const darkerSecondColor = tinycolor(secondColor).darken(15).toString();
  const questions = [
    {
      id: 1,
      title: "2 + 2 = ?",
      options: [
        { id: 1, text: "3" },
        { id: 2, text: "4", isCorrect: true },
        { id: 3, text: "5" },
        { id: 4, text: "6" },
      ],
    },
    {
      id: 2,
      title: "5 + 3 = ?",
      options: [
        { id: 1, text: "7" },
        { id: 2, text: "8", isCorrect: true },
        { id: 3, text: "9" },
        { id: 4, text: "10" },
      ],
    },
    {
      id: 3,
      title: "6 + 4 = ?",
      options: [
        { id: 1, text: "9" },
        { id: 2, text: "10", isCorrect: true },
        { id: 3, text: "11" },
        { id: 4, text: "12" },
      ],
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(totalTime);
  const [timerActive, setTimerActive] = useState(true);
  const handleAnswerSelect = (answerId, questionId) => {
    setSelectedAnswers((prevSelectedAnswers) => [
      ...prevSelectedAnswers,
      { questionId, answerId },
    ]);
  };

  const handleSubmit = () => {
    alert("Bạn đã nộp bài!");
    router.push("/ResultTest/resulttest");
  };

  useEffect(() => {
    if (timerActive && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      if (timeRemaining === 0) {
        clearInterval(timer);
        handleSubmit();
      }

      return () => clearInterval(timer);
    }
  }, [timeRemaining, timerActive]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const completedQuestions = currentQuestionIndex + 1;

  const isAnswerCorrect = (answerId, questionId) => {
    const question = questions.find((q) => q.id === questionId);
    const correctOption = question.options.find((option) => option.isCorrect);
    return correctOption && correctOption.id === answerId;
  };
  // phúc thêm di chuyển extension
  const speedFactor = 1;
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
    <LinearGradient colors={gradientColors} style={styles.container}>
      {showExtension && (
        <TouchableWithoutFeedback onPress={closeExtension}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>
      )}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => navigation.goBack()}
        >
          <Image source={Icons.back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>Kiểm Tra</Text>
        {/* phúc thêm extension */}
        <View style={styles.extension}>
          {showExtension && <ExtensionHome onClose={() => setShowExtension(false)} />}
        </View>
        {/* phúc thêm nút extension */}
        <View
          style={[
            styles.extensionhome,
            {
              left: extensionPosition.x + 10,
              top: extensionPosition.y - 10,
            },
          ]}
          onStartShouldSetResponder={() => true}
          onResponderGrant={handleTouchStart}
          onResponderMove={handleTouchMove}
          onResponderRelease={handleTouchEnd}
        >
          <Image source={iconextension} style={styles.iconextension}></Image>
        </View>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressInfo}>
          <View style={styles.QuestionTime}>
            <Text style={styles.progressText}>
              Câu hỏi: {completedQuestions} / {totalQuestions}
            </Text>
            <Text style={styles.timeText}>
              Thời gian: {formatTime(timeRemaining)}
            </Text>
          </View>
          <View
            style={[
              styles.progressBarContainer,
              { backgroundColor: secondColor, borderColor: darkerSecondColor },
            ]}
          >
            <LinearGradient
              colors={[darkerFirstColor, darkerSecondColor]}
              style={[
                styles.progressBar,
                {
                  width: `${(completedQuestions / totalQuestions) * 100}%`,
                },
              ]}
            />
          </View>
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.contentTitle}>
          Chọn đáp án đúng cho phép tính sau:
        </Text>
        <Text style={styles.questionText}>{currentQuestion.title}</Text>

        <ScrollView style={styles.optionsContainer}>
          {currentQuestion.options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionButton,
                {
                  backgroundColor: selectedAnswers.some(
                    (answer) =>
                      answer.questionId === currentQuestion.id &&
                      answer.answerId === option.id
                  )
                    ? isAnswerCorrect(option.id, currentQuestion.id)
                      ? "#b0e0c6"
                      : "#fab9bd"
                    : "#ffffff",
                },
              ]}
              onPress={() => handleAnswerSelect(option.id, currentQuestion.id)}
            >
              <Text
                style={[
                  styles.optionText,
                  {
                    color: selectedAnswers.some(
                      (answer) =>
                        answer.questionId === currentQuestion.id &&
                        answer.answerId === option.id
                    )
                      ? "white"
                      : "#333",
                  },
                ]}
              >
                {option.text}
              </Text>
              {selectedAnswers.some(
                (answer) =>
                  answer.questionId === currentQuestion.id &&
                  answer.answerId === option.id
              ) && (
                  <Icon
                    name={
                      isAnswerCorrect(option.id, currentQuestion.id)
                        ? "checkmark-circle"
                        : "close-circle"
                    }
                    size={20}
                    color={
                      isAnswerCorrect(option.id, currentQuestion.id)
                        ? "green"
                        : "red"
                    }
                    style={styles.icon}
                  />
                )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {isFinished ? (
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Nộp Bài</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              if (currentQuestionIndex < totalQuestions - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
              } else {
                setIsFinished(true);
              }
            }}
          >
            <Text style={styles.nextButtonText}>Tiếp Theo</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  goBackButton: {
    position: "absolute",
    left: 10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  back: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 30,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
  },
  progressContainer: {
    paddingHorizontal: 16,
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressInfo: {
    flex: 1,
  },
  QuestionTime: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    marginBottom: 5,
  },
  timeText: {
    fontSize: 14,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    marginBottom: 5,
    left: 120,
  },
  progressBarContainer: {
    height: 10,
    borderWidth: 1,
    borderRadius: 5,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  progressBar: {
    height: "100%",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    marginVertical: 20,
    paddingVertical: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  contentTitle: {
    fontSize: 14,
    color: "#808285",
    fontFamily: Fonts.NUNITO_BLACK,
    marginBottom: 20,
    textAlign: "center",
  },
  questionText: {
    fontSize: 36,
    color: "#333",
    fontFamily: Fonts.NUNITO_BLACK,
    textAlign: "center",
    marginBottom: 10,
  },
  optionsContainer: {
    width: "100%",
    paddingHorizontal: 30,
  },
  optionButton: {
    marginBottom: 10,
    paddingVertical: 8,
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

  },
  optionText: {
    fontSize: 18,
    fontFamily: Fonts.NUNITO_BLACK,
  },
  icon: {
    left: -20,
  },
  footer: {
    alignItems: "flex-end",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  nextButton: {
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#333",
  },
  submitButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
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
    top: -25,
  },

});
