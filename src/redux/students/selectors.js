export const selectStudentsList = (state) => state.students.items;
export const selectIsStudentsLoading = (state) => state.students.isLoading;
export const selectStudentsError = (state) => state.students.error;
export const selectStudentsSuccessMessage = (state) =>
  state.students.successMessage;

export const selectActiveStudentsCount = (state) => {
  return state.students.items.filter((student) => student.status === "active")
    .length;
};
export const selectTeachersList = (state) => state.students.teachers;
export const selectTotalActiveCount = (state) =>
  state.students.totalActiveCount;
