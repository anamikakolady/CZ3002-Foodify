import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, updateProfile} from "../firebase/firebase.js";
import { query, collection, getDocs, where } from "firebase/firestore";
import "../PagesCSS/Home.css";
import Layout from "../Components/Layout";
let activeStyle = {
  color: "#80De80",
  transition: "all 0.2s linear",
};

function EditProfile() {
const [user, loading, error] = useAuthState(auth);
const [email, setEmail] = useState("");
const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [preName, setPreName] = useState("");
const [prePhone, setPrePhone] = useState("");
const navigate = useNavigate();
const fetchUserName = async () => {
try {
    const q = query(collection(db, "users"), where("uid", "==", user?.uid));
    const doc = await getDocs(q);
    const data = doc.docs[0].data();
    setPreName(data.name);
    setName(data.name)
    setPrePhone(data.phone);
    setPhone(data.phone);
    //setEmail(user?.email);
    } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
    }
    };

const doUpdate = () => {
    try {
        if (!name) {
            alert("Please enter new name");
        }
        if (!phone) {
            alert("Please enter new phone no.");
        }
        else {
            updateProfile(user.uid, name, phone);
        }
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
            <div class="flex items-center text-3xl font-semibold text-gray-800 md:text-4xl">Edit Profile</div>
        </div>


        <div class="px-4">
            <div class="bg-white px-8 py-6 pb-8 mb-4 bg-gray-100">
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name</label>
                    <input id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={preName}
                    ></input>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone Number</label>
                    <input id="phonenumber" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={prePhone}
                    ></input>
                </div>

                <div class="text-sm" >
                    <a href ="/changepassword" class="font-medium text-indigo-600 hover:text-indigo-500">
                    Click here to Change Password <br/> <br/></a> 
                </div>
                
                <button 
                    //type="submit" 
                    class="text-white bg-teal-300 hover:bg-teal-700 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-300 dark:hover:bg-teal-500 dark:focus:ring-teal-700 my-2"
                    onClick={(doUpdate)}
                    >
                    Update
                </button>
                <Link to="/profile">
                    <button class="text-rose-900 bg-general-color hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-general-color dark:hover:bg-rose-500 dark:focus:ring-rose-700 my-2">
                        Cancel
                    </button>
                </Link>
            </div>

        </div>
    </section>
  );
} export default EditProfile;
