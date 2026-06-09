import { useState, useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../redux/auth/selectors";
import {
  fetchExamQuestions,
  fetchQuestionsByTopic,
  fetchQuestionsByIds,
  saveTestResult,
} from "../redux/tests/operations";
import { selectIsTestsLoading } from "../redux/tests/selectors";

import { Timer, ArrowLeft } from "lucide-react";
import TestQuestionsBar from "../components/tests/TestQuestionsBar";
import TestQuestionContent from "../components/tests/TestQuestionContent";
import TestAnswersContent from "../components/tests/TestAnswersContent";
import TestResultsContent from "../components/tests/TestResultsContent";

export default function TestRunPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const user = useSelector(selectUser);
  const userName = user?.name ? user.name.split("(")[0].trim() : "Користувач";
  const mode = searchParams.get("mode");
  const topicId = searchParams.get("id")
    ? decodeURIComponent(searchParams.get("id"))
    : null;

  const questions = useSelector((state) => state.tests.questions) || [];
  const isQuestionsLoading = useSelector(selectIsTestsLoading);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(20 * 60);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Стейт для відстеження режиму роботи над помилками
  const [isMistakesMode, setIsMistakesMode] = useState(false);

  // Блокування інтерфейсу під час 1 секунди підсвічування відповіді
  const [isPendingNext, setIsPendingNext] = useState(false);

  const timerRef = useRef(null);
  const totalTimeRef = useRef(null);

  useEffect(() => {
    if (mode === "exam") dispatch(fetchExamQuestions());
    else if (mode === "theme" && topicId)
      dispatch(fetchQuestionsByTopic(topicId));
  }, [dispatch, mode, topicId]);

  useEffect(() => {
    if (isQuestionsLoading || questions.length === 0 || isFinished) return;

    totalTimeRef.current = setInterval(
      () => setTimeSpent((prev) => prev + 1),
      1000
    );

    if (mode === "exam" && !isMistakesMode) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            clearInterval(totalTimeRef.current);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(timerRef.current);
      clearInterval(totalTimeRef.current);
    };
  }, [isQuestionsLoading, questions, isFinished, mode, isMistakesMode]);

  if (isQuestionsLoading || questions.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 animate-pulse">
          Формування унікального квитка ПДР...
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIdx];

  // МЕХАНІКА ОБРОБКИ ВІДПОВІДІ З СЕРВЕРА
  const handleAnswerSubmit = () => {
    if (selectedAnswerIdx === null || isPendingNext) return;

    const chosenOption = currentQuestion.options[selectedAnswerIdx];
    const isCorrect = chosenOption.isCorrect;

    const updatedAnswers = {
      ...userAnswers,
      [currentQuestion._id]: {
        isCorrect,
        chosenId: chosenOption._id,
        chosenIdx: selectedAnswerIdx,
      },
    };

    setUserAnswers(updatedAnswers);
    setSelectedAnswerIdx(null);
    setIsPendingNext(true);

    const totalErrors = Object.values(updatedAnswers).filter(
      (ans) => !ans.isCorrect
    ).length;

    setTimeout(() => {
      setIsPendingNext(false);

      if (mode === "exam" && !isMistakesMode && totalErrors > 2) {
        finishTest(updatedAnswers);
        return;
      }

      if (Object.keys(updatedAnswers).length === questions.length) {
        finishTest(updatedAnswers);
      } else {
        moveToNextUnanswered(updatedAnswers);
      }
    }, 1500);
  };

  const moveToNextUnanswered = (currentAnswers) => {
    let nextIdx = (currentIdx + 1) % questions.length;
    for (let i = 0; i < questions.length; i++) {
      if (!currentAnswers[questions[nextIdx]._id]) {
        setCurrentIdx(nextIdx);
        return;
      }
      nextIdx = (nextIdx + 1) % questions.length;
    }
  };

  const handleSkipQuestion = () => {
    if (isPendingNext) return;
    setSelectedAnswerIdx(null);
    let nextIdx = (currentIdx + 1) % questions.length;
    for (let i = 0; i < questions.length; i++) {
      if (!userAnswers[questions[nextIdx]._id]) {
        setCurrentIdx(nextIdx);
        return;
      }
      nextIdx = (nextIdx + 1) % questions.length;
    }
    setCurrentIdx(nextIdx);
  };

  const finishTest = (finalAnswers) => {
    clearInterval(timerRef.current);
    clearInterval(totalTimeRef.current);
    setIsFinished(true);
    if (isMistakesMode) {
      return;
    }

    if (!user?._id) return;
    const correctQuestions = [];
    const incorrectQuestions = [];

    questions.forEach((q) => {
      if (finalAnswers[q._id]?.isCorrect) correctQuestions.push(q._id);
      else incorrectQuestions.push(q._id);
    });

    dispatch(
      saveTestResult({
        studentId: user._id,
        type: mode === "exam" ? "exam" : "topic",
        topicName: mode === "theme" ? topicId : undefined,
        correctQuestions,
        incorrectQuestions,
        score: {
          correct: correctQuestions.length,
          total: questions.length,
        },
        timeSpent,
      })
    );
  };

  const handleMistakesReview = () => {
    const incorrectIds = questions
      .filter((q) => userAnswers[q._id] && !userAnswers[q._id]?.isCorrect)
      .map((q) => q._id);

    if (incorrectIds.length === 0) return;

    setIsMistakesMode(true);
    setUserAnswers({});
    setSelectedAnswerIdx(null);
    setCurrentIdx(0);
    setTimeSpent(0);
    setIsFinished(false);
    dispatch(fetchQuestionsByIds(incorrectIds));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (isFinished) {
    const totalCorrect = Object.values(userAnswers).filter(
      (ans) => ans.isCorrect
    ).length;

    const totalMistakes = Object.values(userAnswers).filter(
      (ans) => !ans.isCorrect
    ).length;

    return (
      <TestResultsContent
        mode={isMistakesMode ? "mistakes_review" : mode}
        topicId={topicId}
        totalCorrect={totalCorrect}
        totalQuestions={questions.length}
        timeSpent={timeSpent}
        actualMistakesCount={totalMistakes}
        onMistakesReview={totalMistakes > 0 ? handleMistakesReview : null}
        onReturn={() => navigate("/test")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-white pt-24 pb-12 flex flex-col justify-between transition-colors duration-500">
      <div className="w-full max-w-4xl mx-auto px-4 space-y-5">
        <div className="flex items-start justify-between gap-4 bg-white dark:bg-gray-800 p-4 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xs">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button
              type="button"
              disabled={isPendingNext}
              onClick={() => navigate("/test")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl text-gray-500 transition-all cursor-pointer mt-0.5 disabled:opacity-50"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="flex-1 min-w-0">
              <span
                className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-md ${
                  isMistakesMode
                    ? "bg-purple-500/10 text-purple-500"
                    : mode === "exam"
                    ? "bg-red-500/10 text-red-500"
                    : "bg-amber-500/10 text-amber-500"
                }`}
              >
                {isMistakesMode
                  ? "Робота над помилками"
                  : mode === "exam"
                  ? "Офіційний Іспит"
                  : "Вивчення Теми"}
              </span>

              <h2 className="text-sm md:text-lg font-bold whitespace-normal break-words mt-1 text-gray-900 dark:text-white">
                {isMistakesMode
                  ? "Повторне опрацювання проблемних питань сесії"
                  : mode === "exam"
                  ? `${userName}`
                  : questions[currentIdx]?.topic || topicId}
              </h2>

              {!isMistakesMode && mode !== "exam" && (
                <p className="text-[11px] font-medium text-amber-600 dark:text-amber-400 mt-1">
                  🎯 Для зарахування темы потрібно ≥90% правильних відповідей
                </p>
              )}
            </div>
          </div>
          {mode === "exam" && !isMistakesMode && (
            <div
              className={`flex items-center gap-1.5 font-mono font-black text-sm md:text-xl px-3 py-1.5 rounded-xl border shrink-0 ${
                timeLeft < 120
                  ? "bg-red-500/10 border-red-500/30 text-black dark:text-white animate-pulse"
                  : "bg-gray-50 border-gray-200 text-black dark:bg-gray-900 dark:border-gray-800 dark:text-white"
              }`}
            >
              <Timer size={18} /> {formatTime(timeLeft)}
            </div>
          )}
        </div>

        {/* Контейнер для медіа та відповідей */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
          {currentQuestion?.images && currentQuestion.images.length > 0 && (
            <div className="w-full">
              <TestQuestionContent
                currentIdx={currentIdx}
                question={currentQuestion}
              />
            </div>
          )}

          <div
            className={`w-full ${
              currentQuestion?.images && currentQuestion.images.length > 0
                ? "lg:col-span-1"
                : "lg:col-span-2"
            }`}
          >
            <TestAnswersContent
              questionText={currentQuestion.text}
              options={currentQuestion.options}
              selectedAnswerIdx={selectedAnswerIdx}
              onSelectAnswer={setSelectedAnswerIdx}
              onSkip={handleSkipQuestion}
              onSubmit={handleAnswerSubmit}
              currentIdx={currentIdx}
              totalQuestions={questions.length}
              savedAnswer={userAnswers[currentQuestion?._id]}
              currentQuestionObject={currentQuestion}
              mode={mode}
            />
          </div>
        </div>

        {/* Стрічка питань */}
        <TestQuestionsBar
          questions={questions}
          currentIdx={currentIdx}
          userAnswers={userAnswers}
          onQuestionClick={(idx) => {
            if (isPendingNext) return;
            setSelectedAnswerIdx(null);
            setCurrentIdx(idx);
          }}
        />
      </div>
    </div>
  );
}
