import api from "../constants/API";

export const getLessonType = async (name, grade) => {
  try {
    const response = await api.get("/LessonType", { params: { name, grade } });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding lesson type error: ", error.response?.data || error.message);
    throw error;
  }
};