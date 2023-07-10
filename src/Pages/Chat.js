import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../PagesCSS/Marketplace.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Layout from "../Components/Layout";
import PAY from "../Images/pay(new).jpg";
import ENDCHAT from "../Images/endchatnew.jpg";
import SEND from "../Images/send.png";

import db from "../firebase/firebase";
import { auth } from "../firebase/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  query,
  collection,
  getDocs,
  addDoc,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";

function Chat() {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [show, setShow] = useState(false);
  const [delItem, setDelItem] = useState("");
  const [delPostID, setDelPostID] = useState("");
  const [delItemID, setDelItemID] = useState("");

  const [delSellerEmail, setDelSellerEmail] = useState("");

  useEffect(() => {
    console.log(delItem);
    console.log(delSellerEmail);
    handleDelete();
  }, [show]);

  const handleDelete = async () => {
    console.log("in handledelete");

    const q2 = query(
      collection(db, "food-items"),
      where("name", "==", delItem),
      where("userEmail", "==", delSellerEmail)
    );
    const doc2 = await getDocs(q2);
    const q1 = query(
      collection(db, "posts"),
      where("foodItemName", "==", delItem),
      where("sellerEmail", "==", delSellerEmail)
    );
    const doc1 = await getDocs(q1);

    console.log("delItemID=", doc2.docs[0].id);
    deleteDoc(doc(db, "food-items", doc2.docs[0].id))
      .then(() => {
        console.log("Item delted, item id=", doc2.docs[0].id);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log("delPostID=", doc1.docs[0].id);
    try {
      deleteDoc(doc(db, "post", doc1.docs[0].id))
        // db.collection("posts").document(doc1.docs[0].id)
        .then(() => {
          console.log("Post deleted. postID=", doc1.docs[0].id);
        });
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <section>
      <Layout />

      <div class="w-full px-5 pt-5 item-center">
        <div class="rounded-lg ">
          <table class="w-full border border-gray-200">
            <tbody>
              <div class="bg-lime-100">
                <p class="px-5 py-2 font-semibold text-gray-600 dark:text-white text-center">
                  Item Info
                </p>
              </div>
              <tr
                tabindex="0"
                class="focus:outline-none flex-auto bg-yellow-50"
              >
                <td>
                  <p class="px-5 pt-5 text-gray-800 dark:text-white">
                    <span class="font-semibold">Item: </span>{" "}
                    {searchParams.get("foodItemQuantity")}{" "}
                    {searchParams.get("foodItem")}
                  </p>
                  <p class="px-5 pt-1 text-gray-800 dark:text-white">
                    <span class="font-semibold">Expiry: </span>{" "}
                    {searchParams.get("foodItemExpiryDate")}
                  </p>
                  <p class="px-5 pt-1 text-gray-800 dark:text-white">
                    <span class="font-semibold">Price: </span>{" "}
                    {searchParams.get("price")}
                  </p>
                  <p class="px-5 pt-1 text-gray-800 dark:text-white">
                    <span class="font-semibold">Status: </span>{" "}
                    {searchParams.get("status")}
                  </p>
                  <p class="px-5 pt-1 pb-5 text-gray-800 dark:text-white">
                    <span class="font-semibold">Description: </span>{" "}
                    {searchParams.get("description")}
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="flex justify-center lg:justify-start px-5 pt-10 pb-2 italic">
            Contact seller now
          </div>
          <table class="w-full border border-gray-200">
            <tbody>
              <div class="bg-teal-100">
                <p class="px-5 py-2 font-semibold text-gray-600 dark:text-white text-center">
                  Seller Info
                </p>
              </div>
              <tr
                tabindex="1"
                class="focus:outline-none flex-auto bg-teal-50 pt-10"
              >
                <td>
                  <p class="px-5 pt-5 text-gray-800 dark:text-white">
                    <span class="font-semibold">Seller Name: </span>{" "}
                    {searchParams.get("sellerName")}
                  </p>
                  <p class="px-5 pt-1 text-gray-800 dark:text-white">
                    <span class="font-semibold">Seller Email: </span>{" "}
                    <span class="text-blue-800 italic">
                      {searchParams.get("sellerEmail")}{" "}
                    </span>
                  </p>
                  <p class="px-5 pt-1 pb-5 text-gray-800 dark:text-white">
                    <span class="font-semibold">Seller Phone: </span>{" "}
                    <span class="text-blue-800 italic">
                      {searchParams.get("sellerPhone")}
                    </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="flex justify-center lg:justify-start mt-10">
        {!show && (
          <>
            <div
              class="mx-7 px-5 py-3 rounded-2xl bg-teal-700 text-white text-sm font-semibold rounded hover:bg-teal-500"
              id="my-modal"
            >
              <button
                onClick={() => {
                  setDelItem(searchParams.get("foodItem"));
                  setDelSellerEmail(searchParams.get("sellerEmail"));
                  setShow(true);
                  console.log(show);
                  console.log(delItem);
                  console.log(delSellerEmail);
                  // deleteItem();
                }}
              >
                Pay
              </button>
            </div>
            <div class="mx-7 px-5 py-3 rounded-2xl bg-red-300 text-gray-700 text-sm font-semibold rounded hover:bg-gray-200">
              <a href="/marketplace">End</a>
            </div>
          </>
        )}
      </div>

      <div class="pt-10">
        {show && (
          <>
            <div
              class="transition delay-1500 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3"
              role="alert"
            >
              <p class="font-bold  delay-5000">Payment successful</p>
              <p class="text-sm  delay-10000">Thank you! payment successful</p>
            </div>
          </>
        )}
      </div>

    </section>
  );
}

export default Chat;
