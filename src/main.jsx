import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Contact from './Contact.jsx'

//React routing for page pathes by assigning their routes and which elements it should render
const router = createBrowserRouter([
  {
    path: '/',
    element:<Home/>,
  },
  {
    path: '/contact',
    element:<Contact/>,
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
