import { useContext, useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import clsx from "clsx";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [result, setResult] = useState(null);

  const { userRegister } = useContext(AuthContext);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    // Getting the response from authContext
    const response = await userRegister(username, email, password);

    setResult(response); // storing in variable  created using useState

    // Sending user to the homepage
    if (response?.success) {
      navigate("/");
    }
  }

  // if user start typing then error message must be blank
  useEffect(() => {
    // reseting the result
    setResult(null);
  }, [username, email, password]);

  return (
    <>
      <section
        className={clsx(
          `shadow-xl/30 lg:w-[25vw] lg:h-[85vh] absolute left-[50%] top-[50%] -translate-1/2 flex flex-col lg:gap-8 justify-center items-center lg:p-5 rounded-2xl lg:rounded-4xl`,
          "w-[90%] py-10 gap-4"
        )}
      >
        {/* Title and Subtitle */}
        <div className="title w-full text-center flex flex-col gap-2">
          <h1 className="text-3xl lg:text-5xl font-bold flex justify-center items-center gap-2">
            <FaEdit className="text-[#ff7b00]" /> <span>Blogify</span>
          </h1>
          <p className="text-xl lg:text-2xl text-gray-600">
            Create an account to start writing.
          </p>

          {!result?.success ? (
            <p className="errorMessage text-red-500 px-4 mt-2">
              {result?.message}
            </p>
          ) : null}
        </div>

        {/* Form Inputs */}
        <form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          className="form flex flex-col gap-4 w-full lg:px-10 px-5"
        >
          <div className="usernameInputs flex flex-col gap-1">
            <label
              htmlFor="username"
              className="text-lg lg:text-xl font-bold px-2"
            >
              Username
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="outline-none bg-[#f1f1f1] lg:p-4 p-3 rounded-lg lg:rounded-2xl"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              value={username}
            />
            <div className="errorMessage text-red-500 px-4">
              {result?.errors?.map((item) =>
                item?.path === "username" ? item?.msg : null
              )}
            </div>
          </div>

          <div className="emailInputs flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-lg lg:text-xl font-bold px-2"
            >
              Email
            </label>
            <input
              type="text"
              placeholder="Enter email"
              className="outline-none bg-[#f1f1f1] lg:p-4 p-3 rounded-lg lg:rounded-2xl"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
            <div className="errorMessage text-red-500 px-4">
              {result?.errors?.map((item) =>
                item?.path === "email" ? item?.msg : null
              )}
            </div>
          </div>

          <div className="passwordInputs flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-lg lg:text-xl font-bold px-2"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="••••••"
              className="outline-none bg-[#f1f1f1] lg:p-4 p-3 rounded-lg lg:rounded-2xl"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            <div className="errorMessage text-red-500 px-4">
              {result?.errors?.map((item) =>
                item?.path === "password" ? item?.msg : null
              )}
            </div>
          </div>

          <div className="btn w-full mt-5">
            <button
              type="submit"
              className="bg-[#ff7b00] w-full p-2 lg:p-4 rounded-lg lg:rounded-xl text-white font-medium text-lg lg:text-2xl"
            >
              Create Account
            </button>
          </div>
        </form>

        {/* Google SignUp */}
        <div className="externalLinks flex flex-col gap-6 w-full lg:px-10 px-5">
          <div className="continue-with w-full flex gap-2 justify-between items-center">
            <div className="line w-full h-px bg-gray-400"></div>
            <p className="w-full text-sm lg:text-xl">Or continue with</p>
            <div className="line w-full h-px bg-gray-400"></div>
          </div>
          <div className="w-full flex justify-between items-center gap-4">
            <div className="google w-full border border-gray-400 rounded-lg lg:rounded-xl flex justify-center items-center p-2 lg:p-4">
              <button className="flex gap-2 justify-center items-center text-lg lg:text-xl font-medium">
                <FcGoogle /> <span>Google</span>
              </button>
            </div>
            <div className="facebook w-full border border-gray-400 rounded-lg lg:rounded-xl flex justify-center items-center p-2 lg:p-4">
              <button className="flex gap-2 justify-center items-center text-lg lg:text-xl font-medium">
                <FaFacebook className="text-blue-600" /> <span>Facebook</span>
              </button>
            </div>
          </div>
          <div className="signUp flex justify-center items-center">
            <p className="flex justify-center items-center gap-2 text-lg lg:text-xl">
              Already have an account?{" "}
              <Link
                to={"/login"}
                className="font-bold text-[#ff7b00] hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
