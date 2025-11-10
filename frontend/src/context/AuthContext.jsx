import { createContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  async function userRegister(username, email, password) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Frontend User Register Function Error: ", error.message);
    }
  }

  async function userLogin(username, password) {
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Frontend User Login Function Error: ", error.message);
    }
  }

  async function createPost(formData) {
    try {
      const response = await fetch(
        "http://localhost:3000/api/blogs/createBlog",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      const data = await response.json();

      console.log(data);
      return data;
    } catch (error) {
      console.log("Frontend Create Post Function Error: ", error.message);
    }
  }

  async function getAllPost() {
    try {
      const response = await fetch(
        "http://localhost:3000/api/blogs/getAllBlogs"
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Frontend getAllPost function error: ", error.message);
    }
  }

  async function getSingleBlog(blogId) {
    try {
      const response = await fetch(
        `http://localhost:3000/api/blogs/getSingleBlog/${blogId}`
      );

      const data = await response.json();

      return data;
    } catch (error) {
      console.log("Error from getSinglePost: ", error.message);
    }
  }

  async function getUserBlog() {
    const response = await fetch(
      "http://localhost:3000/api/blogs/getUserBlog/6904b8339013c67fd807e191",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();

    return data;
  }

  async function blogLiked(blogId) {
    try {
      console.log('Reached blogLiked', blogId)
      const response = await fetch(`http://localhost:3000/api/blogs/blogLiked/${blogId}`,  {
        method: 'GET',
        credentials: 'include'
      })

      const data = await response.json();

      return data
    } catch (error) {
      console.log('Frontend Error from userLiked Function: ', error.message)
    }
  }

  async function getLoggedInUser() {
    try {
      const response = await fetch('http://localhost:3000/api/auth/getLoggedInUser', {
        method: 'GET',
        credentials: 'include'
      })

      const data = await response.json();

      return data;
    } catch (error) {
      console.log('Frontend Error  from getLoggedInUser: ', error.message)
    }
  }
  return (
    <AuthContext.Provider
      value={{
        userRegister,
        userLogin,
        createPost,
        getAllPost,
        getSingleBlog,
        getUserBlog,
        blogLiked,
        getLoggedInUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
