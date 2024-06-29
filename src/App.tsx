import { Layout, Menu } from "antd";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";
import { Home } from "./pages/Home";
import DashboardPage from "./pages/DashboardPage";
import VideoPage from "./pages/VideoPage";
import Quiz from "./components/Quiz";

const { Header, Content, Footer } = Layout;

function App() {
  const { isSignedIn } = useUser();
  const navigate = useNavigate();

  const menuItems = [
    { key: "home", label: "Home" },
    { key: "dashboard", label: "Dashboard" },
  ];

  const handleMenuClick = (e: { key: string }) => {
    navigate(`/${e.key === "home" ? "" : e.key}`);
  };

  return (
    <Layout className="layout" style={{ minHeight: "100vh" }}>
      <Header
        style={{
          position: "fixed",
          zIndex: 1,
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div className="logo" style={{ color: "white", fontSize: "1.5em" }}>
          EduVision
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={menuItems}
          onClick={handleMenuClick}
          style={{ flex: 1, minWidth: 0 }}
        />
        <div style={{ marginLeft: "auto" }}>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <Link to="/sign-in" style={{ color: "white" }}>
              Sign In
            </Link>
          )}
        </div>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <div
          className="site-layout-content"
          style={{ padding: 24, minHeight: 380 }}
        >
          <Routes>
            <Route path="/" element={<Home isSignedIn={false} />} />
            <Route path="/courses" element={<div>Courses Page</div>} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/video/:encodedUrl" element={<VideoPage />} />
            <Route
              path="/Quiz/:encodedUrl"
              element={
                <Quiz
                  questions={[]}
                  onComplete={() => {
                    throw new Error("Function not implemented.");
                  }}
                />
              }
            />
          </Routes>
        </div>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        EduVision ©{new Date().getFullYear()} Created by Your Name
      </Footer>
    </Layout>
  );
}

export default App;
