import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function SepBlog() {
    // Get the blog ID from the URL parameters
    const { id } = useParams();

    // Initialize state to store the blog data
    const [blog, setBlog] = useState(null); // Start with null for no data initially
    const [loading, setLoading] = useState(true); // For handling the loading state
    const [error, setError] = useState(null); // For handling errors

    // Fetch the blog data when the component mounts
    useEffect(() => {
        fetch(`http://localhost:8080/blog?id=${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBlog(data); // Set the fetched blog data into state
                setLoading(false); // Set loading to false once data is fetched
            })
            .catch((err) => {
                setError('Error fetching blog data'); // Handle error
                setLoading(false); // Stop loading on error
            });
    }, [id]); // Re-fetch if the ID changes

    if (loading) {
        return <div>Loading...</div>; // Show loading message
    }

    if (error) {
        return <div>{error}</div>; // Show error message
    }

    return (
        <div className='w-screen'>
            {blog.image && (
                <div>
                    <img
                        src={`data:image/png;base64,${blog.image}`}
                        alt={blog.title}
                        className="w-full h-40 object-cover object-center"
                    />
                </div>
            )}

            <div className='max-w-5xl mx-auto'>
                {blog && (
                    <div>
                        <div className='text-5xl font-semibold px-4 pt-4 pb-2' dangerouslySetInnerHTML={{ __html: blog.title }} />

                        {blog.sub_heading && <h2 className='text-2xl text-zinc-600 font-semibold px-4 pb-4'>{blog.sub_heading}</h2>}
                        {/* Render tags */}
                        {blog.tags && blog.tags.length > 0 && (

                            <div className='flex space-x-4 px-4'>
                                {blog.tags.map((tag, index) => (
                                    <span className=' text-sm font-semibold' key={index}>#{tag}</span>
                                ))}
                            </div>
                        )}

                        <div className='px-8 py-2'>
                            <img
                                src={`data:image/png;base64,${blog.image}`}
                                alt={blog.title}
                                className="w-full h-auto rounded-lg"
                            />
                        </div>



                        {/* Main Content not implement Correctly Till Now . */}
                        <div className='p-4' dangerouslySetInnerHTML={{ __html: blog.content }} />




                    </div>
                )}
            </div>
        </div>
    );
}

export default SepBlog;
