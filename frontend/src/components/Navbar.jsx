import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {

    const userID = localStorage.getItem('user')
    console.log(userID)
    return (

        <div className='flex justify-between p-4 items-center bg-zinc-600'>
            <Link to="/" >
                <div className='bg bg-red-400 border-black border-2 px-2 py-1' >DevEducate</div>
            </Link>
            <div className='flex space-x-6'>
                <Link to="/feature" >
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Features
                    </p>
                </Link>
                <Link to="/track">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Track
                    </p>
                </Link>
                <Link to="/blogs">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>

                        Blogs
                    </p>
                </Link>
                <Link to="/discord">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Join Discord
                    </p>
                </Link>
                <Link to="/createBlog">
                <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                    CreateBlog
                </p>
                </Link>
                <Link to="/adminquiz">
                    <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        Admin Quiz
                    </p>
                </Link>
                <Link to="/resources">
                <p className=' bg-red-400 border-black border-2 px-2 py-1'>
                        PDF
                    </p>
                </Link>
            </div>
            <div className='flex space-x-4'>

                {
                    !userID ? (


                        <Link to="/login">
                            <p className=' bg-red-400 border-black border-2 px-2 py-1'>Login</p>
                        </Link>

                    ) : (
                        <button
                            className=' bg-red-400 border-black border-2 px-2 py-1'
                            onClick={() => {
                                localStorage.removeItem('user');
                                window.location.reload();
                            }}>


                            Log Out


                        </button>
                    )
                }


            </div>
        </div>
    )
}

export default Navbar