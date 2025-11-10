import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiaToggleOnSolid } from "react-icons/lia";
import { LiaToggleOffSolid } from "react-icons/lia";

const SettingDashboard = ({ user, blogs }) => {
  const [username, setUsername] = useState(user &&  user[0]?.username);
  const [email, setEmail] = useState(user && user[0]?.email);
  const [bio, setBio] = useState(user && user[0]?.bio);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <section className="w-full h-[98%] lg:px-25 px-5 py-2 flex flex-col lg:gap-5 overflow-auto">
        <div className="py-5 flex justify-between">
          <div className="flex flex-col">
            <h1 className="font-bold heading-smallheader">Settings</h1>
            <p className="font-normal paragraph-body text-gray-500">
              Manage your profile, password and notification preferences
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-2">
          <div className="flex flex-col">
            <h1 className="heading-smallheader font-bold">Profile Information</h1>
            <p className="paragraph-body text-gray-600">
              Update your personal details here
            </p>
          </div>

          <form className="flex flex-col gap-4">
            {/* Name and Email Inputs */}
            <div className="flex justify-between gap-5 p-2">
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
                className="lg:w-[88%] border border-gray-300 h-[10vh] resize-none rounded-lg shadow-md focus:outline-[#ff7b00]"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="btn">
              <button
                onClick={() => {
                  navigate("/createBlog");
                }}
                className="bg-[#ff7b00] w-fit p-2 rounded-lg text-white font-medium paragraph-body"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-2 py-2">
          <div className="flex flex-col">
            <h1 className="heading-smallheader font-bold">Change Password</h1>
            <p className="paragraph-body text-gray-600">
              For your security, we recommend using strong password.
            </p>
          </div>

          <form className="flex flex-col gap-4">
            {/* currentPassword and newPassword */}
            <div className="flex lg:flex-row flex-col justify-between gap-5 p-2">
            
              <div className="flex flex-col w-full gap-2">
                <label htmlFor="currentPassword" className="paragraph-body font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  className="lg:w-[75%] p-3 border border-gray-300 rounded-lg shadow-md focus:outline-[#ff7b00]"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col w-full gap-2">
                <label htmlFor="newPassword" className="paragraph-body font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  className="lg:w-[75%] p-3 border border-gray-300 rounded-lg shadow-md focus:outline-[#ff7b00]"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="btn lg:w-[20%]">
              <button
                onClick={() => {
                  navigate("/createBlog");
                }}
                className="bg-[#ff7b00] w-fit p-2 rounded-lg text-white font-medium paragraph-body"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-5 py-2">
          <div className="flex flex-col">
            <h1 className="heading-smallheader font-bold">Notification Preference</h1>
            <p className="paragraph-body text-gray-600">
              Choose how you want to be notified
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center lg:w-[88%] border border-gray-300 rounded-xl p-4 shadow-md">
              <div className="flex flex-col w-full">
                <h1 className="font-medium text-xl">Comments on your posts</h1>
                <p className="text-gray-600 font-thin paragraph-body">
                  Receive an email when someone commented on your articles.
                </p>
              </div>

              <LiaToggleOnSolid className="text-[#ff7b00] text-5xl" />
            </div>
            <div className="flex justify-between items-center lg:w-[88%] border border-gray-300 rounded-xl p-4 shadow-md">
              <div className="flex flex-col w-full">
                <h1 className="font-medium text-xl">Comments on your posts</h1>
                <p className="text-gray-600 font-thin paragraph-body">
                  Receive an email when someone commented on your articles.
                </p>
              </div>

              <LiaToggleOnSolid className="text-[#ff7b00] text-5xl" />
            </div>
            <div className="flex justify-between items-center lg:w-[88%] border border-gray-300 rounded-xl p-4 shadow-md">
              <div className="flex flex-col w-full">
                <h1 className="font-medium text-xl">Comments on your posts</h1>
                <p className="text-gray-600 font-thin paragraph-body">
                  Receive an email when someone commented on your articles.
                </p>
              </div>

              <LiaToggleOnSolid className="text-[#ff7b00] text-5xl" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SettingDashboard;
