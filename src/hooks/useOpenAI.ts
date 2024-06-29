import { useState } from "react";
import axios from "axios";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export const useOpenAI = () => {
  const [isLoading, setIsLoading] = useState(false);

  const generateQuiz = async (
    videoTranscript: string
  ): Promise<QuizQuestion[]> => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://api.openai.com/v1/engines/davinci-codex/completions",
        {
          prompt: `Generate a quiz with 5 multiple-choice questions based on the following transcript:\n\n${videoTranscript}\n\nFormat each question as JSON like this:\n{"question": "...", "options": ["...", "...", "...", "..."], "correctAnswer": "..."}`,
          max_tokens: 1000,
          n: 1,
          stop: null,
          temperature: 0.7,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const quizString = response.data.choices[0].text;
      const quizQuestions: QuizQuestion[] = JSON.parse(`[${quizString}]`);

      return quizQuestions;
    } catch (error) {
      console.error("Error generating quiz:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { generateQuiz, isLoading };
};
