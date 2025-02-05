import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Home from './Home.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from './Profile/Profile.jsx'
import AddListing from './Listing/AddListing.jsx'
import { Toaster } from "@/components/ui/sonner"
import CategoryFilter from './Search/[category]/CategoryFilter'
import SearchOptions from './Search/SearchOptions'
import ListingDetail from './Listing/ListingDetails/[id]/ListingDetail'
import AboutUs from './Pages/AboutUs'
import ContactUs from './Pages/ContactUs'
import { dark } from '@clerk/themes'
import MakeOffer from './Pages/MakeOffer'

//React routing for page pathes by assigning their routes and which elements it should render
const router = createBrowserRouter([
  {
    path: '/',
    element:<Home/>,
  },
  {
    path: '/profile',
    element: <Profile/>
  },
  {
    path: '/add-listing',
    element: <AddListing/>
  },
  {
    path: '/search/:category',
    element: <CategoryFilter/>
  },
  {
    path: '/search',
    element: <SearchOptions/>
  },
  {
    path: '/listing-details/:id',
    element: <ListingDetail/>
  },
  {
    path: '/about',
    element: <AboutUs/>
  },
  {
    path: '/contact',
    element: <ContactUs/>
  },
  {
    path: '/makeoffer',
    element: <MakeOffer/>
  }

])

//Clerk.io API key to be used for authentication
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" 
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#60a5fa", // Tailwind blue-400 for accents
          colorPrimaryDark: "#2563eb", // Tailwind blue-600 for darker accents
          colorText: "#e5e7eb", // Tailwind gray-300 for text
          colorBackground: "#0f172a", // Tailwind slate-800 for background
          colorInputBackground: "#334155", // Tailwind slate-700 for input fields
          colorInputText: "#ffffff", // White text in inputs
          colorNeutral: "#ffffff", // Tailwind slate-800
          colorNeutralDark: "#0f172a", // Tailwind slate-900 for darkest areas
        },
      }}
    >
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
