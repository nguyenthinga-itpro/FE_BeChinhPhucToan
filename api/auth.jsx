import api from "../constants/API";

export const sendOtp = async (email) => {
  try {
    const response = await api.post("/Authentification/send-otp", email);
    console.log(response.data);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Send OTP error: ", error.response?.data || error.message);
    throw error;
  }
};

export const login = async (Email, OTP) => {
  try {
    const response = await api.post("/Authentification/login", {
      Email,
      OTP,
    });
    console.log(response.data);
    return response.data; // Dữ liệu trả về từ API
  } catch (error) {
    console.log("Login error: ", error.response?.data || error.message);
    throw error;
  }
};
