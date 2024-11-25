package types

type Book struct {
	ID     int    `json:"id"`
	Name   string `json:"name"`
	Author string `json:"author"`
	ImgURL string `json:"img_url"`
	PDFURL string `json:"pdf_url"`
	Type   string `json:"type"`
}
