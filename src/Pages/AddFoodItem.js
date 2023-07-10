import React, { useState, useEffect, useReducer } from "react";
import {Link, useNavigate, NavLink} from "react-router-dom";
import "../PagesCSS/Home.css";
import "../PagesCSS/Myitem.css"
import Layout from "../Components/Layout";
import "..//ComponentsCSS/SideMenu.css";
import db from '../firebase/firebase';
import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs,  addDoc, where } from "firebase/firestore";

export default function AddFoodItem() {
    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expiryDate, setExpiryDate] = useState("");

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userID, setUserID] = useState("");

    const [, forceUpdate] = useReducer(x => x + 1, 0);



    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    // Fetch user data
    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUserName(data.name);
            setUserEmail(data.email);
            setUserID(data.uid);
            console.log(userName);
            console.log(userEmail);
            console.log(userID);
        } catch (err) {
            console.error(err);
            console.log("An error occured while fetching user data");
        }
        };
    
    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
        forceUpdate();
    }, [user, loading]);


    const Push = async () => {
        forceUpdate();
        try {
            const docRef = await addDoc(collection(db, "food-items"), {
            name : name,
            quantity : quantity,
            expiryDate : expiryDate,
            userEmail: userEmail,
            userName: userName,
            userID: userID
            });
            console.log("Document written with ID: ", docRef.id);
          }
        catch (err) {
          console.error(err);
          alert(err.message);
        }
      };

    return (
        <>
        <Layout/>
        <div class="px-4">
            <form class="bg-white px-8 pt-6 pb-8 mb-4">
                <div class="mb-6">
                    <label class="block mb-2 bg-general-colortext-sm font-medium text-gray-900 dark:text-gray-300">Food item</label>
                    <input id="food-item" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="apple" 
                            required
                            onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Quantity</label>
                    <input id="food-category" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="3" 
                            required
                            onChange={(e) => setQuantity(e.target.value)}></input>
                </div>
                
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry date / best before</label>
                    <div class="relative">
                        <div class="datepicker relative form-floating mb-3 xl:w-96" data-mdb-toggle-button="false">
                            <input type="date"
                            class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            placeholder="Select a date"
                            onChange={(e) => setExpiryDate(e.target.value)}></input>
                        </div>
                    </div>
                </div>
                
                <button
                    class="text-white bg-teal-300 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-300 dark:hover:bg-teal-500 dark:focus:ring-teal-700 my-2"
                    onClick={Push}>Add</button>
                <button class="text-rose-900 bg-general-color hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-general-color dark:hover:bg-rose-500 dark:focus:ring-rose-700 my-2">
                    <a href="/myitem">Cancel</a>
                </button>
                

            </form>
            
        </div>

        </>

        
);

}
