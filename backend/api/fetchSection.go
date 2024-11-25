package api

import (
	"blog-app/types"
	"blog-app/utils"
	"encoding/json"
	"net/http"
	"strconv"
)

func FetchIndexSection(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	subtopicID, err := strconv.Atoi(r.URL.Query().Get("subtopic_id"))
	if err != nil {
		http.Error(w, "Invalid subtopic_id", http.StatusBadRequest)
		return
	}

	// Fetch sections based on subtopic_id
	sectionsQuery := "SELECT id, name, subtopic_id FROM sections WHERE subtopic_id = $1"
	rows, err := database.Query(sectionsQuery, subtopicID)
	if err != nil {
		http.Error(w, "Error fetching sections", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var sections []types.Section
	for rows.Next() {
		var section types.Section
		if err := rows.Scan(&section.ID, &section.Name, &section.SubtopicID); err != nil {
			http.Error(w, "Error scanning sections", http.StatusInternalServerError)
			return
		}

		// Fetch videos for each section
		videosQuery := "SELECT id, subtopic_id, section_id, title FROM videos WHERE section_id = $1"
		videoRows, err := database.Query(videosQuery, section.ID)
		if err != nil {
			http.Error(w, "Error fetching videos", http.StatusInternalServerError)
			return
		}
		defer videoRows.Close()

		var videos []types.Video
		for videoRows.Next() {
			var video types.Video
			if err := videoRows.Scan(&video.ID, &video.SubtopicID, &video.SectionID, &video.Title); err != nil {
				http.Error(w, "Error scanning videos", http.StatusInternalServerError)
				return
			}
			videos = append(videos, video)
		}
		section.Content = videos // Assign videos to the section's Content field

		sections = append(sections, section)
	}
	if err := rows.Err(); err != nil {
		http.Error(w, "Error iterating sections", http.StatusInternalServerError)
		return
	}

	// Encode the response as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sections)
}
