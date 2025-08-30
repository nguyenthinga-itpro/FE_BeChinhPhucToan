import api from "../constants/API";

export const getByStudentAndLesson = async (studentID, lessonID) => {
  try {
    const response = await api.get("/LessonStatus/GetByStudent&Lesson", { params: { studentID, lessonID } });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding lesson statuses error: ", error.response?.data || error.message);
    throw error;
  }
};

export const addLessonStatus = async (status) => {
    try {
      const response = await api.post("/LessonStatus", status);
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      console.log("Create Lesson Status error: ", error.response?.data || error.message);
      throw error;
    }
  };