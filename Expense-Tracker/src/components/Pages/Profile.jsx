import { updateProfile } from "firebase/auth";
import React, { useRef } from "react";
import { auth } from "../Firebase/firebase";

function Profile() {
  const fullNameRef = useRef();
  const photoRef = useRef();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const enteredName = fullNameRef.current.value;
    const enteredUrl = photoRef.current.value;

    try {
      await updateProfile(auth.currentUser, {
        enteredName,
        enteredUrl,
      });
      console.log("Data updated");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold text-gray-800 border-b pb-4 mb-8">
          Contact Details
        </h1>

        <form onSubmit={onSubmitHandler} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>

            <input
              ref={fullNameRef}
              type="text"
              placeholder="Enter your full name"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profile Photo URL
            </label>

            <input
              ref={photoRef}
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
