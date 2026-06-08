import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.withCredentials = true;
const QUESTIONS_URL = "https://zmstk-back.onrender.com/api/questions";
const TESTS_URL = "https://zmstk-back.onrender.com/api/tests";

// Отримати 20 випадкових питань (Режим Екзамену)
export const fetchExamQuestions = createAsyncThunk(
  "tests/fetchExamQuestions",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${QUESTIONS_URL}/exam`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка завантаження екзамену"
      );
    }
  }
);

// Отримати питання за конкретною темою
export const fetchQuestionsByTopic = createAsyncThunk(
  "tests/fetchQuestionsByTopic",
  async (topicName, thunkAPI) => {
    try {
      const response = await axios.get(
        `${QUESTIONS_URL}/topic/${encodeURIComponent(topicName)}`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка завантаження теми"
      );
    }
  }
);

// Отримати повні дані питань за масивом ID (для роботи над помилками)
export const fetchQuestionsByIds = createAsyncThunk(
  "tests/fetchQuestionsByIds",
  async (idsArray, thunkAPI) => {
    try {
      const response = await axios.post(`${QUESTIONS_URL}/by-ids`, {
        ids: idsArray,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка завантаження питань за ID"
      );
    }
  }
);

// Отримання усіх назв тем і к-сті питань до них
export const fetchQuestionTopics = createAsyncThunk(
  "students/fetchTopics",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${QUESTIONS_URL}/topics`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Не вдалося завантажити теми"
      );
    }
  }
);

// Зберегти або перезаписати результат тестування
export const saveTestResult = createAsyncThunk(
  "tests/saveTestResult",
  async (resultData, thunkAPI) => {
    try {
      const response = await axios.post(`${TESTS_URL}/save`, resultData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка збереження результату"
      );
    }
  }
);

// Редагувати питання (ДОСТУПНО АДМІНУ)
export const editQuestion = createAsyncThunk(
  "tests/editQuestion",
  async ({ questionId, updatedData }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${QUESTIONS_URL}/update/${questionId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка при оновленні!"
      );
    }
  }
);

// Отримати найновішу статистику конкретного студента (доступно і викладачу, і студенту)
export const fetchStudentStatistics = createAsyncThunk(
  "tests/fetchStudentStatistics",
  async (studentId, thunkAPI) => {
    try {
      const response = await axios.get(`${TESTS_URL}/statistics/${studentId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Помилка завантаження статистики"
      );
    }
  }
);

// Отримати домашки студента
export const fetchPendingHomework = createAsyncThunk(
  "tests/fetchPendingHomework",
  async (studentId, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://zmstk-back.onrender.com/api/tests/pending-homework/${studentId}`
      );
      return response.data.pendingTopics;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Не вдалося завантажити ДЗ"
      );
    }
  }
);
