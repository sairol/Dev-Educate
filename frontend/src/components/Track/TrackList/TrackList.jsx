import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../Card';



function TrackList() {
    const { trackSlug } = useParams();

    const id = localStorage.getItem('TrackId')

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:8080/course?id=${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                // Set the tracks data to the state
                setCourses(data);

            } catch (error) {
                // Handle any errors
                setError(error.message);
            } finally {
                // Set loading to false once the data is fetched
                setLoading(false);

            }
        };

        fetchCourses();
    }, []);

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if any
    if (error) {
        return <div>Error: {error}</div>;
    }



    if (!courses) {
        return <div>Track not found</div>;
    }


    const handleLinkClick = (courseId) => {
        localStorage.setItem('CourseId', courseId);  // Save trackId to localStorage
    };


    return (
        <div className='p-8'>
            <div className='text-3xl p-4 text-center'>
                {trackSlug} Courses
            </div>
            <div className='grid grid-cols-4 gap-4'>
                {courses.map((course) => (
                    <Link key={course.name} to={course.name} onClick={() => handleLinkClick(course.id)} >
                        <Card key={course.id} trackName={course.name} imgSrc={course.img_url} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default TrackList;
