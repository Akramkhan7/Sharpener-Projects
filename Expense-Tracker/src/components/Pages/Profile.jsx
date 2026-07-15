import React, { useEffect, useRef, useState } from "react";
import { updateProfile } from "firebase/auth";
import { useSelector } from "react-redux";
import { auth } from "../Firebase/firebase";
import { CgSpinner } from "react-icons/cg";

function Profile() {
  const fullNameRef = useRef();
  const photoRef = useRef();

  const idToken = useSelector((state) => state.auth.token);

  const API_KEY = import.meta.env.VITE_FIREBASE_API_KEY;

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (idToken) {
      fetchUserDetails();
    }
  }, [idToken]);

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            idToken,
          }),
        }
      );


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      const user = data.users[0];

      fullNameRef.current.value = user.displayName || "";
      photoRef.current.value = user.photoUrl || "";
    } catch (err) {
      console.log(err.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateProfile(auth.currentUser, {
        displayName: fullNameRef.current.value,
        photoURL: photoRef.current.value,
      });

      setLoading(false);

      alert("Profile Updated Successfully");
    } catch (err) {
      setLoading(false);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center px-4">
      <div className="w-full max-w-2xl rounded-xl bg-white shadow-lg p-8">
        <h1 className="text-3xl font-bold text-slate-800 border-b pb-4 mb-8">
          Contact Details
        </h1>

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Full Name
            </label>

            <input
              ref={fullNameRef}
              type="text"
              placeholder="Enter your full name"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium text-slate-700">
              Profile Photo URL
            </label>

            <input
              ref={photoRef}
              type="url"
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-indigo-600 py-3 font-semibold text-white hover:bg-indigo-700 disabled:bg-indigo-400 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <CgSpinner className="animate-spin text-xl" />
                Updating...
              </>
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;