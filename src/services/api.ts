export const searchVideos = async (query: string | string[]) => {
  // This is a mock implementation. Replace it with real API calls.
  const mockVideos = [
    {
      id: "1",
      title: "Introduction to React",
      description: "Learn the basics of React.",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: "2",
      title: "Advanced React Patterns",
      description: "Explore advanced patterns in React.",
      thumbnail: "https://via.placeholder.com/150",
    },
    {
      id: "3",
      title: "React and TypeScript",
      description: "Using TypeScript with React.",
      thumbnail: "https://via.placeholder.com/150",
    },
  ];

  // If query is an array, return the latest 3 videos
  if (Array.isArray(query)) {
    return mockVideos.slice(0, 3);
  }

  // Otherwise, return mock results based on the query
  return mockVideos.filter((video) =>
    video.title.toLowerCase().includes(query.toLowerCase())
  );
};
