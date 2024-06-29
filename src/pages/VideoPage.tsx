import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VideoPlayer } from "../components/VideoPlayer";
import { useOpenAI } from "../hooks/useOpenAI";
import { Button, Space } from "antd";
import { ArrowLeftOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import Quiz from "../components/Quiz";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

const VideoPage: React.FC = () => {
  const { encodedUrl } = useParams<{ encodedUrl: string }>();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const { generateQuiz, isLoading } = useOpenAI();
  const navigate = useNavigate();

  const videoUrl = decodeURIComponent(encodedUrl || "");
  console.log("Decoded video URL in VideoPage:", videoUrl);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const mockTranscript =
          "This is a mock transcript of the video content...";
        const questions = await generateQuiz(mockTranscript);
        setQuizQuestions(questions);
      } catch (error) {
        console.error("Error fetching video details:", error);
      }
    };

    fetchVideoDetails();
  }, [videoUrl, generateQuiz]);

  const handleQuizComplete = (score: number) => {
    console.log(`Quiz completed with score: ${score}`);
  };

  return (
    <div className="pt-41 p-4">
      <Space
        direction="horizontal"
        style={{
          width: "100%",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          type="primary"
          icon={<ArrowLeftOutlined />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        {!showQuiz && (
          <Button
            type="primary"
            icon={<QuestionCircleOutlined />}
            onClick={() => setShowQuiz(true)}
            loading={isLoading}
          >
            Take Quiz
          </Button>
        )}
      </Space>
      <VideoPlayer videoUrl={videoUrl} />
      {showQuiz && quizQuestions.length > 0 && (
        <Quiz questions={quizQuestions} onComplete={handleQuizComplete} />
      )}
    </div>
  );
};

export default VideoPage;
