import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/navbar/Navbar";
import CreateBlog from "../pages/CreateBlog";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/categories/Category";

const BlogRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Home />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default BlogRoutes;
