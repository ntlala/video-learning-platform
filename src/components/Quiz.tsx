import React, { useState } from "react";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleAnswerChange = (index: number, answer: string) => {
    const newAnswers = [...userAnswers];
    newAnswers[index] = answer;
    setUserAnswers(newAnswers);
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctCount++;
      }
    });
    const calculatedScore = (correctCount / questions.length) * 100;
    setScore(calculatedScore);
    onComplete(calculatedScore);
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index} className="mb-3">
          <h3>{question.question}</h3>
          {question.options.map((option, optIndex) => (
            <div key={optIndex}>
              <input
                type="radio"
                id={`q${index}o${optIndex}`}
                name={`question${index}`}
                value={option}
                onChange={() => handleAnswerChange(index, option)}
              />
              <label htmlFor={`q${index}o${optIndex}`}>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit Quiz</button>
      {score !== null && (
        <div>
          <p>Your score: {score}%</p>
        </div>
      )}
    </div>
  );
};

export default Quiz;
