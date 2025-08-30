import api from "../constants/API";

export const getUserExist = async (email) => {
  try {
    const response = await api.get("/User/UserExist", { params: { email } });
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding user error: ", error.response?.data || error.message);
    throw error;
  }
};

export const getUserNoneExist = async (email) => {
  try {
    const response = await api.get("/User/UserNoneExist", { params: { email } });
    return; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Finding none existexist user error: ", error.response?.data || error.message);
    throw error;
  }
};

export const addUser = async (user) => {
  try {
    const response = await api.post("/User", user);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Create user error: ", error.response?.data || error.message);
    throw error;
  }
};