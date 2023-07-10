import React, { useState, useEffect } from "react";
import {Link, createSearchParams, useNavigate, NavLink} from "react-router-dom";
import "../PagesCSS/Marketplace.css";
import "../ComponentsCSS/Post.css";
import Layout from "../Components/Layout";

import db from '../firebase/firebase';
import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { query, collection, getDocs,  addDoc, where } from "firebase/firestore";


import pic1 from "../Images/chat-icon.png";
import "../Pages/Chat.js";

function Marketplace() {

  const [query,setQuery] = useState("");

  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
 

  const [Posts, setPosts] = useState(
    [
        {
            "title": "",
            "description": "",
            "foodItemName": "",
            "foodItemQuantity": "",
            "foodItemExpiryDate": "",
            "status": "",
            "price": "",
            "sellerEmail": "", 
            "sellerName": "",
            "sellerID": "",
        }
    ]
);

  const fetchPosts = async () => {
    try {
        const colRef = collection(db, "posts");
        const doc = await getDocs(colRef);
        const items = doc.docs;
        let itemDocs = items.map(item => item.data());
        setPosts(itemDocs);
        console.log(itemDocs);
        // console.log("itemdoc:", itemDocs);
        // console.log("fooditem", foodItems);
    } catch (err) {
        console.error(err);
        alert("An error occured while fetching user data");
    }
  };

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchPosts();
    // console.log(Posts);
  }, [user, loading]);



  const handleClick = (post) => {
    console.log(post);
    navigate({
      pathname:  "/chat",
      search: createSearchParams({
        sellerName: post.sellerName,
        sellerEmail: post.sellerEmail,
        sellerPhone: post.sellerPhone,
        foodItem: post.foodItemName,
        foodItemExpiryDate: post.foodItemExpiryDate,
        foodItemQuantity: post.foodItemQuantity,
        price: post.price,
        status: post.status,
        description: post.description,

      }).toString()
    });

  }

    return (
    <section>
      <Layout/>
     {/* Marketplace heading */}
      <div class="flex items-center text-center pt-3 pb-2 pl-12 ml-5">
        <div class="flex items-center text-4xl font-semibold text-black-800 md:text-2xl">
           Marketplace 
        </div>
      </div>

      {/* Marketplace sub heading */}
      <div class="flex items-center text-center pt-1 pb-2 pl-2">
        <div class="flex items-center text-1xl font-medium text-pink-700 md:text-1xl">
        One stop solution to sell and buy pre-loved food and contribute towards sustainability 
        </div>
      </div>

      <div class="focus:outline-none mx-5 focus:ring-2  bg-rose-400 focus:ring-rose-700 focus:bg-rose-500 dark:focus:bg-rose-500 flex cursor-pointer items-center justify-center px-3 py-2.5 border rounded border-rose-100 dark:border-rose-800 ">
          <a  class="focus:outline-none text-xs md:text-sm leading-none text-white dark:text-gray-200" href='/sellfooditem'>+ Post on the market</a>
      </div>

      {Posts.map(post => (
            <div class="w-full px-5 pt-5 item-center">
                <div class="border rounded-lg border border-gray-200 dark:border-gray-700 ">
                    <table class="w-full">
                        <tbody>  
                                <tr tabindex="0" class="focus:outline-none flex-auto ">
                                    <td>
                                        <div class="bg-lime-100">
                                            <p class="px-5 py-2 font-semibold text-gray-600 dark:text-white">{post.title}</p>
                                        </div>

                                        <p class="px-5 pt-5 text-gray-800 dark:text-white"><span class="font-semibold">Seller: </span> {post.sellerName} ({post.sellerEmail})</p>
                                        <p class="px-5 pt-1 text-gray-800 dark:text-white"><span class="font-semibold">Item: </span> {post.foodItemQuantity} {post.foodItemName}</p>
                                        <p class="px-5 pt-1 text-gray-800 dark:text-white"><span class="font-semibold">Expiry: </span> {post.foodItemExpiryDate}</p>
                                        <p class="px-5 pt-1 text-gray-800 dark:text-white"><span class="font-semibold">Price: </span> {post.price}</p>
                                        <p class="px-5 pt-1 text-gray-800 dark:text-white"><span class="font-semibold">Status: </span> {post.status}</p>
                                        <p class="px-5 pt-1 pb-5 text-gray-800 dark:text-white"><span class="font-semibold">Description: </span> {post.description}</p>
                                      
                                    </td>
                                </tr> 
                                <button onClick={() => {
                                  console.log(post);
                                  handleClick(post)
                                }} >
                                        <div class="chat-button">
                                        
                                            <img
                                            class="img-responsive"
                                            src={pic1}
                                            alt="chat-icon"
                                            className="Post-chat-icon-img1"
                                        />
                                       
                                      </div>
                                </button>                           
                        </tbody>
                    </table>
                </div>
            </div>
            ))}        

    </section>
    );
  }
  
  export default Marketplace;  