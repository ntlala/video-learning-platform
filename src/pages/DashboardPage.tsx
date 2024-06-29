// /pages/Dashboard.tsx
import React from "react";
import { Layout, Typography, Divider } from "antd";
import VideoSearch from "../components/VideoSearch";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard: React.FC = () => {
  return (
    <Layout style={{ padding: "24px 50px", minHeight: "100vh" }}>
      <Content
        style={{ background: "#fff", padding: 24, margin: 0, minHeight: 280 }}
      >
        <Title level={2}>Dashboard</Title>
        <Divider />

        <VideoSearch />
      </Content>
    </Layout>
  );
};

export default Dashboard;
