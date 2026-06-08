import { createSelector } from "@reduxjs/toolkit";

export const selectCurrentQuestions = (state) => state.tests.questions;
export const selectCompletedTopics = (state) => state.tests.completedTopics;
export const selectStudentStatistics = (state) => state.tests.statistics;
export const selectIsTestsLoading = (state) => state.tests.isLoading;
export const selectTestsError = (state) => state.tests.error;
export const selectRawQuestionTopics = (state) => state.tests.topics;
export const selectFailedTopics = (state) => state.tests.failedTopics;
// сортування по нормальному (1 2 3 4)
export const selectQuestionTopics = createSelector(
  [selectRawQuestionTopics],
  (topics) => {
    if (!topics || topics.length === 0) return [];

    return [...topics].sort((a, b) => {
      const matchA = a._id?.match(/Тема\s+(\d+(?:\.\d+)?)/);
      const matchB = b._id?.match(/Тема\s+(\d+(?:\.\d+)?)/);

      if (!matchA || !matchB) return 0;

      const numA = parseFloat(matchA[1]);
      const numB = parseFloat(matchB[1]);

      return numA - numB;
    });
  }
);
export const selectPendingHomework = (state) => state.tests.pendingHomework;
