import React, { useEffect } from "react"
import ReactDOM from "react-dom/client"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import gsap from "gsap"
import { ScrollSmoother } from "gsap/ScrollSmoother"

gsap.registerPlugin(ScrollSmoother)

function App() {
  useEffect(() => {

    const smoother = ScrollSmoother.create({
      wrapper: ".wrapper",
      content: ".content",
      smooth: 1.4,
      effects: true,
    })

    return () => {
      if (smoother) smoother.kill()
    }
  }, [])

  return (
    <>
      <div className="wrapper">
        <div className="content">
          <RouterProvider router={router} />
        </div>
      </div>
    </>
  )
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)