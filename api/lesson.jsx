import api from "../constants/API";

export const lessonGetByLessonType = async (lessonTypeID) => {
  try {
    const response = await api.get("/Lesson/GetByLessonType", { params: { lessonTypeID } });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding lessons error: ", error.response?.data || error.message);
    throw error;
  }
};

export const getLessonCount = async (lessonTypeID) => {
  try {
    const response = await api.get("/Lesson/GetLessonCount", { params: { lessonTypeID } });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Count lessons error: ", error.response?.data || error.message);
    throw error;
  }
};

export const getLesson = async (lessonId) => {
  try {
    const response = await api.get(`/Lesson/${lessonId}`);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding lesson error: ", error.response?.data || error.message);
    throw error;
  }
};