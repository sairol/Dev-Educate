package types

// Option represents an individual option for a quiz question
type Option struct {
	Text      string `json:"text"`
	IsCorrect bool   `json:"is_correct"`
}

// Question represents an individual quiz question with options
type Question struct {
	QuestionText  string   `json:"question_text"`
	CorrectAnswer string   `json:"correct_answer"`
	SectionID     int      `json:"section_id"` // The section ID for the question
	Options       []Option `json:"options"`
}

// QuizRequest represents the overall structure of the incoming quiz creation request
type QuizRequest struct {
	Name       string     `json:"name"`
	TrackID    int        `json:"track_id"`
	SubtopicID int        `json:"subtopic_id"`
	Questions  []Question `json:"questions"`
}

//

//

//

type QuizOption struct {
	ID         int    `json:"id"`
	OptionText string `json:"option_text"`
	IsCorrect  bool   `json:"is_correct"`
}

type QuizQuestion struct {
	ID            int          `json:"id"`
	QuestionText  string       `json:"question"`
	CorrectAnswer string       `json:"correct_answer"`
	Options       []QuizOption `json:"options"`
}

type QuizSection struct {
	SectionID int            `json:"section_id"`
	Questions []QuizQuestion `json:"questions"`
}
