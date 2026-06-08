import { createSlice } from "@reduxjs/toolkit";
import {
  addUser,
  searchStudents,
  updateUser,
  deleteUser,
  fetchTeachers,
} from "./operations";

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    items: [],
    teachers: [],
    totalActiveCount: 0,
    isLoading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    clearStudentsError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Додавання користувача
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.successMessage = action.payload.message;
        if (action.payload.user) {
          if (action.payload.user.role === "student") {
            state.items.push(action.payload.user);
            // 🌟 ОНОВЛЕННЯ ЛІЧИЛЬНИКА: Додали студента — лічильник збільшився на 1
            state.totalActiveCount += 1;
          } else if (action.payload.user.role === "teacher") {
            state.teachers.push(action.payload.user);
          }
        }
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        // 1. Шукаємо та оновлюємо в масиві студентів (якщо це student)
        const studentIndex = state.items.findIndex(
          (user) =>
            user._id === action.payload.user?._id ||
            user._id === action.payload._id
        );
        if (studentIndex !== -1) {
          state.items[studentIndex] = action.payload.user || action.payload;
        }

        // 2. КРИТИЧНО: Шукаємо та оновлюємо в масиві викладачів (якщо це викладач)
        const teacherIndex = state.teachers.findIndex(
          (user) =>
            user._id === action.payload.user?._id ||
            user._id === action.payload._id
        );
        if (teacherIndex !== -1) {
          state.teachers[teacherIndex] = action.payload.user || action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;

        const targetId = action.payload.id || action.payload;

        // Перевіряємо, чи видалений користувач був студентом, щоб зменшити лічильник
        const isStudentDeleted = state.items.some(
          (user) => user._id === targetId
        );
        if (isStudentDeleted) {
          // 🌟 ОНОВЛЕННЯ ЛІЧИЛЬНИКА: Видалили студента — зменшуємо на 1
          state.totalActiveCount = Math.max(0, state.totalActiveCount - 1);
        }

        state.items = state.items.filter((user) => user._id !== targetId);
        state.teachers = state.teachers.filter((user) => user._id !== targetId);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // отримання викладачів
      .addCase(fetchTeachers.fulfilled, (state, action) => {
        state.teachers = action.payload;
      })

      // Пошук студентів
      .addCase(searchStudents.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchStudents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;

        // 🌟 МАГІЯ ЛІЧИЛЬНИКА:
        // Якщо лічильник ще порожній (0), значить це перше завантаження ВСІХ студентів при старті.
        // Фіксуємо цю цифру як загальну кількість активних людей у базі!
        // Під час наступних пошуків (коли action.payload.length зменшиться), ця умова виконана НЕ буде,
        // і лічильник збереже своє первісне глобальне значення.
        if (state.totalActiveCount === 0 && action.payload.length > 0) {
          state.totalActiveCount = action.payload.length;
        }
      })
      .addCase(searchStudents.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearStudentsError, clearSuccessMessage } =
  studentsSlice.actions;
export const studentsReducer = studentsSlice.reducer;
