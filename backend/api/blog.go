package api

import (
	"blog-app/types"
	"blog-app/utils"
	"encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/lib/pq"
)

func CreateBlogHandler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS
	utils.EnableCors(w, r)

	// Parse the multipart form data
	err := r.ParseMultipartForm(10 << 20) // Limit file size to 10 MB
	if err != nil {
		http.Error(w, "Unable to parse form", http.StatusBadRequest)
		return
	}

	// Extract form values
	title := r.FormValue("title")
	content := r.FormValue("content")
	subHeading := r.FormValue("sub_heading")
	authorID := r.FormValue("author_id") // This should be converted to an integer
	authorIDInt, err := strconv.Atoi(authorID)
	if err != nil {
		http.Error(w, "Invalid author ID", http.StatusBadRequest)
		return
	}

	// Extract tags and convert to slice of strings
	tags := r.FormValue("tags") // Example: "tag1,tag2,tag3"
	tagSlice := strings.Split(tags, ",")

	// Extract image file (if any)
	imageFile, _, err := r.FormFile("image")
	if err != nil && err != http.ErrMissingFile {
		http.Error(w, "Unable to get image", http.StatusBadRequest)
		return
	}

	var imageData []byte
	if imageFile != nil {
		// Read image file content into a byte slice
		imageData, err = ioutil.ReadAll(imageFile)
		if err != nil {
			http.Error(w, "Error reading image file", http.StatusInternalServerError)
			return
		}
	}

	// Insert blog data into the database
	_, err = database.Exec(`
        INSERT INTO blogs (title, content, author_id, created_at, updated_at, sub_heading, image, tags) 
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
		title, content, authorIDInt, time.Now(), time.Now(), subHeading, imageData, pq.Array(tagSlice)) // Use pq.Array to insert the array

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Send JSON response confirming the blog creation
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Blog created successfully!",
	})
}

func GetBlogsHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)

	// Query to select all blogs along with sub_heading and image data
	rows, err := database.Query("SELECT id, title, content, author_id, sub_heading, image, created_at, updated_at FROM blogs")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var blogs []types.Blog
	for rows.Next() {
		var blog types.Blog
		// Scan the result into the blog struct
		if err := rows.Scan(&blog.ID, &blog.Title, &blog.Content, &blog.AuthorID, &blog.SubHeading, &blog.Image, &blog.CreatedAt, &blog.UpdatedAt); err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		blogs = append(blogs, blog)
	}

	// Return the list of blogs as JSON
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(blogs)
}

// Single  Blog
func GetBlogHandler(w http.ResponseWriter, r *http.Request) {
	// Enable CORS
	utils.EnableCors(w, r)

	// Get the blog ID from the URL query params
	blogID := r.URL.Query().Get("id")

	// Query the database for the blog with the given ID
	row := database.QueryRow(`
		SELECT id, title, content, author_id, sub_heading, image, tags, created_at, updated_at 
		FROM blogs 
		WHERE id = $1`, blogID)

	// Create a blog struct to store the result
	var blog types.Blog
	var tags pq.StringArray // Use pq.StringArray to handle the PostgreSQL text[] type
	var image []byte        // Declare a byte slice for the image field

	// Scan the result into the blog struct, including tags as a pq.StringArray and image as byte slice
	err := row.Scan(&blog.ID, &blog.Title, &blog.Content, &blog.AuthorID, &blog.SubHeading, &image, &tags, &blog.CreatedAt, &blog.UpdatedAt)
	if err != nil {
		// Log the error in the terminal
		log.Printf("Error fetching blog with ID %s: %v", blogID, err)

		// Return HTTP 404 with a message
		http.Error(w, "Blog not found", http.StatusNotFound)
		return
	}

	// Assign the tags and image to the blog struct
	blog.Tags = tags   // pq.StringArray is already a slice of strings
	blog.Image = image // This is still a byte array; consider encoding it if necessary

	// Set the response content type to JSON
	w.Header().Set("Content-Type", "application/json")

	// Encode the blog struct into JSON and send the response
	json.NewEncoder(w).Encode(blog)
}

func UpdateBlogHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	blogID := r.URL.Query().Get("id")

	var blog types.Blog
	// Decode the blog from the request body
	err := json.NewDecoder(r.Body).Decode(&blog)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Update the blog data in the database
	_, err = database.Exec(`
		UPDATE blogs 
		SET title=$1, content=$2, sub_heading=$3, image=$4, updated_at=$5 
		WHERE id=$6`,
		blog.Title, blog.Content, blog.SubHeading, blog.Image, time.Now(), blogID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with success
	w.WriteHeader(http.StatusOK)
}

func DeleteBlogHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)
	blogID := r.URL.Query().Get("id")

	// Delete the blog by ID
	_, err := database.Exec("DELETE FROM blogs WHERE id = $1", blogID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	// Respond with no content (successful deletion)
	w.WriteHeader(http.StatusNoContent)
}
