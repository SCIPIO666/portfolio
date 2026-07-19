import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import HomePage from '../pages/HomePage'
import AboutPage from '../pages/AboutPage'
import ExperiencePage from '../pages/ExperiencePage'
import WorkPage from '../pages/WorkPage'
import ContactPage from '../pages/ContactPage'
import ResumePage from '../pages/ResumePage'
import NotFoundPage from '../pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/',           element: <HomePage /> },
      { path: '/about',      element: <AboutPage /> },
      { path: '/experience', element: <ExperiencePage /> },
      { path: '/work',       element: <WorkPage /> },
      { path: '/contact',    element: <ContactPage /> },
      { path: '/resume',     element: <ResumePage /> },
    ],
  },

  { path: '*', element: <NotFoundPage /> },
])