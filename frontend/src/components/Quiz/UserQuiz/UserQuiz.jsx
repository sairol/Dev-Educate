import React, { useEffect, useState } from "react";

const UserQuiz = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [quizData, setQuizData] = useState();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const track_id = localStorage.getItem("TrackId");
  const subtopic_id = localStorage.getItem("CourseId");

  useEffect(() => {
    const fetchQuizData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/quiz?track_id=${track_id}&subtopic_id=${subtopic_id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tracks');
        }
        const data = await response.json();
        setQuizData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const toggleAccordion = (Section) => {
    setActiveSection(activeSection === Section ? null : Section);
    setSelectedSection(Section);
    setSelectedQuestion(null);
  };

  const handleOptionClick = (questionId, optionText) => {
    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: optionText,
    }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-bold mb-4">Quiz Navigation</h2>
        {quizData.map((SectionData) => (
          <div key={SectionData.section_id}>
            <button
              className="w-full text-left px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md mb-2 font-medium"
              onClick={() => toggleAccordion(SectionData.section_id)}
            >
              Section {SectionData.section_id}
            </button>
            {activeSection === SectionData.section_id && (
              <ul className="ml-4 mt-2">
                {SectionData.questions.map((question) => (
                  <li key={question.id}>
                    <button
                      className="text-sm text-blue-500 hover:underline"
                      onClick={() => setSelectedQuestion(question.id)}
                    >
                      Question {question.id}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        {selectedSection && !selectedQuestion ? (
          quizData
            .filter((Section) => Section.section_id === selectedSection)
            .map((Section) =>
              Section.questions.map((question) => (
                <div key={question.id} className="mb-8">
                  <h3 className="text-lg font-semibold mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />
                  <ul>
                    {question.options.map((option) => {
                      const isSelected = userAnswers[question.id] === option.option_text;
                      return (
                        <li
                          key={option.id}
                          className={`p-2 border rounded-md mb-2 cursor-pointer ${
                            isSelected
                              ? "bg-purple-400"
                              : isSubmitted && option.is_correct && userAnswers[question.id] === option.option_text
                              ? "bg-green-100 border-green-500"
                              : isSubmitted && userAnswers[question.id] === option.option_text && !option.is_correct
                              ? "bg-red-100 border-red-500"
                              : "border-gray-300"
                          }`}
                          onClick={() => handleOptionClick(question.id, option.option_text)}
                        >
                          {option.option_text}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )
        ) : (
          <>
            {selectedQuestion ? (
              <div>
                {quizData
                  .find((section) => section.section_id === selectedSection)
                  ?.questions.filter((question) => question.id === selectedQuestion)
                  .map((question) => (
                    <div key={question.id} className="mb-8">
                      <p className="text-lg font-semibold mb-2 bg-zinc-100 p-4 rounded-md w-full">
                        <span>Q{question.id}.{"  "}</span>
                        <span dangerouslySetInnerHTML={{ __html: question.question }} />
                      </p>

                      <ul>
                        {question.options.map((option) => {
                          const isSelected = userAnswers[question.id] === option.option_text;
                          return (
                            <li
                              key={option.id}
                              className={`p-2 border rounded-md mb-2 cursor-pointer ${
                                isSelected
                                  ? "bg-purple-400"
                                  : isSubmitted && option.is_correct && userAnswers[question.id] === option.option_text
                                  ? "bg-green-100 border-green-500"
                                  : isSubmitted && userAnswers[question.id] === option.option_text && !option.is_correct
                                  ? "bg-red-100 border-red-500"
                                  : "border-gray-300"
                              }`}
                              onClick={() => handleOptionClick(question.id, option.option_text)}
                            >
                              {option.option_text}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-gray-500">Select a Section to view the quiz questions.</p>
            )}
          </>
        )}

        {/* Submit Button */}
        <div className="mt-6">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserQuiz;
