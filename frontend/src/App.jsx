import { Routes, Route } from "react-router-dom"
import AuthRoutes from "./routes/AuthRoutes"
import BlogRoutes from "./routes/BlogRoutes"

const App = () => {

  return (
    <>
        <main className="w-full h-screen bg-[#dbdbdb]">
           <Routes>
              <Route path="/*" element={<AuthRoutes/>}/>

              <Route path="/*" element={<BlogRoutes />} />
           </Routes>
        </main>
    </>
  )
}

export default App