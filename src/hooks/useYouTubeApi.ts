// /hooks/useYouTubeApi.ts
import axios from "axios";

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
}

const API_KEY = process.env.youtube_api_KEY;

export const searchVideos = async (query: string | string[]) => {
  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate loading delay

  try {
    const options = {
      method: "GET",
      url: "https://www.googleapis.com/youtube/v3/search",
      params: {
        key: API_KEY,
        part: "snippet",
        q: Array.isArray(query) ? query.join(",") : query,
        maxResults: 10,
        type: "video",
      },
    };

    const response = await axios.request(options);

    const videos: Video[] = response.data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
    }));

    if (Array.isArray(query)) {
      return videos.slice(0, 3); // Return latest 3 videos if query is an array
    }

    return videos; // Otherwise return all videos
  } catch (error) {
    console.error("Error fetching videos:", error);
    return [];
  }
};
