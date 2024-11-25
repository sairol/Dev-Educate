package types

type Track struct {
	ID      int    `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	IMG_URL string `json:"img_url,omitempty"`
	Param   string `json:"param,omitempty"`
}
