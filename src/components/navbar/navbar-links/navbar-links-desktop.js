import React, { useState } from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import strings from "../../../resources/strings.json"
import "../navbar.css";

function DesktopLinks() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <ul className="nav-menu">
          <Button className="button-navbar" variant="text" href="#">{ strings.feedback }</Button>
          <div>
            <Button 
                className="button-navbar" 
                id="help-button"
                aria-controls="help-menu" 
                aria-haspopup="true" 
                variant="text" 
                aria-expanded={open ? 'true' : undefined}
                onClick={ handleClick }>
                    { strings.help }
                </Button>
              <Menu
                  id="help-menu"
                  className="dropdownMenu"
                  anchorEl={ anchorEl }
                  open={ open }
                  onClose={ handleClose }
                  MenuListProps={{
                      'aria-labelledby': 'help-button',
                  }}
              >
                  <MenuItem className="menu-item" onClick={ handleClose }>{ strings.menuAbout }</MenuItem>
                  <MenuItem className="menu-item" onClick={ handleClose} >{ strings.menuFaq }</MenuItem>
              </Menu>
          </div>
          <Button className="button-navbar" variant="text" href="links">{ strings.links }</Button>
          <Button className="button-navbar" variant="text" href="#">{ strings.logout }</Button>
        </ul> 
    )
}

export default DesktopLinks;