import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import Contact from './Contact.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './Profile/Profile.jsx'
import AddListing from './Listing/AddListing.jsx'

//React routing for page pathes by assigning their routes and which elements it should render
const router = createBrowserRouter([
  {
    path: '/',
    element:<Home/>,
  },
  {
    path: '/contact',
    element:<Contact/>,
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/add-listing',
    element: <AddListing/>
  }
])

//Clerk.io API key to be used for authentication
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
    </ClerkProvider>
  </StrictMode>
);
