import React, { useState } from 'react';

const PdfUpload = () => {
    const [image, setImage] = useState(null);
    const [pdf, setPdf] = useState(null);
    const [bookName, setBookName] = useState('');
    const [authorName, setAuthorName] = useState('');

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (name === 'image') {
            setImage(files[0]);
        } else if (name === 'pdf') {
            setPdf(files[0]);
        }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Create FormData object to send form data including files
      const formData = new FormData();
      formData.append('image', image);
      formData.append('pdf', pdf);
      formData.append('book_name', bookName);
      formData.append('author_name', authorName);
      formData.append('track_id', 1);  // Assuming track_id is 1 for now
  
      try {
          const response = await fetch('http://localhost:8080/uploadpdf', {
              method: 'POST',
              body: formData,
          });
  
          if (!response.ok) {
              throw new Error('File upload failed');
          }
  
          const data = await response.json();
          alert('Upload Successful!');
          console.log('Uploaded data:', data);
      } catch (error) {
          console.error('Error uploading files:', error);
          alert('Upload Failed');
      }
  };
  

    return (
        <div>
            <h2>Upload Book</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="book_name"
                    placeholder="Book Name"
                    value={bookName}
                    onChange={(e) => setBookName(e.target.value)}
                    required
                />
                <input
                    type="text"
                    name="author_name"
                    placeholder="Author Name"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    required
                />
                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="file"
                    name="pdf"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    required
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default PdfUpload;
