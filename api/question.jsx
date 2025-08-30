import api from "../constants/API";

export const getByExerciseId = async (exerciseID) => {
    try {
      const response = await api.get("/Questions/GetByExerciseId", { params: { exerciseID } });
      console.log("Question list: ", response.data)
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      console.log("Finding questions error: ", error.response?.data || error.message);
      throw error;
    }
  };