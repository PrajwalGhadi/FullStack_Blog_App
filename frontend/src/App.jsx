import { Routes, Route } from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import BlogRoutes from "./routes/BlogRoutes";

const App = () => {
  return (
    <>
      <main className="w-full lg:h-screen bg-[#F3F4F6]">
        <Routes>
          <Route path="/auth/*" element={<AuthRoutes />} />
          
          <Route path="/*" element={<BlogRoutes />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
