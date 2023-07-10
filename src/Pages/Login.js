import React, { useEffect, useState } from "react";
import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate, NavLink } from "react-router-dom";
import "../PagesCSS/Home.css";
import "../PagesCSS/Myitem.css";
import LayoutBefore from "../Components/LayoutBefore.js";

let activeStyle = {
  color: "#80De80",
  transition: "all 0.2s linear",
};

function Login() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [user, loading, error] = useAuthState(auth);
const navigate = useNavigate();
useEffect(() => {
  if (loading) {
    // trigger a loading screen
    return;
  }
  if (user) navigate("/home"); //change to page after login
}, [user, loading]);
  return (
    <section>
      <LayoutBefore/>
      <div class="flex items-center text-center pt-10 pb-5 px-10">
        <div class="flex items-center text-3xl font-semibold text-gray-800 md:text-4xl">
          Login
        </div>
      </div>

      <div class="px-4">
        <div class="bg-white px-8 py-6 pb-8 mb-4 bg-gray-100">
          <div class="mb-6">
            <label class="block mb-2 bg-general-colortext-sm font-medium text-gray-900 dark:text-gray-300">
              Userame or Email Address*
            </label>
            <input
              type="text"
              id = "username"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
              required
            ></input>
          </div>
          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Password
            </label>
            <input
              id="password"
              type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            ></input>
          </div>
          <button
            //type="submit"
            // className="login__btn"
            class="text-white bg-teal-300 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-7 py-2.5 text-center dark:bg-teal-300 dark:hover:bg-teal-500 dark:focus:ring-teal-700 my-2"
            onClick={() => logInWithEmailAndPassword(email, password)}
          >
            Login
          </button>
          <div class="text-sm"> <br/>&emsp; &emsp; &emsp;&emsp;&emsp; New to Foodify
            <a
              href="/signup"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              <br/>&emsp; &emsp; &emsp; &emsp;&emsp;&emsp; Sign Up!
            </a>
            </div>
        </div>
      </div>
    </section>
  );
}
export default Login;