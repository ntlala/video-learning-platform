import React from "react";
import Quiz from "../components/Quiz";

const QuizPage: React.FC = () => {
  return (
    <div>
      <Quiz
        questions={[]}
        onComplete={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </div>
  );
};

export default QuizPage;
