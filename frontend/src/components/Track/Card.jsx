import React from 'react'

function Card({ imgSrc, trackName }) {
    return (
        <div className='p-4 bg-white border-4 border-red-400 w-fit'>
            <div className='w-72 h-72 overflow-hidden'>
                <img src={imgSrc} alt="" className='w-full h-full object-cover' />
            </div>
            <p>{trackName}</p>
        </div>
    )
}

export default Card