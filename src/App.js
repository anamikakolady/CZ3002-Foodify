import "./App.css";
import React from "react";

import { Route, Routes } from "react-router-dom";
import SideMenu from "./Components/SideMenu";

import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Myitem from './Pages/Myitem';
import AddFoodItem from './Pages/AddFoodItem'
import Layout from './Components/Layout';
import PostItem from './Pages/PostItem';
import Footer from "./Components/Footer";
import Home from "./Pages/Home";
import HomeBefore from "./Pages/HomeBefore";
import Marketplace from "./Pages/Marketplace";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import ForgetPassword from "./Pages/ForgetPassword";
import ChangePassword from "./Pages/ChangePassword";
import Recipe from "./Pages/Recipe";
import Chat from "./Pages/Chat";

function App() {

  return (<>
    {/* <Layout /> */}
    <Routes>
    <Route path="/" element={<HomeBefore />}/>
    <Route path="/start" element={<HomeBefore />}/>
    <Route path="/home" element={<Home />}/>
    <Route path="/signin" element={<Login/> } />
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/forgetpassword" element={<ForgetPassword/>}/>
    <Route path="/changepassword" element={<ChangePassword/>}></Route>
    <Route path="/myitem" element={<Myitem/>}/>
    <Route path="/addfooditem" element={<AddFoodItem/>}/>
    <Route path="/sellfooditem" element={<PostItem/>}/>
    <Route path="/recipe" element={<Recipe />}/>
    <Route path="/marketplace" element={<Marketplace />}/>
    <Route path="/profile" element={<Profile />}/>
    <Route path="/editprofile" element={<EditProfile />}/>

    <Route path="/recipe" element={<Recipe />}/>
    <Route path="/chat" element={<Chat />}/>
    </Routes>
    <Footer />
    </>
  );
}

export default App;
