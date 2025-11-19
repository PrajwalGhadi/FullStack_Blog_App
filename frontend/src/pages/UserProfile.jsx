import { useContext, useEffect, useRef, useState } from "react";
import { MdOutlineEdit } from "react-icons/md";
import AuthContext from "../context/AuthContext";

const UserProfile = ({ user: propUser, blogs: propBlogs }) => {
  // 💡 Rename props to avoid confusion

  const [currentUser, setCurrentUser] = useState(
    Array.isArray(propUser) ? propUser[0] : propUser
  );

  const { getLoggedInUser } = useContext(AuthContext);

  console.log("Current User: ", currentUser);

  useEffect(() => {
    async function getUser() {
      const result = await getLoggedInUser();

      setCurrentUser(Array.isArray(result.user) ? result.user[0] : result.user);
    }

    if (!currentUser) {
      getUser();
    }
  }, [currentUser]);

  console.log(typeof currentUser);
  const [userAvatar, setUserAvatar] = useState(currentUser?.profilePicture || "");
  const [username, setUsername] = useState(currentUser?.username || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [bio, setBio] = useState(currentUser?.bio || "");
  const [firstname, setFirstname] = useState(currentUser?.firstName || "");
  const [lastname, setLastname] = useState(currentUser?.lastName || "");

  const [fileRefInput, setFileRefInput] = useState(null);

  const {updateUserDetails} = useContext(AuthContext)

  function handleEditAvatar() {
    setFileRefInput(fileRefInput.current.click)
  }

  function handleFileChange(event) {
    const selectedFile = event.target.files[0]

    if (selectedFile) {
      setUserAvatar(selectedFile)
    }
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('username', username);
    formData.append('email', email);
    formData.append('bio', bio);
    formData.append('firstname', firstname);
    formData.append('lastname', lastname);
    formData.append('image', userAvatar);

    const result = await updateUserDetails(formData);

    console.log(result.message);
  }

  useEffect(() => {
    // Only run if currentUser is a valid object
    if (currentUser && typeof currentUser === "object") {
      // Update all the individual form states with the new user data
      setUserAvatar(currentUser.profilePicture || "");
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
      setBio(currentUser.bio || "");
      setFirstname(currentUser.firstName || "");
      setLastname(currentUser.lastName || "");
    }
  }, [currentUser]);

  return (
    <section className="lg:px-25 px-5 flex flex-col gap-5 overflow-auto no-scrollbar">
      <div className="py-5 flex lg:flex-row flex-col justify-between gap-4">
        <div className="flex flex-col w-full">
          <h1 className="font-bold heading-smallheader">My Profile</h1>
          <p className="font-normal paragraph-body text-gray-500">
            Manage your profile information and preferences.
          </p>
        </div>
      </div>

      <div className="flex justify-between lg:flex-row flex-col gap-5">
        <div className="lg:w-[50%] flex flex-col gap-4 justify-center items-center min-h-[30vh]">
          <div className="relative">
            <div
              className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-32 shadow-lg"
              data-alt="User avatar image with an abstract pattern"
              style={{
                backgroundImage: `${ userAvatar ? 
                  `url(${userAvatar})` :
                  'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCrTGUKyyqw5CD04XrmsBMRbDQ1aFaUrXbC_aErZbwF131Y6TUUt5GMWUfvHu_uOvwTmf5g2AYDyh_JZP03z4ER0BpwnjVnoB99LpO63B2EKt31KYU6RKuZB9wy7550cKpxLHJdg5_geRDI-4Ik11FyEW1YqY5e0r-ELf0obHGswFIttWh-9hPN6uZljhn78qy4j-F5PKE4Hh94IvEKaiU8xHFoJpZgIHYYj6BsLukhfNZQKe0ECpCfoC7cUYGGxBl6j-KvpM4cAvQ")'
                }`,
              }}
            ></div>
            <button
              className="absolute  bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-400 text-[#11221f] hover:bg-primary/90 transition-colors active:scale-95"
              onClick={handleEditAvatar}
            >
              <MdOutlineEdit className=" text-xl" />
            </button>

            <input
              type="file"
              ref={fileRefInput}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="text-center flex flex-col gap-2">
            <button className="text-sm font-medium text-primary hover:text-primary/90 transition-colors">
              Change Picture
            </button>
            <p className="text-xs text-[#ff0202] -mt-2">
              * JPG, GIF or PNG. 1MB max.
            </p>

            {userAvatar ? (
              <p className="parargraph-body text-green-600">
                Selected file: {userAvatar.name}
              </p>
            ) : null}
          </div>
        </div>

        <div className="w-full">
          <form
            onSubmit={(e) => {
              handleFormSubmit(e);
            }}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-between p-2 gap-4">
              {/* Name Div */}
              <div className="flex flex-col w-full gap-2">
                <label
                  htmlFor="firstname"
                  className="paragraph-body font-medium"
                >
                  Firstname
                </label>
                <input
                  type="text"
                  className="w-full lg:w-[75%] p-3 rounded-lg border border-gray-300 shadow-md focus:outline-[#ff7b00]"
                  value={firstname}
                  onChange={(e) => {
                    setFirstname(e.target.value);
                  }}
                />
              </div>

              <div className=" flex flex-col w-full gap-2">
                <label
                  htmlFor="lastname"
                  className="paragraph-body font-medium"
                >
                  Lastname
                </label>
                <input
                  type="text"
                  className="w-full lg:w-[75%] p-3 rounded-lg border border-gray-300 shadow-md focus:outline-[#ff7b00]"
                  value={lastname}
                  onChange={(e) => {
                    setLastname(e.target.value);
                  }}
                />
              </div>
            </div>

            {/* Name and Email Inputs */}
            <div className="flex justify-between p-2 gap-4">
              {/* Name Div */}
              <div className="nameDiv flex flex-col w-full gap-2">
                <label htmlFor="name" className="paragraph-body font-medium">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full lg:w-[75%] p-3 rounded-lg border border-gray-300 shadow-md focus:outline-[#ff7b00]"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="emailDiv flex flex-col w-full gap-2">
                <label htmlFor="name" className="paragraph-body font-medium">
                  Email
                </label>
                <input
                  type="text"
                  className="w-full lg:w-[75%] p-3 rounded-lg border border-gray-300 shadow-md focus:outline-[#ff7b00]"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full p-2">
              <label htmlFor="bio" className="paragraph-body font-medium">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                className="lg:w-[88%] border p-3 border-gray-300 h-[10vh] resize-none rounded-lg shadow-md focus:outline-[#ff7b00]"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="btn flex justify-center lg:justify-start">
              <button className="bg-[#ff7b00] w-fit p-2 rounded-lg text-white font-medium paragraph-body">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className=""></div>
    </section>
  );
};

export default UserProfile;
