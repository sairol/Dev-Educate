import React, { useState, useEffect } from 'react';

function AdminQuizCreation() {
    const [tracks, setTracks] = useState([]);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedTrack, setSelectedTrack] = useState(1); // Default to GoLang Basics
    const [selectedCourse, setSelectedCourse] = useState('');
    const [quizSections, setQuizSections] = useState([]);
    const [selectedSection, setSelectedSection] = useState(null);
    const [questions, setQuestions] = useState([{
        questionText: '', correctAnswer: 'Option 1',
        options: [{ text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false },
        { text: '', correct: false }]
    }]);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetch('http://localhost:8080/tracks');
                if (!response.ok) {
                    throw new Error('Failed to fetch tracks');
                }
                const data = await response.json();
                setTracks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTracks();
    }, []);



    

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await fetch(`http://localhost:8080/course?id=${selectedTrack}`);
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
    }, [selectedTrack]);





    

   

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/courseindex?subtopic_id=${selectedCourse}`);
            if (!response.ok) {
                throw new Error("Failed to fetch sections");
            }
            const data = await response.json();
            setQuizSections(data);
        };

        fetchData();
    }, [selectedCourse]);


    const handleQuestionChange = (index, key, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index][key] = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options[oIndex].text = value;
        setQuestions(updatedQuestions);
    };

    const handleOptionCorrectness = (qIndex, oIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].options.forEach((option, idx) => {
            if (idx === oIndex) {
                option.correct = value;
                if (value) {
                    // Set correctAnswer to the corresponding option
                    updatedQuestions[qIndex].correctAnswer = `Option ${oIndex + 1}`;
                }
            } else {
                option.correct = false; // Deselect other options
            }
        });
        setQuestions(updatedQuestions);
    };
    

    const handleAddQuestion = () => {
        setQuestions([...questions, {
            questionText: '', correctAnswer: 'Option 1',
            options: [{ text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false },
            { text: '', correct: false }]
        }]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedSection) {
            alert("Please select a quiz section.");
            return;
        }

        const subtopicId = parseInt(selectedCourse, 10);
        if (isNaN(subtopicId)) {
            alert("Invalid subtopic selected.");
            return;
        }

        const quizData = {
            name: `Golang Quiz Section`,
            track_id: selectedTrack,
            subtopic_id: subtopicId,
            questions: questions.map(q => ({
                question_text: q.questionText,
                correct_answer: q.correctAnswer,
                section_id: selectedSection,
                options: q.options.map(o => ({
                    text: o.text,
                    is_correct: o.correct
                }))
            }))
        };

        fetch('http://localhost:8080/admin/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizData),
        }).then(response => response.json())
            .then(data => console.log("Quiz created successfully", data))
            .catch(error => console.error("Error creating quiz:", error));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <p className='text-center text-3xl font-semibold p-8'>Quiz Creation</p>

            {/* Track Dropdown */}
            <div className='flex space-x-8'>
                <div className='bg-blue-200 w-fit p-4'>
                    <label>Select Track: </label>
                    <select value={selectedTrack} onChange={e => setSelectedTrack(parseInt(e.target.value))}>
                        {tracks.map(track => (
                            <option key={track.id} value={track.id}>{track.name}</option>
                        ))}
                    </select>
                </div>

                {/* Subtopic Dropdown */}
                <div className='bg-red-200 w-fit p-4'>
                    <label>Select Course: </label>
                    <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
                        {courses.map(course => (
                            <option key={course.id} value={course.id}>{course.name}</option>
                        ))}
                    </select>
                </div>

                <div className='bg-green-300 w-fit p-4'>
                    <h3>Select Quiz Section</h3>
                    <select onChange={(e) => setSelectedSection(parseInt(e.target.value))}>
                        <option value="">Select a Section</option>
                        {quizSections.map(section => (
                            <option key={section.id} value={section.id}>{section.name}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Question Form */}
            <div>
                <h3 className='text-2xl font-semibold p-8'>Questions</h3>
                {questions.map((question, index) => (
                    <div key={index} className='p-8'>

                        <div className='py-4'>
                            <p>
                                Question
                            </p>
                            <input
                                className='border-2 w-full border-zinc-800 rounded-md px-2 py-1 text-zinc-800 placeholder:text-zinc-400'
                                type="text"
                                placeholder="Enter Question Text"
                                value={question.questionText}
                                onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
                            />
                        </div>

                        {/* Options for the question */}
                        {question.options.map((option, oIndex) => (
                            <div key={oIndex} className='flex flex-col py-2'>
                                <label>
                                    <input
                                        type="radio"
                                        checked={option.correct}
                                        onChange={() => handleOptionCorrectness(index, oIndex, !option.correct)}
                                    />
                                    Answer {`option ${oIndex + 1}`}
                                </label>
                                <input
                                    className='border-2 border-zinc-800 rounded-md px-2 py-1 text-zinc-800 placeholder:text-zinc-400'
                                    type="text"
                                    placeholder={`Option ${oIndex + 1}`}
                                    value={option.text}
                                    onChange={(e) => handleOptionChange(index, oIndex, e.target.value)}
                                />

                            </div>
                        ))}

                    </div>
                ))}

                <div className='grid grid-cols-2 gap-4 p-8'>
                    <button className='col-span-1 bg-green-400 py-2 rounded-md' type="button" onClick={handleAddQuestion}>Add New Question</button>
                    
                    <button className='col-span-1 bg-red-400 py-2 rounded-md' type="button" onClick={handleSubmit}>Submit Quiz</button>
                </div>
            </div>
        </div>
    );
}

export default AdminQuizCreation;
