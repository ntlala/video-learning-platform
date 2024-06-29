import React from "react";
import { Button, Card, Row, Col, Typography, Divider } from "antd";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

interface HomeProps {
  isSignedIn: boolean;
}

export const Home: React.FC<HomeProps> = ({ isSignedIn }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate(isSignedIn ? "/dashboard" : "/sign-up");
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "24px" }}>
      <Card className="mb-4">
        <div style={{ textAlign: "center" }}>
          <Title level={1}>Welcome to EduVision</Title>
          <Paragraph style={{ fontSize: "18px" }}>
            Your personalized video learning platform powered by AI
          </Paragraph>
          <Button type="primary" size="large" onClick={handleGetStarted}>
            {isSignedIn ? "Go to Dashboard" : "Get Started"}
          </Button>
        </div>
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <Card title="Learn at Your Pace" style={{ height: "100%" }}>
            <Paragraph>
              Access a wide range of educational videos and learn at your own
              speed. Our platform adapts to your learning style.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="AI-Powered Quizzes" style={{ height: "100%" }}>
            <Paragraph>
              Test your knowledge with automatically generated quizzes tailored
              to each video you watch.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Track Your Progress" style={{ height: "100%" }}>
            <Paragraph>
              Monitor your learning journey with detailed progress tracking and
              performance analytics.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card title="Diverse Topics" style={{ height: "100%" }}>
            <Paragraph>
              Explore a vast array of subjects from academic courses to
              practical skills and hobbies.
            </Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Card style={{ marginTop: "24px" }}>
        <div style={{ textAlign: "center" }}>
          <Title level={2}>Ready to Expand Your Knowledge?</Title>
          <Button type="primary" size="large" onClick={handleGetStarted}>
            {isSignedIn ? "Go to Dashboard" : "Sign Up Now"}
          </Button>
        </div>
      </Card>
    </div>
  );
};
