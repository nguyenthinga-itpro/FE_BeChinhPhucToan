import api from "../constants/API";

export const getStudent = async (userId) => {
  try {
    const response = await api.get(`/Student/${userId}`);
    console.log("Students list:", response.data);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding students error: ", error.response?.data || error.message);
    throw error;
  }
};

export const addStudent = async (student) => {
    try {
      const response = await api.post("/Student", student);
      return response.data; // Dữ liệu trả về từ API
    } catch (error) {
      console.log("Create student error: ", error.response?.data || error.message);
      throw error;
    }
  };