import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Navbar from "../components/navbar/Navbar";
import CreateBlog from "../pages/CreateBlog";
import Dashboard from "../pages/Dashboard";
import Category from "../pages/categories/Category";
import SingleBlog from "../pages/singleBlog/SingleBlog";

const BlogRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:categoryName" element={<Home />} />
        <Route path="/singleBlog/:id" element = {<SingleBlog />} />
        <Route path="/createBlog" element={<CreateBlog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/:dashboardName" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default BlogRoutes;
