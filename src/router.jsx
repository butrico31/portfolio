import React from "react"
import { createBrowserRouter } from "react-router-dom"
import Home from './pages/Home.jsx'

export const router = createBrowserRouter([
    {
        index: true,
        element: <Home />,
    },

])
