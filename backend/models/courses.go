package models

import (
	"blog-app/types"
	"fmt"
)

func ListCourse(id int) ([]types.Course, error) {
	// Adjusted query to match the field names in the database
	query := `SELECT id, track_id, name, img_url FROM subtopics where track_id = $1 `
	rows, err := database.Query(query, id)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	defer rows.Close()

	var courses []types.Course
	for rows.Next() {
		var course types.Course
		err := rows.Scan(&course.ID, &course.TrackID, &course.Name, &course.IMG_URL)
		if err != nil {
			fmt.Printf("Error scanning row: %v\n", err)
			return nil, err
		}
		courses = append(courses, course)
	}
	if err := rows.Err(); err != nil {
		fmt.Printf("Error iterating rows: %v\n", err)
		return nil, err
	}

	return courses, nil
}
