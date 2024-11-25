// // // CreateBlog.js
// // import React, { useState } from 'react';

// // const CreateBlog = () => {
// //     const [title, setTitle] = useState('');
// //     const [content, setContent] = useState('');

// //     const handleSubmit = (e) => {
// //         e.preventDefault();

// //         const newBlog = {
// //             title,
// //             content,
// //             author_id: 1, // Should ideally be dynamic based on logged-in user
// //         };

// //         fetch('http://localhost:8080/createBlog', {
// //             method: 'POST',
// //             headers: {
// //                 'Content-Type': 'application/json',
// //             },
// //             body: JSON.stringify(newBlog),
// //         })
// //             .then((res) => res.json())
// //             .then((data) => {
// //                 alert('Blog created!');
// //                 setTitle('');
// //                 setContent('');
// //             });
// //     };

// //     return (
// //         <form onSubmit={handleSubmit} className='p-8'>
// //             <div className='p-4'>
// //                 <label className="block text-gray-700 text-xl font-bold mb-2">Title</label>
// //                 <input
// //                     type="text"
// //                     value={title}
// //                     className="border rounded-md shadow-sm w-full text-zinc-800 py-2 px-4 text-xl leading-tight focus:outline-none focus:ring "
// //                     required
// //                     onChange={(e) => setTitle(e.target.value)}
// //                 />
// //             </div>

// //             <div className='p-4'>
// //                 <label className="block text-gray-700 text-xl font-bold mb-2">Content</label>
// //                 <textarea
// //                     value={content}
// //                     onChange={(e) => setContent(e.target.value)}
// //                     className="border rounded-md shadow-sm w-full text-zinc-800 py-2 px-4 text-xl leading-tight focus:outline-none focus:ring "
// //                 />
// //             </div>
// //             <button type="submit" className='bg-blue-500 m-4 text-white font-semibold text-2xl px-4 py-2 rounded-lg'>Create Blog</button>
// //         </form>
// //     );
// // };

// // export default CreateBlog;



// import React, { useState } from 'react';

// const CreateBlog = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [subHeading, setSubHeading] = useState('');
//     const [image, setImage] = useState(null);

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]); // Handle single file selection
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();

//         // Create a new FormData object to send the blog data along with the image
//         const formData = new FormData();
//         formData.append('title', title);
//         formData.append('content', content);
//         formData.append('sub_heading', subHeading);
//         formData.append('author_id', 1); // Example: hardcoded, should be dynamic
//         if (image) {
//             formData.append('image', image); // Append the image file
//         }

//         fetch('http://localhost:8080/createBlog', {
//             method: 'POST',
//             body: formData, // Send the FormData object
//         })
//             .then((res) => res.json())
//             .then((data) => {
//                 alert('Blog created!');
//                 setTitle('');
//                 setContent('');
//                 setSubHeading('');
//                 setImage(null); // Reset the image
//             })
//             .catch((error) => console.error('Error:', error));
//     };

//     return (
//         <form onSubmit={handleSubmit} className='p-8' encType="multipart/form-data">
//             <div className='p-4'>
//                 <label className="block text-gray-700 text-xl font-bold mb-2">Title</label>
//                 <input
//                     type="text"
//                     value={title}
//                     className="border rounded-md shadow-sm w-full text-zinc-800 py-2 px-4 text-xl leading-tight focus:outline-none focus:ring "
//                     required
//                     onChange={(e) => setTitle(e.target.value)}
//                 />
//             </div>

//             <div className='p-4'>
//                 <label className="block text-gray-700 text-xl font-bold mb-2">Content</label>
//                 <textarea
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     className="border rounded-md shadow-sm w-full text-zinc-800 py-2 px-4 text-xl leading-tight focus:outline-none focus:ring "
//                 />
//             </div>

//             <div className='p-4'>
//                 <label className="block text-gray-700 text-xl font-bold mb-2">Subheading</label>
//                 <input
//                     type="text"
//                     value={subHeading}
//                     className="border rounded-md shadow-sm w-full text-zinc-800 py-2 px-4 text-xl leading-tight focus:outline-none focus:ring "
//                     onChange={(e) => setSubHeading(e.target.value)}
//                 />
//             </div>

//             <div className='p-4'>
//                 <label className="block text-gray-700 text-xl font-bold mb-2">Image</label>
//                 <input
//                     type="file"
//                     accept="image/png, image/jpeg"
//                     onChange={handleImageChange}
//                     className="border rounded-md shadow-sm w-full text-zinc-800 py-2 px-4 text-xl leading-tight focus:outline-none focus:ring "
//                 />
//             </div>

//             <button type="submit" className='bg-blue-500 m-4 text-white font-semibold text-2xl px-4 py-2 rounded-lg'>
//                 Create Blog
//             </button>
//         </form>
//     );
// };

// export default CreateBlog;



import React, { useState } from 'react';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [subHeading, setSubHeading] = useState('');
    const [tags, setTags] = useState([]);
    const [image, setImage] = useState(null);

    const handleTagChange = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent the form from submitting
            if (e.target.value.trim() && tags.length < 4) {
                setTags([...tags, e.target.value.trim()]);
                e.target.value = '';
            }
        }
    };

    const handleRemoveTag = (index) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const applyFormat = (command, value = null) => {
        document.execCommand(command, false, value);
    };

    const applyHeading = (heading) => {
        let tag = heading === 'H1' ? 'text-3xl' : 'text-2xl'; // Dynamically change text size
        document.execCommand('formatBlock', false, heading);
        document.execCommand('fontSize', false, tag); // Applying the size as a font style
    };

    const handleContentChange = (e) => {
        setContent(e.target.innerHTML); // Ensure the HTML is stored
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', title);
        formData.append('author_id', 1);
        formData.append('sub_heading',subHeading)
        formData.append('content', content); // Send HTML content
        formData.append('tags', tags.join(','));
        if (image) formData.append('image', image);

        try {
            const response = await fetch('http://localhost:8080/createBlog', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText);
            }

            const result = await response.json();
            alert(result.message);

            setTitle('');
            setContent('');
            setTags([]);
            setImage(null);
        } catch (err) {
            console.error('Error submitting blog:', err.message);
            alert('Error creating blog. Check console for details.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg"
        >
            {/* Image Upload */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Add a cover image
                </label>
                <input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>

            {/* Title Input */}
            <div className="mb-6">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="New post title here..."
                    className="w-full text-3xl font-semibold border-none focus:ring-0"
                />
            </div>

            {/* Subheading Input */}
            <div className="mb-6">
                <input
                    type="text"
                    value={subHeading}
                    onChange={(e) => setSubHeading(e.target.value)}
                    placeholder="Subheading"
                    className="w-full text-2xl font-semibold border-none focus:ring-0"
                />
            </div>

            {/* Tags Input */}
            <div className="mb-6">
                <label className="block text-gray-700 font-semibold text-lg mb-2">
                    Tags (up to 4)
                </label>
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full flex items-center gap-2"
                        >
                            {tag}
                            <button
                                type="button"
                                onClick={() => handleRemoveTag(index)}
                                className="text-red-600"
                            >
                                &times;
                            </button>
                        </span>
                    ))}
                    {tags.length < 4 && (
                        <input
                            type="text"
                            onKeyDown={handleTagChange}
                            placeholder="Add a tag..."
                            className="flex-grow border rounded-lg p-2 focus:outline-none focus:ring"
                        />
                    )}
                </div>
            </div>

            {/* Toolbar */}
            <div className="mb-4 bg-gray-100 border border-gray-300 p-2 rounded-lg flex gap-2">
                <button
                    type="button"
                    onClick={() => applyFormat('bold')}
                    className="font-bold px-2 py-1 border border-gray-300 rounded"
                >
                    B
                </button>
                <select
                    onChange={(e) => applyHeading(e.target.value)}
                    className="px-2 py-1 border border-gray-300 rounded"
                >
                    <option value="">Heading</option>
                    <option value="H1">H1</option>
                    <option value="H2">H2</option>
                    <option value="H3">H3</option>
                    <option value="H4">H4</option>
                </select>
            </div>

            {/* Content Editor */}
            <div
                contentEditable
                onInput={handleContentChange}
                className="min-h-[200px] border border-gray-300 p-4 rounded-lg focus:outline-none ltr"
                style={{ direction: 'ltr', textAlign: 'left' }}
            ></div>

            {/* Submit Buttons */}
            <div className="flex justify-between items-center mt-6">
                <button
                    type="button"
                    className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg"
                >
                    Save Draft
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                    Publish
                </button>
            </div>
        </form>
    );
};

export default CreateBlog;

