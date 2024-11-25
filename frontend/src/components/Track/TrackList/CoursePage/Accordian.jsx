import { useState, useEffect } from "react";

function Accordion({subtopic_id}) {
    const [openIndex, setOpenIndex] = useState(null);
    const [sections, setSections] = useState([]);

    const toggleAccordion = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/courseindex?subtopic_id=${subtopic_id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch sections");
            }
            const data = await response.json();
            setSections(data);
        };

        fetchData();
    }, [subtopic_id]);



    return (
        <div className="">
            {sections.map((item, index) => (
                <div key={item.id} className="relative pt-14 pb-6 border-b-2 border-zinc-800">
                    <div
                        className="flex items-center justify-between py-4 cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                    >
                        <div className="flex items-center space-x-4">
                            <span className="px-4 py-2 w-36 text-white text-xl rounded-full bg-[#5C76FF]">
                                {item.subtopic_id}
                            </span>
                            <h3 className="text-3xl">{item.name}</h3>
                        </div>
                        <button className="text-4xl">
                            {openIndex === index ? "−" : "+"}
                        </button>
                    </div>
                    <div
                        className={`transition-all duration-100 ease-in-out overflow-hidden ${openIndex === index ? "max-h-screen relative" : "max-h-0 absolute"
                            }`}
                        style={{ top: '100%', left: 0, width: '100%' }}
                    >
                        <div className="py-6">
                            {item.content?.length > 0 ? ( // Use optional chaining
                                <ul className="list-disc ml-6 space-y-2 text-xl">
                                    {item.content.map((content) => (
                                        <li key={content.id}>{content.title}</li> // Use title or index as key
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-xl">No additional details available.</p>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Accordion;


