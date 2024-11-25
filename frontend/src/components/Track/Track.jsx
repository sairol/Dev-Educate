import React, { useState, useEffect } from 'react';
import Card from './Card';
import { Link } from 'react-router-dom';

function Track() {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost:8080/tracks');
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                // Set the tracks data to the state
                setTracks(data);

            } catch (error) {
                // Handle any errors
                setError(error.message);
            } finally {
                // Set loading to false once the data is fetched
                setLoading(false);

            }
        };

        fetchTracks();
        console.log(tracks)
    }, []);

    // Display loading state
    if (loading) {
        return <div>Loading...</div>;
    }

    // Display error message if any
    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleLinkClick = (trackId) => {
        localStorage.setItem('TrackId', trackId);  // Save trackId to localStorage
    };

    return (
        <div className="p-8">
            <div className="text-3xl p-4 text-center">
                Courses
            </div>
            <div className="grid grid-cols-4 gap-4">
                {tracks.map((track) => (
                    <Link key={track.param} to={track.param} onClick={() => handleLinkClick(track.id)} >
                        <Card imgSrc={track.img_url} trackName={track.name} />
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default Track;

