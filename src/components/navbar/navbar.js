import React from "react";
import { Divider } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import DesktopLinks from "./navbar-links/navbar-links-desktop";
import MobileLinks from "./navbar-links/navbar-links-mobile";
import LogoImage from "../../assets/images/icons/aa-logo-gray.png"
import strings from "../../resources/strings.json"
import "./navbar.css";

function NavigationBar() {
  const isMediaLarge = useMediaQuery('(min-width:600px)'); 
  
  return(
    <>
      <nav className="navbar-items">
        <div className={ isMediaLarge ? "logo-container" : "logo-container logo-alignment" }>
          <a href="/">
            <img src={ LogoImage } alt="logo" className="logo-image" />
            <h1 className="logo-text">{ strings.myTime }</h1>
          </a>
        </div>
        <span className="fill-remaining-space"></span>
       { isMediaLarge ?  <DesktopLinks/> : <MobileLinks/> }
      </nav>
      <Divider></Divider>
    </>
  )
}

export default NavigationBar