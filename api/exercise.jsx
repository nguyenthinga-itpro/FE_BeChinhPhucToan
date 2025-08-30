import api from "../constants/API";

export const exerciseGetByLessonType = async (lessonTypeID) => {
  try {
    const response = await api.get("/Exercise/GetByLessonType", { params: { lessonTypeID } });
    console.log("Exercise list: ", response.data)
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding exercises error: ", error.response?.data || error.message);
    throw error;
  }
};

export const getExerciseCount = async (lessonTypeID) => {
  try {
    const response = await api.get("/Exercise/GetExerciseCount", { params: { lessonTypeID } });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Count exercises error: ", error.response?.data || error.message);
    throw error;
  }
};

export const getExercise = async (lessonId) => {
  try {
    const response = await api.get(`/Exercise/${lessonId}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding exercise error: ", error.response?.data || error.message);
    throw error;
  }
};