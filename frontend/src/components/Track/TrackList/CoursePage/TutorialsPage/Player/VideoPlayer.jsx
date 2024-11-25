import React, { useState, useEffect } from 'react';

const VideoPlayer = ({ videoId }) => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch video data from the backend API
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        setIsLoading(true); // Start loading
        const response = await fetch(`http://localhost:8080/videos?id=${videoId}`);
        if (!response.ok) {
          throw new Error('Failed to load video');
        }

        // Create a URL for the video Blob data
        const blob = await response.blob();
        const videoUrl = URL.createObjectURL(blob); // Create a URL from the Blob
        setVideoUrl(videoUrl); // Set the video URL for the <video> tag
      } catch (error) {
        console.error('Error fetching video:', error);
      } finally {
        setIsLoading(false); // Stop loading once the video is fetched
      }
    };

    fetchVideo();
  }, [videoId]);

  if (isLoading) {
    return <div>Loading video...</div>;
  }

  if (!videoUrl) {
    return <div>Error: Video not available</div>;
  }

  return (
    <div className="video-player">
      <video
        width="600"
        height="auto"
        controls
        src={videoUrl}
        type="video/mp4" // Assuming the video is MP4; adjust if needed based on content type
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default VideoPlayer;
