import { createSlice } from "@reduxjs/toolkit";
import {
  fetchExamQuestions,
  fetchQuestionsByTopic,
  fetchQuestionsByIds,
  fetchStudentStatistics,
  saveTestResult,
  fetchQuestionTopics,
  editQuestion,
  fetchPendingHomework,
} from "./operations";

const testsSlice = createSlice({
  name: "tests",
  initialState: {
    topics: [],
    questions: [], // Питання для поточного тесту/іспиту/роботи над помилками
    completedTopics: [], // Масив повністю пройдених тем студентом
    failedTopics: [],
    statistics: null, // Об'єкт актуальної статистики студента
    pendingHomework: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    clearCurrentQuestions: (state) => {
      state.questions = [];
    },
    clearTestsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionTopics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchQuestionTopics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topics = action.payload;
      })
      .addCase(fetchQuestionTopics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // 1. Отримання 20 випадкових питань (Екзамен)
      .addCase(fetchExamQuestions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.questions = [];
      })
      .addCase(fetchExamQuestions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
      })
      .addCase(fetchExamQuestions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 2. Отримання питань за конкретною темою
      .addCase(fetchQuestionsByTopic.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.questions = [];
      })
      .addCase(fetchQuestionsByTopic.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsByTopic.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 3. Отримання питань за масивом ID (Робота над помилками)
      .addCase(fetchQuestionsByIds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.questions = [];
      })
      .addCase(fetchQuestionsByIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.questions = action.payload;
      })
      .addCase(fetchQuestionsByIds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 4. Збереження результату тестування
      .addCase(saveTestResult.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveTestResult.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(saveTestResult.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // 5. Отримання найновішої статистики студента
      .addCase(fetchStudentStatistics.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.statistics = action.payload.statistics;
        state.completedTopics = action.payload.completedTopics;
        state.failedTopics = action.payload.failedTopics;
      })
      .addCase(fetchStudentStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(editQuestion.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(editQuestion.fulfilled, (state, action) => {
        state.isLoading = false;
        const updatedQuestion = action.payload.question || action.payload;
        const index = state.questions.findIndex(
          (q) => q._id === updatedQuestion._id
        );
        if (index !== -1) {
          state.questions[index] = updatedQuestion;
        }
      })
      .addCase(editQuestion.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Домашки студента
      .addCase(fetchPendingHomework.fulfilled, (state, action) => {
        state.isLoading = false;
        state.pendingHomework = action.payload;
      });
  },
});

export const { clearCurrentQuestions, clearTestsError } = testsSlice.actions;
export const testsReducer = testsSlice.reducer;
