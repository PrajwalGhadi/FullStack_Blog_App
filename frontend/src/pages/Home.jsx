import { IoColorPaletteOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { GrTechnology } from "react-icons/gr";
import { SiStylelint } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import Category from "./categories/Category";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <section className="flex lg:flex-row flex-col justify-between items-center font-[LATO]">
      {/* Categories Sidebar */}
      <aside className="lg:w-[18%] w-full lg:h-[85vh] lg:flex lg:py-5 overflow-auto no-scrollbar lg:overflow-hidden">
        <div className="category w-full lg:px-5 lg:pr-10 flex lg:flex-col items-center lg:items-start py-2">
          <h1 className="text-lg font-bold lg:px-4 fixed lg:relative lg:bg-transparent bg-[#F3F4F6] py-2 px-1">Categories</h1>

          {/* Each category has unique path */}
          <div className="w-full flex lg:flex-col gap-2 lg:px-4 lg:py-2 lg:shadow-lg rounded-lg mx-25 lg:mx-0">
            <Link
              to={"/category/all"}
              className={`w-full flex justify-start items-center gap-2 text-xm p-2 rounded-lg ${
                isActive("/category/all")
                  ? "bg-[#ff7b00] text-white font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <BsStars /> All 
            </Link>
            <Link
              to={"/category/technology"}
              className={`w-full flex justify-start items-center gap-2 text-xm p-2 rounded-lg ${
                isActive("/category/technology")
                  ? "bg-[#ff7b00] text-white font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <GrTechnology /> Technology
            </Link>
            <Link
              to={"/category/design"}
              className={`w-[85%] flex justify-start items-center gap-2 text-xm p-2 rounded-lg ${
                isActive("/category/design")
                  ? "bg-[#ff7b00] text-white font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <IoColorPaletteOutline /> Design
            </Link>
            <Link
              to={"/category/lifestyle"}
              className={`w-[85%] flex justify-start items-center gap-2 text-xm p-2 rounded-lg ${
                isActive("/category/lifestyle")
                  ? "bg-[#ff7b00] text-white font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <SiStylelint /> Lifestyle
            </Link>
            <Link
              to={"/category/productivity"}
              className={`w-[85%] flex justify-start items-center gap-2 text-xm p-2 rounded-lg ${
                isActive("/category/productivity")
                  ? "bg-[#ff7b00] text-white font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <HiOutlineRocketLaunch /> Productivity
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="w-full lg:h-[85vh] h-[81.25vh] overflow-auto no-scrollbar py-2 lg:py-0">
        <Category />
      </div>
    </section>
  );
};

export default Home;
