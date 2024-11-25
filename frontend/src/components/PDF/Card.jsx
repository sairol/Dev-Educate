import React from 'react'

function Card({ bookName, authorName, imgURL, pdfURL }) {
    const downloadPDF = () => {
        if (pdfURL) {
            const link = document.createElement('a');
            link.href = pdfURL;
            link.download = `${bookName}.pdf`;
            link.click();
        }
    };
    return (
        <div className='bg-white w-60 p-2 border-2 border-zinc-800 rounded-lg col-span-1' >
            <div className='flex justify-between items-baseline '>
                <span className='text-xl font-semibold '>{bookName}</span>
                <span className='font-semibold text-sm'>{authorName}</span>
            </div>
            <img className='border-transparent rounded-t-xl w-56 h-72' src={imgURL} alt={bookName} />


            <div >
                <button className='bg-blue-400 text-white text-xl w-full rounded-b-xl font-bold py-1 px-2' onClick={downloadPDF}>
                    Download PDF
                </button>
            </div>
        </div>
    )
}

export default Card