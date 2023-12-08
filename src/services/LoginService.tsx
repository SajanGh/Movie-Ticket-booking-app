import { authApi } from "../api/authApi";

export const LoginService = async (email: string, password: string) => {
  try {
    const response = await authApi.post("/login", {
      email,
      password,
    });

    if (response.data && response.data.accessToken) {
      return { token: response.data.accessToken };
    } else {
      throw new Error("Invalid response from the server");
    }
  } catch (error) {
    console.log("Error in loginService", error);
    throw error;
  }
};
