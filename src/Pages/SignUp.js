import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import LayoutBefore from "../Components/LayoutBefore.js";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../firebase/firebase.js";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [user, loading, error] = useAuthState(auth);
  //const history = useNavigate();
  const navigate = useNavigate();
  const register = () => {
    if (!name) alert("Please enter name");
    else if (!phone) alert("Please enter phone no.");
    else
    registerWithEmailAndPassword(name, email, password, phone);
  };
  useEffect(() => {
    if (loading) return;
    //if (user) history.replace("/home");
    if (user) navigate("/home");
  }, [user, loading]);
  return (
    <section>
      <LayoutBefore/>
      <div class="flex items-center text-center pt-10 pb-5 px-10">
        <div class="flex items-center text-3xl font-semibold text-gray-800 md:text-4xl">
          Sign Up
        </div>
      </div>

      <div class="px-4">
        <div class="bg-white px-8 py-6 pb-8 mb-4 bg-gray-100">
          <div class="mb-6">
            <label class="block mb-2 bg-general-colortext-sm font-medium text-gray-900 dark:text-gray-300">
              Email Address*
            </label>
            <input
              id="email"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-mail Address"
            ></input>
          </div>

          <div class="mb-6">
            <label class="block mb-2 bg-general-colortext-sm font-medium text-gray-900 dark:text-gray-300">
              Phone No.*
            </label>
            <input
              id="phone"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone No."
              required
            ></input>
          </div>

          <div class="mb-6">
            <label class="block mb-2 bg-general-colortext-sm font-medium text-gray-900 dark:text-gray-300">
              Name
            </label>
            <input
              id="name"
              type="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
            ></input>
          </div>

          <div class="mb-6">
            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Password*
            </label>
            <input
              id="password"
              type="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            ></input>
          </div>

          <button
            onClick={register}
            class="text-white bg-teal-300 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-300 dark:hover:bg-teal-500 dark:focus:ring-teal-700 my-2"
          >
            Sign Up
          </button>
          <div class="text-sm">
            {" "}
            <br />
            &emsp; &emsp;&ensp; Already have an Account ?
            <a
              href="/signin"
              class="font-medium text-indigo-600 hover:text-indigo-500"
            >
              <br />
              &emsp; &emsp; &emsp; &emsp;&emsp;&emsp;&emsp; Login!
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SignUp;