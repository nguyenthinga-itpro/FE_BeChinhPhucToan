import api from "../constants/API";

export const getByStudentAndExercise = async (studentID, exerciseID) => {
  try {
    const response = await api.get("/ExerciseStatus/GetByStudent&Exercise", { params: { studentID, exerciseID } });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding exercise statuses error: ", error.response?.data || error.message);
    throw error;
  }
};

export const addExerciseStatus = async (status) => {
    try {
      const response = await api.post("/ExerciseStatus", status);
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      console.log("Create exercise status error: ", error.response?.data || error.message);
      throw error;
    }
  };