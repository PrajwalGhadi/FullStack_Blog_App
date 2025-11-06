import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LiaToggleOnSolid } from "react-icons/lia";
import { LiaToggleOffSolid } from "react-icons/lia";

const SettingDashboard = ({ user, blogs }) => {
  const [username, setUsername] = useState(user[0]?.username);
  const [email, setEmail] = useState(user[0]?.email);
  const [bio, setBio] = useState(user[0]?.bio);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  return (
    <>
      <section className="w-full h-[98%] px-25 py-2 flex flex-col gap-5 overflow-auto">
        <div className="py-5 flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-4xl">Settings</h1>
            <p className="font-semibold text-2xl text-gray-500">
              Manage your profile, password and notification preferences
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 py-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Profile Information</h1>
            <p className="text-xl text-gray-600">
              Update your personal details here
            </p>
          </div>

          <form className="flex flex-col gap-4">
            {/* Name and Email Inputs */}
            <div className="flex justify-between gap-5 p-2">
              {/* Name Div */}
              <div className="nameDiv flex flex-col w-full gap-2">
                <label htmlFor="name" className="text-xl font-bold">
                  Username
                </label>
                <input
                  type="text"
                  className="w-[75%] p-4 border border-gray-300 rounded-2xl shadow-md focus:outline-[#ff7b00]"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </div>

              <div className="emailDiv flex flex-col w-full gap-2">
                <label htmlFor="name" className="text-xl font-bold">
                  Email
                </label>
                <input
                  type="text"
                  className="w-[75%] p-4 border border-gray-300 rounded-2xl shadow-md focus:outline-[#ff7b00]"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 w-full p-2">
              <label htmlFor="bio" className="text-xl font-bold">
                Bio
              </label>
              <textarea
                name="bio"
                id="bio"
                className="w-[88%] border border-gray-300 h-[10vh] resize-none rounded-2xl shadow-md focus:outline-[#ff7b00]"
                value={bio}
                onChange={(e) => {
                  setBio(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="btn w-[10%]">
              <button
                onClick={() => {
                  navigate("/createBlog");
                }}
                className="bg-[#ff7b00] w-full p-2 lg:p-3 rounded-lg lg:rounded-xl text-white font-medium text-lg lg:text-xl"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-2 py-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Change Password</h1>
            <p className="text-xl text-gray-600">
              For your security, we recommend using strong password.
            </p>
          </div>

          <form className="flex flex-col gap-4">
            {/* Name and Email Inputs */}
            <div className="flex justify-between gap-5 p-2">
              {/* Name Div */}
              <div className="nameDiv flex flex-col w-full gap-2">
                <label htmlFor="name" className="text-xl font-bold">
                  Current Password
                </label>
                <input
                  type="password"
                  className="w-[75%] p-4 border border-gray-300 rounded-2xl shadow-md focus:outline-[#ff7b00]"
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                  }}
                />
              </div>

              <div className="emailDiv flex flex-col w-full gap-2">
                <label htmlFor="name" className="text-xl font-bold">
                  New Password
                </label>
                <input
                  type="password"
                  className="w-[75%] p-4 border border-gray-300 rounded-2xl shadow-md focus:outline-[#ff7b00]"
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="btn w-[10%]">
              <button
                onClick={() => {
                  navigate("/createBlog");
                }}
                className="bg-[#ff7b00] w-full p-2 lg:p-3 rounded-lg lg:rounded-xl text-white font-medium text-lg lg:text-xl"
              >
                Update Password
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col gap-5 py-2">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Notificationi Preference</h1>
            <p className="text-xl text-gray-600">
              Choose how you want to be notified
            </p>
          </div>

          <div className="flex flex-col gap-4 w-full">
            <div className="flex justify-between items-center w-[88%] border border-gray-300 rounded-xl p-4 shadow-md">
              <div className="flex flex-col gap-1 w-full">
                <h1 className="font-bold text-xl">Comments on your posts</h1>
                <p className="text-gray-600 text-xl">
                  Receive an email when someone commented on your articles.
                </p>
              </div>

              <LiaToggleOnSolid className="text-[#ff7b00] text-5xl" />
            </div>
            <div className="flex justify-between items-center w-[88%] border border-gray-300 rounded-xl p-4 shadow-md">
              <div className="flex flex-col gap-1 w-full">
                <h1 className="font-bold text-xl">Comments on your posts</h1>
                <p className="text-gray-600 text-xl">
                  Receive an email when someone commented on your articles.
                </p>
              </div>

              <LiaToggleOnSolid className="text-[#ff7b00] text-5xl" />
            </div>
            <div className="flex justify-between items-center w-[88%] border border-gray-300 rounded-xl p-4 shadow-md">
              <div className="flex flex-col gap-1 w-full">
                <h1 className="font-bold text-xl">Comments on your posts</h1>
                <p className="text-gray-600 text-xl">
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
