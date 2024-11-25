package api

import (
	"blog-app/db"
	"blog-app/utils"
	"database/sql"
	"fmt"
	"io/ioutil"
	"net/http"

	_ "github.com/lib/pq"
)

// DB Connection
var database *sql.DB = db.Connect()

// Upload Video
func UploadVideoHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	subtopicID := r.FormValue("subtopic_id")
	title := r.FormValue("title")
	description := r.FormValue("description")

	file, _, err := r.FormFile("video")
	if err != nil {
		http.Error(w, "Invalid video file", http.StatusBadRequest)
		return
	}
	defer file.Close()

	videoData, err := ioutil.ReadAll(file)
	if err != nil {
		http.Error(w, "Error reading video file", http.StatusInternalServerError)
		return
	}

	contentType := r.Header.Get("Content-Type")

	query := `INSERT INTO videos (subtopic_id, title, description, video, content_type) VALUES ($1, $2, $3, $4, $5)`
	_, err = database.Exec(query, subtopicID, title, description, videoData, contentType)
	if err != nil {
		http.Error(w, "Error saving video", http.StatusInternalServerError)
		return
	}

	fmt.Fprintln(w, "Video uploaded successfully")
}

// Serve Video
func ServeVideoHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	videoID := r.URL.Query().Get("id")

	var videoData []byte
	var contentType string
	query := `SELECT video, content_type FROM videos WHERE id = $1`
	err := database.QueryRow(query, videoID).Scan(&videoData, &contentType)
	if err != nil {
		http.Error(w, "Video not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", contentType)
	w.Write(videoData)
}
