import React, { useState } from "react";
import { Input, Card, Row, Col, Typography, Spin, Modal, Empty } from "antd";
import { searchVideos } from "../hooks/useYouTubeApi";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;
const { Search } = Input;

const VideoSearch: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchedQuery, setSearchedQuery] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchedQuery(query);
    try {
      const results = await searchVideos(query);
      setVideos(results);
    } catch (error) {
      console.error("Error fetching videos:", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoClick = (videoUrl: string) => {
    console.log("Navigating to video with URL:", videoUrl);
    // Encode the URL to handle special characters
    const encodedUrl = encodeURIComponent(videoUrl);
    navigate(`/video/${encodedUrl}`);
  };

  return (
    <div style={{ padding: "24px" }}>
      <Search
        placeholder="Search for videos"
        enterButton="Search"
        size="large"
        onSearch={handleSearch}
        loading={loading}
      />
      <Row gutter={[16, 16]} style={{ marginTop: "24px" }}>
        {videos.length === 0 && searchedQuery && !loading ? (
          <Col span={24}>
            <Empty
              description={<span>No videos found for "{searchedQuery}"</span>}
            ></Empty>
          </Col>
        ) : (
          videos.map((video) => (
            <Col key={video.id} xs={24} md={12} lg={8}>
              <Card
                hoverable
                cover={<img alt={video.title} src={video.thumbnail} />}
                onClick={() =>
                  handleVideoClick(
                    `https://www.youtube.com/watch?v=${video.id}`
                  )
                }
                style={{ cursor: "pointer" }}
              >
                <Title level={4}>{video.title}</Title>
                <Paragraph>{video.description}</Paragraph>
              </Card>
            </Col>
          ))
        )}
      </Row>

      <Modal
        visible={loading}
        closable={false}
        centered
        footer={null}
        maskClosable={false}
      >
        <div style={{ textAlign: "center" }}>
          <Spin size="large" />
          <p style={{ marginTop: "10px" }}>Loading...</p>
        </div>
      </Modal>
    </div>
  );
};

export default VideoSearch;
