// package models

// import (
// 	"blog-app/db"
// 	"blog-app/types"
// 	"database/sql"
// 	"fmt"
// )

// var database *sql.DB = db.Connect()

// func CreateUser(user types.User) error {
// 	query := `INSERT INTO users (username,email, password) VALUES ($1, $2 , $3)`
// 	_, err := database.Exec(query, user.UserName, user.Email, user.Password)
// 	if err != nil {
// 		fmt.Printf("Error executing query: %v\n", err) // Log detailed error
// 	}
// 	return err
// }

// func GetUserByEmail(email string) (types.User, error) {
// 	var user types.User
// 	query := `SELECT id, email, password FROM users WHERE email = $1`
// 	err := database.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.Password)
// 	if err != nil {
// 		return user, err
// 	}
// 	return user, nil
// }

package models

import (
	"blog-app/db"
	"blog-app/types"
	"database/sql"
	"fmt"
)

var database *sql.DB = db.Connect()

// CreateUser checks if the email exists, and inserts the new user if it does not exist
func CreateUser(user types.User) error {
	// Check if the email already exists
	var exists bool
	checkEmailQuery := `SELECT EXISTS(SELECT 1 FROM users WHERE email = $1)`
	err := database.QueryRow(checkEmailQuery, user.Email).Scan(&exists)
	if err != nil {
		fmt.Printf("Error checking email existence: %v\n", err)
		return err
	}

	if exists {
		return fmt.Errorf("Email already in use")
	}

	// Insert the new user into the database
	query := `INSERT INTO users (email, password) VALUES ($1, $2)`
	_, err = database.Exec(query, user.Email, user.Password)
	if err != nil {
		fmt.Printf("Error executing query: %v\n", err)
	}
	return err
}

// GetUserByEmail retrieves the user from the database by email
func GetUserByEmail(email string) (types.User, error) {
	var user types.User
	query := `SELECT id, email, password FROM users WHERE email = $1`
	err := database.QueryRow(query, email).Scan(&user.ID, &user.Email, &user.Password)
	if err != nil {
		return user, err
	}
	return user, nil
}
