import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../ComponentsCSS/SideMenu.css";

import { NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";

// Change the inline-style on selecting the respective tabs
let activeStyle = {
  color: "#80De80",
  transition: "all 0.2s linear",
};

function SideMenu() {

    const [expandNavBar, setExpandNavBar] = useState(false);

  return (
        <div
          className="hamburger-menu"
          onClick={() => {
            setExpandNavBar((currentValue) => !currentValue);
          }}
        >
          {expandNavBar ? (
            <>
              <FontAwesomeIcon
                className="fa-cross-icon"
                icon={faXmark}
                color="#000"
              />
              <nav className="navbar-mobile">
                <ul className="navbar-ul-mobile">
                  {/* To Home page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/home"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Home
                    </NavLink>
                  </li>

                  {/* To Add Food Item page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/addfooditem"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >

                      Add Food Item
                    </NavLink>
                  </li>

                  {/* To My Food Items page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/myitem"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >

                      My Food Items
                    </NavLink>
                  </li>

                  {/* To Sell Food Item Page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/sellfooditem"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Sell Food Item
                    </NavLink>
                  </li>

                  {/* To Explore Recipes page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/recipe"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Explore Recipes
                    </NavLink>
                  </li>

                  {/* To Shopping Forum Page */}
                  <li className="navbar-list-mobile">
                    <NavLink
                      className="navbar-items-mobile"
                      to="/marketplace"
                      style={({ isActive }) =>
                        isActive ? activeStyle : undefined
                      }
                    >
                      Marketplace
                    </NavLink>
                  </li>

                </ul>
              </nav>
            </>
          ) : (
            <>
              <FontAwesomeIcon className="fa-bars-icon" icon={faBars} color="#0000" />
            </>
          )}
        </div>
  );
}

export default SideMenu;
