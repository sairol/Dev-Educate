package api

import (
	"blog-app/utils"
	"encoding/json"
	"net/http"
)

func GetYTUrl(w http.ResponseWriter, r *http.Request) {
	// Enable CORS headers
	utils.EnableCors(w, r)

	// Get the video ID from the query string
	videoID := r.URL.Query().Get("id")

	// Check if video ID is provided
	if videoID == "" {
		http.Error(w, "Video ID is required", http.StatusBadRequest)
		return
	}

	var isYouTube bool
	var videoURL string

	// Query to get the 'is_youtube' flag for the video
	query := `SELECT is_youtube FROM videos WHERE id = $1`
	err := database.QueryRow(query, videoID).Scan(&isYouTube)
	if err != nil {
		http.Error(w, "Video not found", http.StatusNotFound)
		return
	}

	// If the video is on YouTube, get the video URL
	if isYouTube {
		// Query to get the video URL for YouTube videos
		query = `SELECT video_url FROM videos WHERE id = $1`
		err := database.QueryRow(query, videoID).Scan(&videoURL)
		if err != nil {
			http.Error(w, "Video URL not found", http.StatusNotFound)
			return
		}

		// Return the video URL as a JSON response
		w.Header().Set("Content-Type", "application/json")
		jsonResponse := map[string]string{"video_url": videoURL}
		json.NewEncoder(w).Encode(jsonResponse)
		return
	}

	// If the video is not a YouTube video, return false in the response
	w.Header().Set("Content-Type", "application/json")
	jsonResponse := map[string]bool{"is_youtube": false}
	json.NewEncoder(w).Encode(jsonResponse)
}
