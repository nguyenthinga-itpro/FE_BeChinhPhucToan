import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import Logo from "../../assets/images/Logo.png";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from "../../constants/API";

export default function inputtest() {
    const questions = [
        { id: 1, question: "1 + 1 = ?", options: [1, 2, 3, 4], answer: 2 },
        { id: 2, question: "9 + 1 = ?", options: [10, 8, 9, 5], answer: 10 },
        { id: 3, question: "12 - 5 = ?", options: [5, 7, 8, 34], answer: 7 },
        { id: 4, question: "6 x 2 = ?", options: [12, 8, 4, 22], answer: 12 },
    ];

    return (
        <LinearGradient colors={["#fff", "#fff"]} style={styles.container}>
            {/* Header */}
            <LinearGradient colors={["#02a4f5", "#02dbd8"]} style={styles.header}>
                <Text style={styles.title}>Kiểm Tra Đầu Vào</Text>
                <View style={styles.info}>
                    <Text style={styles.infoText}>Số câu hỏi: 20 câu</Text>
                    <Text style={styles.infoText}>Thời gian: 20 phút</Text>
                </View>
            </LinearGradient>

            {/* Nội dung câu hỏi */}
            <ScrollView style={styles.questionsContainer}>
                {questions.map((item, index) => (
                    <View key={item.id} style={styles.questionBox}>
                        <Text style={styles.questionTitle}>Câu {index + 1}:</Text>
                        <Text style={styles.questionContentText}>{item.question}</Text>
                        <View style={styles.options}>
                            {item.options.map((option, idx) => (
                                <TouchableOpacity key={idx} style={[
                                    styles.optionButton,
                                    option === item.answer && styles.correctAnswer
                                ]}>
                                    <Text style={[
                                        styles.optionText,
                                        option === item.answer && styles.optionAnswer
                                    ]}>
                                        {option}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Nút nộp bài */}
            <LinearGradient colors={["#02a4f5", "#02dbd8"]} >
                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Nộp Bài</Text>
                </TouchableOpacity>
            </LinearGradient>

        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: "#02dbd8",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    title: {
        fontSize: 34,
        fontWeight: "bold",
        color: "#fff",
        textAlign: "center",
    },
    info: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },
    infoText: {
        fontSize: 14,
        color: "#fff",
    },
    questionsContainer: {
        padding: 20,
    },
    questionBox: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: "#fff",
        borderRadius: 10,
        // Shadow for iOS
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        // Elevation for Android
        elevation: 5,
    },
    questionText: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },
    options: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    optionButton: {
        width: 65,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f0f0f0",
        borderRadius: 15,
    },
    correctAnswer: {
        backgroundColor: "#59d36a",
        color: "#fff",
    },
    optionAnswer: {
        color: "#fff",
    },
    optionText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
    },
    submitButton: {
        margin: 20,
        marginLeft: 80,
        paddingVertical: 15,
        backgroundColor: "#ffd700",
        borderRadius: 10,
        width: "60%",
        alignItems: "center",
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
    },
    questionTitle: {
        fontSize: 14, // Kích thước chữ nhỏ hơn
        fontWeight: "bold",
    },
    questionContentText: {
        position: "relative",
        left: 80,
        top: -20,
        fontSize: 40, // Kích thước chữ lớn hơn
        fontWeight: "bold",
    },
});
