import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, db, logout } from "../firebase/firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";

import "../PagesCSS/Home.css";
import pic1 from "../Images/FoodifyBckgd.jpg";
import pic2 from "../Images/HomeImg2.jpg";
import { NavLink } from "react-router-dom";
import Layout from "../Components/Layout.js";

let activeStyle = {
  color: "#80De80",
  transition: "all 0.2s linear",
};

function Home() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
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
      <Layout />
      <div class="flex items-center text-center pt-8 pb-5 px-10"></div>
      <div class="py-4 bg-gray-100 rounded mx-10 my-15">
        <div class="flex px-4 justify-center lg:justify-start">
          <a
            class="text-center flex-grow mx-4 my-3 px-4 py-3 bg-blue-200 text-black-500 text-sm font-semibold rounded hover:bg-indigo-200"
            href="/profile"
          >
            My Profile
          </a>
        </div>
        <div class="flex px-5 justify-center lg:justify-start">
          <a
            class="text-center flex-grow mx-4 my-3 px-4 py-3 bg-blue-200 text-black-500 text-sm font-semibold rounded hover:bg-indigo-200"
            href="/myitem"
          >
            View My Items
          </a>
        </div>

        <div class="flex px-5 justify-center lg:justify-start">
          <a
            class="text-center flex-grow mx-4 my-3 px-4 py-3 bg-blue-200 text-black-500 text-sm font-semibold rounded hover:bg-indigo-200"
            href="/marketplace"
          >
            Visit Marketplace
          </a>
        </div>
        <br />

        <div class="flex px-5 justify-center lg:justify-centers">
          <div class="font-medium text-indigo-600 hover:text-indigo-500">
            Logged in as: {name}
          </div>
        </div>
        <br />
        <div class="flex px-5 justify-center lg:justify-centers">
          <div class="font-medium text-indigo-600 hover:text-indigo-500">
            {user?.email}
          </div>
        </div>
        <button
          class="flex-grow mx-14 my-3 px-6 py-3 bg-gray-200 text-gray-500 text-sm font-semibold rounded hover:bg-gray-200"
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </section>
  );
}

export default Home;
