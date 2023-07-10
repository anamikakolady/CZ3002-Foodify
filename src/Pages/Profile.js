import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase/firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import "../PagesCSS/Home.css";
import { NavLink } from "react-router-dom";
import Layout from "../Components/Layout.js";


export default function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
  try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
      setPhone(data.phone);
  } catch (err) {
      console.error(err);
      alert("An error occured while fetching user data");
  }
  };
  useEffect(() => {
  if (loading) return;
  if (!user) return navigate("/");
  fetchUserName();
  }, [user, loading]);

  return (
    <section>
      <Layout/>
        <div class="flex items-center text-center pt-10 pb-5 px-10">
            <div class="flex items-center text-3xl font-semibold text-gray-800 md:text-4xl">My Profile</div>
        </div>

        <div class="bg-white px-8 py-6 pb-8 mb-4 bg-gray-100 ">
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Email: {user?.email}
            </label>
          </div>

          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Name: {name}
            </label>
          </div>

          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Phone Number: {phone}
            </label>
          </div>
          </div>


        <div class="flex px-5 justify-center lg:justify-start">
            <a class="flex-grow mx-4 my-3 px-4 py-3 bg-gray-200 text-gray-500 text-sm font-semibold rounded hover:bg-gray-200" href="/editprofile">Edit Profile</a>
        </div>

    </section>

  );
}
