import Footer from "./Footer";
import SideMenu from "./SideMenu";
import "../ComponentsCSS/SideMenu.css";
import "../ComponentsCSS/Layout.css";
import "../PagesCSS/Home.css";
import pic1 from "../Images/FoodifyBckgd.jpg";

import logo from "../Images/FoodifyLogo.png";

export default function Layout({ preview, children }) {
  return (
    <div>
      <div>
        {/* Foodify Logo */}
        <div>
          <img src={logo} alt="Foodify-Logo" className="logo" />
        </div>
        <div>
          {/* Foodify Background Image, Headings */}
          <div className="section1">
            <img
              class="img-responsive"
              src={pic1}
              alt="Foodify background"
              className="img1"
            />
            <h1 className="heading1">Foodify</h1>
            <p className="description1">More food? Share it!</p>
          </div>

          <div>
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
