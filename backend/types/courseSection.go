package types

type Section struct {
	ID         int     `json:"id"`
	Name       string  `json:"name"`
	SubtopicID int     `json:"subtopic_id"`
	Content    []Video `json:"content"` // Array to hold videos for each section
}

type Video struct {
	ID         int    `json:"id"`
	SubtopicID int    `json:"subtopic_id"`
	SectionID  int    `json:"section_id"`
	Title      string `json:"title"`
}
