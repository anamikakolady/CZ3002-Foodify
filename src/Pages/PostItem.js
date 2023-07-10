import React, { useState, useEffect } from "react";
import {Link, useNavigate, NavLink} from "react-router-dom";
import "../PagesCSS/Home.css";
import "../PagesCSS/Myitem.css"
import Layout from "../Components/Layout.js";
import "..//ComponentsCSS/SideMenu.css";

import db from '../firebase/firebase';
import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs,  addDoc, where } from "firebase/firestore";

export default function PostItem() {
    const [title , setTitle] = useState("");
    // const [chosenItem, setChosenItem] = useState(
    //         {
    //             "name": "chicken",
    //             "quantity": "1",
    //             "expiryDate": "29/11/2022"
    //         }
    // );
    const [chosenItem, setChosenItem] = useState("a");
    const [chosenItemQuantity, setChosenItemQuantity] = useState("0");
    const [chosenItemExpiryDate, setChosenItemExpiryDate] = useState("2022/11/29");

    const [description , setDescription] = useState("");
    const [status , setStatus] = useState("opened");
    const [price, setPrice] = useState("0");

    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userID, setUserID] = useState("");
    const [userPhone, setUserPhone] = useState("");

    const [foodItems, setFoodItems] = useState(
        [
            {
                "name": "",
                "quantity": "",
                "expiryDate": ""
            }
        ]
    );


    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const fetchUserName = async () => {
        try {
            const q = query(collection(db, "users"), where("uid", "==", user?.uid));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setUserName(data.name);
            setUserEmail(data.email);
            setUserID(data.uid);
            setUserPhone(data.phone);
            // console.log(userName);
            // console.log(userEmail);
            // console.log(userID);f
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data User");
        }
    };

    const fetchItems = async () => {
        try {
            const q = query(collection(db, "food-items"), where("userID", "==", user?.uid));
            const doc = await getDocs(q);
            const items = doc.docs;
            let itemDocs = items.map(item => item.data());
            setFoodItems(itemDocs);
            console.log("fooditem", foodItems);
        } catch (err) {
            console.error(err);
            alert("An error occured while fetching user data Items");
        }
    };

    const fetchChosenItem = async () => {
        try {
            // const q = db.collection("food-items").where("userID", "==", user?.uid).where("name", "==", chosenItem);
            const q = query(collection(db, "food-items"), where("userID", "==", user?.uid), where("name", "==", chosenItem));
            const doc = await getDocs(q);
            const data = doc.docs[0].data();
            setChosenItemQuantity(data.quantity);
            setChosenItemExpiryDate(data.expiryDate);
        } catch (err) {
            console.error(err);
            // alert("An error occured while fetching user data fetchData");
        }
    };

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchUserName();
    }, [user, loading]);

    useEffect(() => {
        if (loading) return;
        if (!user) return navigate("/");
        fetchItems();
        // console.log(userName);
        // console.log(userID);
        // console.log(userEmail);
        // console.log(name);
        // console.log(quantity);
        // console.log(expiryDate);
        console.log(foodItems);
    }, [userName, user, loading]);

    
    useEffect(() => {
        if (loading) return;
        fetchChosenItem();

        console.log("title", title);
        console.log("itemname", chosenItem);
        console.log("quantity", chosenItemQuantity);
        console.log("expirydate", chosenItemExpiryDate);
        console.log("description", description);
        console.log("status", status);
        console.log("price", price);
        console.log("sellerid", userID, userEmail, userName, userPhone);
    }, [chosenItem, loading]);


    const Push = () => {
        try {
            const docRef = addDoc(collection(db, "posts"), {
            title : title,
            foodItemName: chosenItem,
            foodItemQuantity: chosenItemQuantity,
            foodItemExpiryDate: chosenItemExpiryDate,
            description : description,
            status: status,
            price: price,
            sellerId: userID,
            sellerEmail: userEmail,
            sellerName: userName,
            sellerPhone: userPhone,
            });
            console.log("Document written with ID: ", docRef.id);
          }
        catch (err) {
          console.error(err);
          console.log(err.message);
        }
      };


    return (
        <>
        <Layout/>
        <div class="px-4">
            <form class="bg-white px-8 pt-6 pb-8 mb-4">
                <div class="mb-6">
                    <label class="block mb-2 bg-general-colortext-sm font-medium text-gray-900 dark:text-gray-300">Title</label>
                    <input id="title" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="1 apple"
                        required
                        onChange={(e) => setTitle(e.target.value)}></input>
                </div>
                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Description</label>
                    {/* <input id="food-description" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="still fresh"></input> */}
                    <input id="description" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="optional"
                        onChange={(e) => setDescription(e.target.value)}></input>
                </div>


                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Food Item</label>
                    <select id="fooditems" 
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            onChange={(e) => setChosenItem(e.target.value)}
                            >
                        <option selected>Choose an item</option>
                        {foodItems.map(foodItem => (
                            <option key={foodItem.name} value={foodItem.name}>{foodItem.quantity} {foodItem.name}, expiry {foodItem.expiryDate}</option>
                        ))}
                    </select>
                </div>


                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Status</label>
                    <input id="status" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="opened/unopened"
                        onChange={(e) => setStatus(e.target.value)}></input>
                </div>

                <div class="mb-6">
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Price</label>
                    <input id="price" 
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="3$" 
                        required
                        onChange={(e) => setPrice(e.target.value)}></input>
                </div>
                
                <button
                    class="text-white bg-teal-300 hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-teal-300 dark:hover:bg-teal-500 dark:focus:ring-teal-700 my-2"
                    onClick={Push}>Post</button>
                <button class="text-rose-900 bg-general-color hover:bg-rose-500 focus:ring-4 focus:outline-none focus:ring-rose-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-general-color dark:hover:bg-rose-500 dark:focus:ring-rose-700 my-2">
                    <a href="/marketplace">Cancel</a>
                </button>
            </form>

        </div>
        </>

        
);

}