import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Accordion from './Accordian';
import VideoPlayer from './TutorialsPage/Player/VideoPlayer';

function CoursePageOutro() {
    const { courseSlug } = useParams();

    const id = localStorage.getItem('CourseId')

    return (
        <div className='p-12 bg-[#EDF0F6]'>
            <p className='text-center text-4xl'>{courseSlug}</p>

            <div className='grid grid-cols-3 space-x-10'>
                <div className='col-span-2 grid-cols-10 grid bg-[#0D132C] h-[60vh] text-white rounded-2xl p-10 '>

                    <div className='col-span-8 flex flex-col justify-between'>

                        <div className='flex space-x-4'>
                            <button className='text-xl px-4 py-2 rounded-full bg-white text-[#0D132C] font-medium' >
                                Duration : 2 Months
                            </button>
                            <button className='text-xl px-4 py-2 rounded-full border-2 border-white font-medium'>
                                Duration : 2 Months
                            </button>

                        </div>

                        <div className='flex flex-col'>
                            <span className='text-7xl font-semibold p-4'>
                                Golang Basics
                            </span>
                            <span className='text-2xl p-2'>
                                Improving development skills at Go. Build a full service for the portfolio.
                            </span>
                            <span className='text-2xl p-2'>
                                Learn how to create real projects using topical Go development approaches
                            </span>
                        </div>

                        <div className='flex space-x-4'>
                            <button className='bg-blue-500 px-6 py-2 text-2xl rounded-lg'>
                                <Link to='quiz'>
                                    Take a test
                                </Link>
                            </button>
                            <button className='border-2 border-blue-500 px-6 py-2 text-2xl rounded-lg'>
                                <Link to='content'>
                                    Take a seat
                                </Link>
                            </button>
                        </div>

                    </div>

                    <div className='col-span-2'>
                        5 Star
                    </div>
                </div>
                <div className='col-span-1 bg-[#0D132C] h-[60vh] rounded-2xl'>
                    <img className='p-12' src="https://static.tildacdn.com/tild6261-3863-4965-a435-636633666138/Frame_48097850.svg" alt="" />
                </div>

            </div>

            <div className='flex bg-white p-4 mt-6 rounded-xl justify-around'>
                <div className='flex flex-col w-80 bg-red-400 '>
                    <span className='text-black font-semibold py-1 text-lg'>
                        100% Complete
                    </span>
                    <span className='text-zinc-500'>
                        300 hours of practice
                    </span>
                    <span className='text-zinc-500'>
                        3 hours of theory
                    </span>
                </div>

                <div className='flex flex-col w-80 bg-blue-400'>
                    <span className='text-black font-semibold py-1 text-lg'>
                        No project
                    </span>
                    <span className='text-zinc-500'>
                        online bank, messenger, file storage or your
                    </span>
                </div>

                <div className='flex flex-col w-80 bg-red-400'>
                    <span className='text-black font-semibold py-1 text-lg'>
                        Direct communication with the speaker
                    </span>
                    <span className='text-zinc-500'>
                        6 online meeting in «question-answer » and separate chat
                    </span>
                </div>

                <div className='flex flex-col w-80 bg-blue-400'>
                    <span className='text-black font-semibold py-1 text-lg'>
                        Best Wishes
                    </span>
                    <span className='text-zinc-500'>
                        From Speaker
                    </span>
                </div>

            </div>

            <div className='bg-[#D6DFEB] p-12 h-[80vh] rounded-2xl mt-12'>
                <span className='text-6xl tracking-tighter font-semibold' >
                    For whom is the course
                </span>


                <div className='grid grid-cols-2 grid-rows-2 gap-8 p-4'>
                    <div className='bg-white p-4 h-64 rounded-2xl'>
                        <span className='text-3xl py-4'>
                            Beginner Developers at Go
                        </span>
                        <ul className='list-disc ml-6 text-xl'>
                            <li className='py-2'>
                                Improve service development and support skills
                            </li>
                            <li className='py-2'>
                                Practice at the most close to work cases
                            </li>
                        </ul>
                    </div>
                    <div className='bg-white p-4 h-64 rounded-2xl'>
                        <span className='text-3xl py-4'>
                            Backend Developers
                        </span>
                        <ul className='list-disc ml-6 text-xl'>
                            <li className='py-2'>
                                Learn Golang to move into the profession
                            </li>
                            <li className='py-2'>
                                Understand the intricacies of the language and learn how to build applications on Golang
                            </li>
                            <li className='py-2'>
                                Learn to effectively use Golang
                            </li>
                            <li className='py-2'>
                                Disfigure the development stack
                            </li>
                        </ul>
                    </div>
                    <div className='bg-white p-4 h-64 rounded-2xl'>
                        <span className='text-3xl py-4'>
                            DevOps Engineers and Fulstack Developers
                        </span>
                        <ul className='list-disc ml-6 text-xl'>
                            <li className='py-2'>
                                Introduce Golang solutions
                            </li>
                            <li className='py-2'>
                                Expand infrastructure development opportunities
                            </li>
                            <li className='py-2'>
                                Systematize knowledge about Golang
                            </li>
                        </ul>
                    </div>
                    <div className='bg-white p-4 h-64 rounded-2xl'>
                        <span className='text-3xl py-4'>
                            Developers in other languages
                        </span>
                        <ul className='list-disc ml-6 text-xl'>
                            <li className='py-2'>
                                Learn the basis of development on Golang
                            </li>
                            <li className='py-2'>
                                Learn more about development tools.
                            </li>
                            <li className='py-2'>
                                Gather a working project for a portfolio
                            </li>
                        </ul>
                    </div>
                </div>


            </div>

            <div className='py-12'>
                <span className='text-5xl font-semibold'>
                    The course will help you figure it out
                </span>

                <div className='h-[450px] bg-[#0D132C] mt-4 p-8 grid grid-cols-6 grid-rows-2 gap-8 rounded-2xl'>
                    <span className='col-span-3 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        How to make the project work and service user requests even when the part of the subsystems is degraded?
                    </span>
                    <span className='col-span-3 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        What patterns of interaction to apply to make a simple and reliable system?
                    </span>
                    <span className='col-span-2 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        How to prevent memory leaks in a loaded application?
                    </span>
                    <span className='col-span-2 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        How to avoid problems when working with the database?
                    </span>
                    <span className='col-span-2 bg-white rounded-2xl flex flex-col justify-center text-2xl text-center px-4'>
                        How to withstand growing loads without buying or renting additional equipment?
                    </span>
                </div>
            </div>


            <div className='grid grid-cols-5 gap-8'>
                <div className='col-span-2 w-full bg-[#D6DFEB] p-6 rounded-2xl'>
                    <span className='text-3xl font-medium'>
                        Knowledge will be required:
                    </span>


                    <ul className='list-disc ml-6 text-xl'>
                        <li className='py-2'>
                            Understanding of working with Databases and queues
                        </li>
                        <li className='py-2'>
                            Basic console skills
                        </li>
                        <li className='py-2'>
                            Commercial development experience from year to year
                        </li>
                    </ul>
                </div>
                <div className='col-span-3 w-full bg-white p-6 rounded-2xl'>
                    <span className='text-3xl font-medium'>
                        It will be a big plus:
                    </span>

                    <ul className='list-disc ml-6 text-xl'>
                        <li className='py-2'>
                            Experience with Docker
                        </li>
                        <li className='py-2'>
                            Linux Experience
                        </li>
                        <li className='py-2'>
                            Experience in writing a competitive / multithreaded code
                        </li>
                    </ul>
                </div>
            </div>


            <div className='h-screen py-12 flex flex-col space-y-8'>
                <span className='text-6xl font-semibold tracking-tight p-4'>
                    After the course you can
                </span>
                <div className='grid grid-cols-3 gap-8 h-[70vh]'>
                    <div className='col-span-1 grid grid-rows-3 gap-8 h-full'>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            Argumentally choose an asynchronous approach to reduce system connectivity and increase overall reliability
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            Effectively use the network for interaction between services and design functionality based on the domain area
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            Understand the device observability of large systems
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-rows-3 gap-8 h-full'>
                        <div className='row-span-1 h-full rounded-2xl bg-white p-8 text-xl'>
                            Confidently write to Golang and develop server and client applications
                        </div>
                        <div className='row-span-2 flex justify-center'>
                            <img className='w-80' src="https://optim.tildacdn.com/tild6536-6135-4137-a431-666662363665/-/resize/506x/-/format/webp/_2.png" alt="" />
                        </div>
                    </div>
                    <div className='col-span-1 grid grid-rows-3 gap-8 h-full'>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            Effectively and without surprises, saw a monolith on microservices and use linters to avoid errors
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            Work and synchronize goroutine and optimize for work in loaded applications
                        </div>
                        <div className='row-span-1 bg-white rounded-2xl p-8 text-xl'>
                            Guarantee the quality of service using unit and integration tests
                        </div>
                    </div>
                </div>

            </div>

            <div className='py-12'>
                <span className='text-6xl tracking-tighter font-semibold py-8'>
                    You will create one project to choose from
                </span>
                <div className='grid grid-cols-2 gap-8 py-4'>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            Online bank
                        </p>
                        <span className='text-xl'>
                            With authorization, processing of payments and account storage. You will create a fault tolerant system with the ability to withstand service failures .
                        </span>
                    </div>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            Your Project
                        </p>
                        <span className='text-xl'>
                            If you have a ready idea, check with the speaker how to implement it as part of our course
                        </span>
                    </div>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            File Storage
                        </p>
                        <span className='text-xl'>
                            With a subscription to events. You can use minio with s3 compatible protocol. Develop a subscription to the events of adding / changing files, taking into account working with billions of small files. Implement access control and versioning of file versions
                        </span>
                    </div>
                    <div className='p-8 bg-[#D6DFEB] rounded-2xl col-span-1'>
                        <p className='text-2xl font-semibold py-2'>
                            Messenger
                        </p>
                        <span className='text-xl'>
                            With authorization, message processing service and update delivery subsystem to customers. You will choose a way to store data. Take into account surges in customer reconnection and the ability to deliver messages offlineOnline bankYour projectFile storageMessenger
                        </span>
                    </div>

                </div>
            </div>


            <div className='py-12 h-screen grid grid-cols-8 gap-8'>
                <div className='h-full col-span-3 bg-white rounded-2xl p-8'>
                    <p className='text-5xl font-semibold'>
                        Course speaker
                    </p>
                    <div className='w-80 h-80'>
                        <img src="https://raw.githubusercontent.com/parasharanurag234/tempo/refs/heads/main/image.jpeg" alt="" />
                    </div>
                    <div>
                        <p>
                            Name
                        </p>
                        <ul className='list-disc ml-6 text-xl'>
                            <li>
                                99+ years in commercial development
                            </li>
                            <li>
                                Position Senior Software Engineer in YMCA
                            </li>
                            <li>
                                Writes complex projects with non-trivial business logic in different languages
                            </li>
                            <li>
                                He makes presentations at conferences
                            </li>
                            <li>
                                Builds infrastructure for projects in public clouds
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='h-full col-span-5 grid grid-rows-2 gap-8'>
                    <div className='row-span-1 bg-white rounded-2xl p-8'>
                        <p className='text-5xl font-semibold'>
                            Introductory lecture
                        </p>
                        <div className='grid grid-cols-2 gap-8'>
                            <div className='col-span-1'>
                                <VideoPlayer videoId={1} />
                            </div>
                            <div className='col-span-1 '>
                                <p>
                                    We answer the questions:
                                </p>
                                <ul className='list-disc'>
                                    <li>
                                        What will be on the course?
                                    </li>
                                    <li>
                                        What can you encounter at an interview?
                                    </li>
                                    <li>
                                        What features and nuances of use does Golang have?
                                    </li>
                                    <li>
                                        Who will the course suit?
                                    </li>
                                    <li>
                                        What will you face in real projects?
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='row-span-1 bg-white rounded-2xl p-8'>
                        <p className='text-5xl font-semibold'>
                            Past events
                        </p>
                    </div>
                </div>
            </div>

            <div className='py-12'>
                <p>
                    How's the training
                </p>
            </div>

            {/* fetch Index-Section from section */}
            <div className='py-12'>
                <p className='text-6xl font-medium py-4'>
                    Program
                </p>
                <Accordion subtopic_id={id} />
            </div>

            <div className='grid grid-cols-7 gap-8'>
                <div className='col-span-5 bg-[#D6DFEB] p-8 flex flex-col space-y-4 rounded-2xl'>
                    <p className='text-6xl font-semibold'>
                        Certificate
                    </p>
                    <span className='pr-28 text-xl '>
                        To each student who passes the 80% course, we will present a certificate of completion. And one who successfully fulfills more than 80% of practical tasks and protects the final project — will receive a number certificate
                    </span>

                </div>


                <div className='col-span-2 bg-white rounded-2xl'>
                    okio
                </div>
            </div>

        </div>
    )
}

export default CoursePageOutro