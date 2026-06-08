import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const API_URL = "https://zmstk-back.onrender.com/api/users";

// Створення нового користувача (студента, викладача, адміна) з обмеженням днів
export const addUser = createAsyncThunk(
  "students/addUser",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/add-student`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при створенні користувача"
      );
    }
  }
);

export const updateUser = createAsyncThunk(
  "students/updateUser",
  async ({ id, userData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка оновлення"
      );
    }
  }
);

export const deleteUser = createAsyncThunk(
  "students/deleteUser",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      return { id, message: response.data.message };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка видалення"
      );
    }
  }
);

export const fetchTeachers = createAsyncThunk(
  "students/fetchTeachers",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "https://zmstk-back.onrender.com/api/users/teachers"
      );
      return response.data; // Повертає масив викладачів
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка завантаження викладачів"
      );
    }
  }
);

// Пошук студентів за номером групи та/або прізвищем/іменем
export const searchStudents = createAsyncThunk(
  "students/searchStudents",
  async ({ groupNumber, name } = {}, thunkAPI) => {
    try {
      const params = {};
      if (groupNumber) params.groupNumber = groupNumber;
      if (name) params.name = name;

      const response = await axios.get(`${API_URL}/search`, { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при пошуку"
      );
    }
  }
);
