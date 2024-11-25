package types

type Course struct {
	ID      int    `json:"id,omitempty"`
	TrackID int    `json:"track_id,omitempty"`
	Name    string `json:"name,omitempty"`
	IMG_URL string `json:"img_url,omitempty"`
}
