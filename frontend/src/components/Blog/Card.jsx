import React from 'react'
import { Link } from 'react-router-dom'

function Card({ id, title, subheading, imageURL }) {
    console.log(id)
    return (
        <Link to={`/blogs/${id}`} key={id} className='bg-white border border-zinc-100 shadow-md w-96 p-4 rounded-md col-span-1'>
            <p className='text-xl font-semibold p-1'>
                {title}
            </p>
            <span className='font-medium text-lg p-1'>
                {subheading}
            </span>
            <img
                src={imageURL}  
                alt="Blog"
                className="mt-4 w-96 h-60 rounded-lg"
            />
        </Link>
    )
}

export default Card