import React from "react";
import { Card } from "primereact/card";
import ReactPlayer from "react-player/youtube";

interface VideoPlayerProps {
  videoUrl: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  console.log("VideoPlayer received videoUrl:", videoUrl);

  return (
    <Card
      className="mb-4"
      style={{ borderRadius: "15px", overflow: "hidden", margin: "10px" }}
    >
      <ReactPlayer
        url={videoUrl}
        controls
        width="90%"
        height="450px"
        onError={(e) => console.error("Video playback error:", e)}
        onReady={() => console.log("Video ready to play")}
        onStart={() => console.log("Video started playing")}
      />
    </Card>
  );
};
