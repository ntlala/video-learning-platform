import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { ConfigProvider } from "antd";
import App from "./App.tsx";

// Ant Design CSS
import "antd/dist/reset.css";

// Custom CSS
import "./index.css";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  throw new Error("Missing Clerk Publishable Key");
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={clerkPubKey}>
      <ConfigProvider
        theme={{
          token: {
            // You can customize the theme here
            colorPrimary: "#1890ff",
          },
        }}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ConfigProvider>
    </ClerkProvider>
  </React.StrictMode>
);
