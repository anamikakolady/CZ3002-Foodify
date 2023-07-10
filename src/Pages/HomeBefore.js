import React from "react";
import "../PagesCSS/Home.css";
import pic1 from "../Images/FoodifyBckgd.jpg";
import pic2 from "../Images/HomeImg2.jpg";
import { NavLink } from "react-router-dom";
import LayoutBefore from "../Components/LayoutBefore";

let activeStyle = {
  color: "#80De80",
  transition: "all 0.2s linear",
};


export default function HomeBefore() {
  return (
    <section>
      <LayoutBefore/>
        <div class="flex items-center text-center lg:text-left py-10 md:px-12 lg:w-1/2">
                 <div>
                     <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl italic py-5">Getting started with <span class="font-extrabold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 font-bold italic">Foodify</span></h2>
                     <p class="mt-2 text-s italic text-teal-900 md:text-base rounded bg-gradient-to-r from-white via-teal-200 to-white mr-10 py-2">Track you food’s expiry</p>
                     <p class="mt-2 text-s italic text-orange-900 md:text-base rounded bg-gradient-to-r from-white via-orange-200 to-white ml-14 py-2">Sell Excess Food</p>
                     <p class="mt-2 text-s italic text-cyan-900 md:text-base rouneded bg-gradient-to-r from-white via-cyan-200 to-white mr-14 py-2">Reduce Wastage</p>
                     <div class="flex justify-center lg:justify-start mt-10">
                         <a class="px-4 py-3 bg-teal-700 text-white text-sm font-semibold rounded hover:bg-teal-500" href="/signin">Log in</a>
                         <a class="mx-4 px-4 py-3 bg-gray-100 text-gray-500 text-sm font-semibold rounded hover:bg-gray-200" href="/signup">Sign up</a>
                     </div>
                 </div>
        </div>
    </section>
  );
}
