package api

import (
	"blog-app/models"
	"blog-app/utils"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

// ListTrackHandler handles the API request for listing tracks
func ListTrackHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	// Get the list of tracks from the model
	tracks, err := models.ListTracks()
	if err != nil {
		http.Error(w, "Unable to retrieve tracks", http.StatusInternalServerError)
		return
	}

	// Set the response header to indicate that the content is JSON
	w.Header().Set("Content-Type", "application/json")

	// Write the tracks as a JSON response
	if err := json.NewEncoder(w).Encode(tracks); err != nil {
		log.Printf("Error encoding JSON: %v", err)
		http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
	}
}

func ListCourseHandler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS if needed
	utils.EnableCors(w, r)

	// Extract 'id' from query string, e.g. http://localhost:8080/golang?id=1
	idStr := r.URL.Query().Get("id")
	if idStr == "" {
		http.Error(w, "Missing 'id' parameter", http.StatusBadRequest)
		return
	}

	// Convert the 'id' string to an integer
	id, err := strconv.Atoi(idStr)
	if err != nil {
		http.Error(w, "Invalid 'id' parameter, must be an integer", http.StatusBadRequest)
		return
	}

	// Call the ListCourse function with the extracted id
	courses, err := models.ListCourse(id)
	if err != nil {
		http.Error(w, "Unable to retrieve courses", http.StatusInternalServerError)
		return
	}

	// Set the response header to indicate that the content is JSON
	w.Header().Set("Content-Type", "application/json")

	// Write the courses as a JSON response
	if err := json.NewEncoder(w).Encode(courses); err != nil {
		log.Printf("Error encoding JSON: %v", err)
		http.Error(w, "Error encoding JSON response", http.StatusInternalServerError)
	}
}
