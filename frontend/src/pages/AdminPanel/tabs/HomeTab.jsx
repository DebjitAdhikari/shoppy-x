import React, { useState, useRef, useEffect } from "react";
import { Plus, Edit, Trash, Upload, AlertTriangle } from "lucide-react";
import Modal from "../common/Modal";
import getAllBanners from "../../../services/homebanners/getAllBanners.js";
import createNewBanner from "../../../services/homebanners/createNewBanner.js";
import HomeAdminFeaturedProducts from "./adminComponents/HomeAdminFeaturedProducts.jsx";
import HomeAdminHomeCategories from "./adminComponents/HomeAdminHomeCategories.jsx";
import HomeAdminBanners from "./adminComponents/HomeAdminBanners.jsx";

const HomeTab = () => {
  

  

  

 
  
  
  return (
    <div className="space-y-10 p-2 sm:p-6 bg-gray-50">
      {/* Hero Banners Section */}
      <HomeAdminBanners></HomeAdminBanners>

      {/* Featured Products Section */}
      <HomeAdminFeaturedProducts></HomeAdminFeaturedProducts>

      {/* Featured Categories Section */}
      <HomeAdminHomeCategories></HomeAdminHomeCategories>

      
  
      
    </div>
  );
};

export default HomeTab;
