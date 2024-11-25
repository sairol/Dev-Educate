package main

import (
	"blog-app/api"
	"blog-app/db"
	"fmt"
	"log"
	"net/http"
)

func hello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello %v \n", "to Dev Educate")
}

func main() {

	dbConn := db.Connect()
	defer dbConn.Close()

	http.HandleFunc("/", hello)

	// Login Wale func
	http.HandleFunc("/login", api.AuthHandler)

	// Blogs Routes
	http.HandleFunc("/blogs", api.GetBlogsHandler)
	http.HandleFunc("/createBlog", api.CreateBlogHandler)
	http.HandleFunc("/blog", api.GetBlogHandler)

	// Video Section
	http.HandleFunc("/upload-video", api.UploadVideoHandler)
	http.HandleFunc("/videos", api.ServeVideoHandler)
	http.HandleFunc("/youtubevideo", api.GetYTUrl)

	// Basic Content fetch
	http.HandleFunc("/courseindex", api.FetchIndexSection)

	// List Tracks
	http.HandleFunc("/tracks", api.ListTrackHandler)
	http.HandleFunc("/course", api.ListCourseHandler)

	// Quiz
	http.HandleFunc("/admin/quiz", api.CreateQuiz)
	//Response Quiz
	http.HandleFunc("/quiz", api.GetQuizHandler)

	//BOOKs
	http.HandleFunc("/uploadpdf", api.UploadPDFHandler)
	http.HandleFunc("/books", api.GetBooksByTrackID)
	// http.HandleFunc("/books", api.GetBooksByTrack)

	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}
