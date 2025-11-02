import { IoColorPaletteOutline } from "react-icons/io5";
import { BsStars } from "react-icons/bs";
import { HiOutlineRocketLaunch } from "react-icons/hi2";
import { GrTechnology } from "react-icons/gr";
import { SiStylelint } from "react-icons/si";
import { Link, useLocation } from "react-router-dom";
import Category from "./categories/Category";

const Home = () => {
  const location = useLocation();

  function isActive(path) {
    return location.pathname === path;
  }

  return (
    <section className="flex justify-between items-center font-[LATO]"> 
      {/* Categories Sidebar */}
      <aside className="w-[20%] h-[85vh] py-15">
        <div className="category w-full px-10 pr-15 flex flex-col gap-4">
          <h1 className="text-2xl font-bold">Categories</h1>

          <div className="flex flex-col gap-2">
            {/* Each category has unique path */}
            <Link 
              to={'/category/all'} 
              className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                isActive('/category/all') ? 'bg-[#ff7b00] text-white font-medium' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <BsStars /> All Topics
            </Link>
            <Link 
              to={'/category/technology'} 
              className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                isActive('/category/technology') ? 'bg-[#ff7b00] text-white font-medium' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <GrTechnology /> Technology
            </Link>
            <Link 
              to={'/category/design'} 
              className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                isActive('/category/design') ? 'bg-[#ff7b00] text-white font-medium' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <IoColorPaletteOutline /> Design
            </Link>
            <Link 
              to={'/category/lifestyle'} 
              className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                isActive('/category/lifestyle') ? 'bg-[#ff7b00] text-white font-medium' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <SiStylelint /> Lifestyle
            </Link>
            <Link 
              to={'/category/productivity'} 
              className={`w-[85%] flex justify-start items-center gap-2 text-xl p-2 rounded-r-full ${
                isActive('/category/productivity') ? 'bg-[#ff7b00] text-white font-medium' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <HiOutlineRocketLaunch /> Productivity
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="w-full h-[85vh]">
        <Category />
      </div>
    </section>
  );
};

export default Home;
