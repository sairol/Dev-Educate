package api

import (
	"blog-app/models"
	"blog-app/types"
	"blog-app/utils"
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
)

func AuthHandler(w http.ResponseWriter, r *http.Request) {
	utils.EnableCors(w, r)

	if r.Method == http.MethodPost {
		var user types.User
		if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
			http.Error(w, "Invalid input", http.StatusBadRequest)
			return
		}

		// Check if the user exists by email
		dbUser, err := models.GetUserByEmail(user.Email)

		if err != nil && err != sql.ErrNoRows {
			http.Error(w, fmt.Sprintf("Database error: %v", err), http.StatusInternalServerError)
			return
		}

		// If the user exists, check the password (Login)
		if err == nil {
			// Check if the provided password matches the stored password
			if !utils.CheckPasswordHash(user.Password, dbUser.Password) {
				http.Error(w, "Wrong password", http.StatusUnauthorized)
				return
			}

			// Login successful
			json.NewEncoder(w).Encode(map[string]string{"message": "Login successful"})
			return
		}

		// If the user does not exist (email not found), create a new user (Signup)
		// Hash the password for new user signup
		hashedPassword, err := utils.HashPassword(user.Password)
		if err != nil {
			http.Error(w, "Failed to hash password", http.StatusInternalServerError)
			return
		}
		user.Password = hashedPassword

		// Create new user in the database
		if err := models.CreateUser(user); err != nil {
			http.Error(w, fmt.Sprintf("Failed to create user: %v", err), http.StatusInternalServerError)
			return
		}

		// Signup successful
		w.WriteHeader(http.StatusCreated)
		json.NewEncoder(w).Encode(map[string]string{"message": "User created successfully"})
	} else {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
	}
}
