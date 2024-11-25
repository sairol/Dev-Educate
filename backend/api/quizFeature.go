package api

import (
	"blog-app/types"
	"blog-app/utils"
	"encoding/json"
	"log"
	"net/http"
)

func CreateQuiz(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)

	var quizRequest types.QuizRequest // Assuming this is a struct with question data

	// Parse the incoming request body to get the quiz question and options
	err := json.NewDecoder(r.Body).Decode(&quizRequest)
	if err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Validate the incoming quizRequest
	if quizRequest.Name == "" || quizRequest.SubtopicID == 0 || quizRequest.TrackID == 0 {
		http.Error(w, "Invalid data: missing required fields", http.StatusBadRequest)
		return
	}

	// Insert the questions and options
	for _, question := range quizRequest.Questions {
		// Insert the question into the quiz_questions table
		var questionID int
		err := database.QueryRow(`
            INSERT INTO quiz_questions (question_text, correct_answer, section_id, track_id, subtopic_id)
            VALUES ($1, $2, $3, $4, $5) RETURNING id`,
			question.QuestionText, question.CorrectAnswer, question.SectionID, quizRequest.TrackID, quizRequest.SubtopicID).
			Scan(&questionID)

		if err != nil {
			log.Printf("Error inserting question: %v", err)
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Insert options for each question
		for _, option := range question.Options {
			_, err := database.Exec(`
                INSERT INTO quiz_options (question_id, option_text, is_correct)
                VALUES ($1, $2, $3)`,
				questionID, option.Text, option.IsCorrect)
			if err != nil {
				log.Printf("Error inserting option: %v", err)
				http.Error(w, err.Error(), http.StatusInternalServerError)
				return
			}
		}
	}

	// Respond with a success message
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(map[string]string{
		"message": "Quiz created successfully",
	})
}

func GetQuizHandler(w http.ResponseWriter, r *http.Request) {

	utils.EnableCors(w, r)
	// Parse query parameters
	trackID := r.URL.Query().Get("track_id")
	subtopicID := r.URL.Query().Get("subtopic_id")
	if trackID == "" || subtopicID == "" {
		http.Error(w, "Missing track_id or subtopic_id query parameters", http.StatusBadRequest)
		return
	}

	// Query to fetch questions categorized by section_id
	query := `
		SELECT q.id, q.question_text, q.correct_answer, q.section_id
		FROM quiz_questions q
		WHERE q.track_id = $1 AND q.subtopic_id = $2
		ORDER BY q.section_id, q.id
	`
	rows, err := database.Query(query, trackID, subtopicID)
	if err != nil {
		http.Error(w, "Failed to fetch questions", http.StatusInternalServerError)
		log.Fatal(err)
	}
	defer rows.Close()

	// Parse questions into a map categorized by section_id
	sections := make(map[int][]types.QuizQuestion)

	for rows.Next() {
		var question types.QuizQuestion
		var sectionID int
		if err := rows.Scan(&question.ID, &question.QuestionText, &question.CorrectAnswer, &sectionID); err != nil {
			http.Error(w, "Failed to parse question rows", http.StatusInternalServerError)
			log.Fatal(err)
		}

		// Fetch options for the question
		optionsQuery := `
			SELECT o.id, o.option_text, o.is_correct
			FROM quiz_options o
			WHERE o.question_id = $1
			ORDER BY o.id
		`
		optionRows, err := database.Query(optionsQuery, question.ID)
		if err != nil {
			http.Error(w, "Failed to fetch options", http.StatusInternalServerError)
			log.Fatal(err)
		}

		var options []types.QuizOption
		for optionRows.Next() {
			var option types.QuizOption
			if err := optionRows.Scan(&option.ID, &option.OptionText, &option.IsCorrect); err != nil {
				http.Error(w, "Failed to parse options rows", http.StatusInternalServerError)
				log.Fatal(err)
			}
			options = append(options, option)
		}
		optionRows.Close()
		question.Options = options

		// Append question to the corresponding section
		sections[sectionID] = append(sections[sectionID], question)
	}

	// Convert map to structured response
	var response []types.QuizSection
	for sectionID, questions := range sections {
		response = append(response, types.QuizSection{
			SectionID: sectionID,
			Questions: questions,
		})
	}

	// Send JSON response
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
