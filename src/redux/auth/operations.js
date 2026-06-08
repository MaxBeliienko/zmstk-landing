import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = "https://zmstk-back.onrender.com/api/users";

// Автоматична перевірка сесії при оновленні сторінки
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/me`);
      return response.data; // Повертає об'єкт користувача
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Не авторизовано"
      );
    }
  }
);

// Вхід у систему
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка входу"
      );
    }
  }
);

// Вихід із системи
export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkAPI) => {
    try {
      await axios.post(`${API_URL}/logout`);
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue("Помилка при виході");
    }
  }
);
