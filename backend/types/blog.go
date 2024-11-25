package types

import "time"

type Blog struct {
	ID         int       `json:"id"`
	Title      string    `json:"title"`
	Content    string    `json:"content"`
	AuthorID   int       `json:"author_id"`
	SubHeading string    `json:"sub_heading"`
	Image      []byte    `json:"image"`
	Tags       []string  `json:"tags"` // Added Tags field as a slice of strings
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
