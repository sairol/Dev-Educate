package models

import (
	"blog-app/types"
	"fmt"
)

// ListTracks retrieves all tracks from the database
func ListTracks() ([]types.Track, error) {
	// Adjusted query to match the field names in the database
	query := `SELECT id, name, img_url, param FROM tracks`
	rows, err := database.Query(query)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
		return nil, err
	}
	defer rows.Close()

	var tracks []types.Track
	for rows.Next() {
		var track types.Track
		// Scan the database fields into the Track struct
		err := rows.Scan(&track.ID, &track.Name, &track.IMG_URL, &track.Param)
		if err != nil {
			fmt.Printf("Error scanning row: %v\n", err)
			return nil, err
		}
		tracks = append(tracks, track)
	}
	if err := rows.Err(); err != nil {
		fmt.Printf("Error iterating rows: %v\n", err)
		return nil, err
	}

	return tracks, nil
}
