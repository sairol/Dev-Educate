import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx';
import Login from './components/Login/Login.jsx';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Blog from './components/Blog/Blog.jsx';
import Features from './components/Feature/Features.jsx';
import Track from './components/Track/Track.jsx';
import Discord from './components/Discord/Discord.jsx';
import TrackList from './components/Track/TrackList/TrackList.jsx';
import CoursePageOutro from './components/Track/TrackList/CoursePage/CoursePage.jsx';
import TutorialsPage from './components/Track/TrackList/CoursePage/TutorialsPage/TutorialsPage.jsx';
import AdminQuizCreation from './components/Quiz/Admin/AdminQuizCreation.jsx';
import UserQuiz from './components/Quiz/UserQuiz/UserQuiz.jsx';
import CreateBlog from './components/Blog/CreateBlog.jsx';
import SepBlog from './components/Blog/SepBlog.jsx';
import ResourcePDF from './components/PDF/ResourcePDF.jsx';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/feature",
        element: <Features/>
      },
      {
        path:"/createBlog",
        element: <CreateBlog/>
      },
      {
        path:"/discord",
        element: <Discord/>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path:"/blogs",
        element:<Blog/>
      },
      {
        path:"/blogs/:id",
        element:<SepBlog/>
      },
      {
        path: "/track",
        element: <Track />
      },
      {
        path: "/track/:trackSlug",
        element: <TrackList/>
      },
      {
        path: "/track/:trackSlug/:courseSlug",
        element: <CoursePageOutro />
      },
      {
        path: "/track/:trackSlug/:courseSlug/content",
        element: <TutorialsPage />
      },
      {
        path:"/adminquiz",
        element : <AdminQuizCreation/>,
      },
      {
        path:"/track/:trackSlug/:courseSlug/quiz",
        element : <UserQuiz/>,
      },
      {
        path:"/resources",
        element : <ResourcePDF/>
      }
    ]
  }]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
