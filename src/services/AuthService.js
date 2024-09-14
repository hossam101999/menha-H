const BASE_URL = "https://menha-backend.vercel.app";

export const signup = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/signup`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.message && data.message.toLowerCase().includes("email")) {
        throw new Error("Email already exists");
      }
      throw new Error(data.message || "Failed to sign up");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to log in");
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};

export const resetPassword = async (
  token,
  email,
  newPassword,
  confirmPassword
) => {
  try {
    const response = await fetch(`${BASE_URL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        email,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to reset password.");
    }

    return data;
  } catch (error) {
    console.error("Error during password reset:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

export const forgetPassword = async (email) => {
  try {
    const response = await fetch(`${BASE_URL}/forget-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to send reset password email");
    }

    return data;
  } catch (error) {
    console.error("Error during forget password:", error);
    throw error;
  }
};

export const checkResetPasswordToken = async (email, token) => {
  try {
    const response = await fetch(`${BASE_URL}/check-reset-password-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Invalid token or token has expired.");
    }

    return data;
  } catch (error) {
    console.error("Error during token check:", error);
    throw error;
  }
};
