import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { Icons } from "../../constants/Screen/Icons";
import { LinearGradient } from "expo-linear-gradient";
import { Fonts } from "../../constants/Fonts";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../constants/API";
import { getByExerciseId } from "../../api/question";

export default function ExerciseScreen() {
  const router = useRouter();
  const { exerciseData, color } = useLocalSearchParams();
  const gradientColors = color ? color.split(",") : ["#FFB6C1", "#FF69B4"];

  const exerciseObject = JSON.parse(exerciseData);
  console.log(exerciseObject);

  const [randomizedQuestions, setRandomizedQuestions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [showSolutions, setShowSolutions] = useState({});

  const fetchData = async () => {
    try {
      const storedData = await getByExerciseId(exerciseObject.id);
      const randomized = storedData.map((item) => ({
        ...item,
        shuffledOptions: randomizeOptions(item), // Thêm trường đáp án đã trộn
      }));
      setRandomizedQuestions(randomized)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Gọi hàm fetchData khi component mount
  }, []); // useEffect chạy một lần khi component mount

  const handleOptionSelect = (questionIndex, option) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [questionIndex]: option,
    }));
  };

  const toggleSolution = (index) => {
    setShowSolutions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const randomizeOptions = (item) => {
    const options = [
      item.answer,
      item.wrongAnswer1,
      item.wrongAnswer2,
      item.wrongAnswer3,
    ];
    return options.sort(() => Math.random() - 0.5); // Trộn ngẫu nhiên
  };

  const lessonDetails = {
    "Bài tập cộng và trừ": {
      theory: "Luyện tập phép cộng và trừ giúp hiểu rõ cách thực hiện.",
      questions: [
        {
          question: "5 + 3 = ?",
          options: ["6", "7", "8", "9"],
          answer: "8",
          solution: "5 + 3 = 8 vì khi cộng 5 với 3, ta được 8.",
        },
        {
          question: "10 - 4 = ?",
          options: ["5", "6", "7", "8"],
          answer: "6",
          solution: "10 - 4 = 6 vì khi lấy 10 trừ đi 4, ta được 6.",
        },
      ],
    },
    "Bài tập nhân và chia": {
      theory: "Luyện tập phép nhân và chia giúp hiểu rõ cách thực hiện.",
      questions: [
        {
          question: "3 × 4 = ?",
          options: ["9", "10", "11", "12"],
          answer: "12",
          solution: "3 nhân với 4 bằng 12 vì 3 + 3 + 3 + 3 = 12.",
        },
        {
          question: "16 ÷ 4 = ?",
          options: ["2", "3", "4", "5"],
          answer: "4",
          solution:
            "16 chia 4 bằng 4 vì 16 có thể chia thành 4 phần bằng nhau.",
        },
      ],
    },
  };

  const details = lessonDetails["Bài tập cộng và trừ"] || {
    theory: "Không có dữ liệu lý thuyết.",
    questions: [],
  };

  // const [selectedOptions, setSelectedOptions] = useState(
  //   Array(details.questions.length).fill(null)
  // );
  // const [showSolutions, setShowSolutions] = useState(
  //   Array(details.questions.length).fill(false)
  // );

  // const handleOptionSelect = (questionIndex, selectedOption) => {
  //   setSelectedOptions((prev) => {
  //     const newSelections = [...prev];
  //     newSelections[questionIndex] = selectedOption;
  //     return newSelections;
  //   });
  // };

  // const toggleSolution = (index) => {
  //   setShowSolutions((prev) => {
  //     const newShowSolutions = [...prev];
  //     newShowSolutions[index] = !newShowSolutions[index];
  //     return newShowSolutions;
  //   });
  // };

  return (
    <LinearGradient colors={gradientColors} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.goBackButton}
          onPress={() => router.back()}
        >
          <Image source={Icons.back} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.title}>
          {exerciseObject.name || "Không có tiêu đề"}
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {/* <Text style={styles.sectionTitle}>YÊU CẦU</Text> */}
        {/* <Text style={styles.text}>{details.theory}</Text> */}

        {/* {details.questions.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>BÀI TẬP</Text>
            {details.questions.map((item, index) => {
              const isCorrect = selectedOptions[index] === item.answer;

              return (
                <View key={index} style={styles.questionContainer}>
                  <Text style={styles.question}>{item.question}</Text>
                  <View style={styles.optionsContainer}>
                    {item.options.map((option, optIndex) => {
                      const isSelected = selectedOptions[index] === option;

                      return (
                        <TouchableOpacity
                          key={optIndex}
                          style={[
                            styles.optionItem,
                            isSelected
                              ? isCorrect
                                ? styles.correctAnswer
                                : styles.wrongAnswer
                              : null,
                          ]}
                          onPress={() => handleOptionSelect(index, option)}
                        >
                          <Text style={styles.option}>{option}</Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>

                  <TouchableOpacity
                    style={styles.solutionButton}
                    onPress={() => toggleSolution(index)}
                  >
                    <Text style={styles.solutionButtonText}>
                      {showSolutions[index] ? "Ẩn Cách Giải" : "Xem Cách Giải"}
                    </Text>
                  </TouchableOpacity>

                  {showSolutions[index] && (
                    <View style={styles.solutionContainer}>
                      <Text style={styles.solutionText}>{item.solution}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </>
        )} */}

{randomizedQuestions.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>BÀI TẬP</Text>
          {randomizedQuestions.map((item, index) => {
            const options = item.shuffledOptions; // Lấy danh sách đáp án đã trộn
            const isCorrect = selectedOptions[index] === item.answer;

            return (
              <View key={index} style={styles.questionContainer}>
                <Text style={styles.question}>{item.question}</Text>
                <View style={styles.optionsContainer}>
                  {options.map((option, optIndex) => {
                    const isSelected = selectedOptions[index] === option;

                    return (
                      <TouchableOpacity
                        key={optIndex}
                        style={[
                          styles.optionItem,
                          isSelected
                            ? isCorrect
                              ? styles.correctAnswer
                              : styles.wrongAnswer
                            : null,
                        ]}
                        onPress={() => handleOptionSelect(index, option)}
                      >
                        <Text style={isSelected
                              ? styles.chooseOption
                              : styles.option}>{option}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <TouchableOpacity
                  style={styles.solutionButton}
                  onPress={() => toggleSolution(index)}
                >
                  <Text style={styles.solutionButtonText}>
                    {showSolutions[index] ? "Ẩn Cách Giải" : "Xem Cách Giải"}
                  </Text>
                </TouchableOpacity>

                {showSolutions[index] && (
                  <View style={styles.solutionContainer}>
                    <Text style={styles.solutionText}>{item.solution}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </>
      )}
      </ScrollView>
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
    flexDirection: "row",
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
    fontSize: 24,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
  },
  content: {
    flexGrow: 1,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#fff",
    marginVertical: 10,
  },
  text: {
    fontSize: 14,
    color: "#333",
    backgroundColor: "#fff",
    fontFamily: Fonts.NUNITO_BLACK,
    padding: 10,
    borderRadius: 5,
  },
  questionContainer: {
    marginBottom: 15,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 10,
    borderRadius: 8,
  },
  question: {
    fontSize: 20,
    fontFamily: Fonts.NUNITO_BLACK,
    color: "#000",
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  optionItem: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 10,
  },
  chooseOption: {
    fontSize: 16,
    color: "#fff",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  option: {
    fontSize: 16,
    color: "#000",
    fontFamily: Fonts.NUNITO_BLACK,
  },
  correctAnswer: {
    color: "#ffffff",
    backgroundColor: "green",
  },
  wrongAnswer: {
    backgroundColor: "red",
  },
  solutionButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 5,
  },
  solutionButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  solutionContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  solutionText: {
    fontSize: 14,
    color: "#333",
    fontFamily: Fonts.NUNITO_BLACK,
  },
});
