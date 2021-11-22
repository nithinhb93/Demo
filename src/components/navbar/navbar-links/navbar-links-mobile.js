import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import strings from "../../../resources/strings.json"
import "../navbar.css";

function MobileLinks() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
    {/* Login check */}
      <div>
          {/* <Button className="button">{ strings.login }</Button> */}
          <Button disableElevation style={{ "marginRight": "5px"}} className="logout-button" variant="contained">{ strings.logout }</Button>
      </div>
      <div>
              <IconButton
                  id="menu-button"
                  aria-controls="mobile-menu"
                  aria-haspopup="true"
                  aria-expanded={ open ? 'true' : undefined }
                  onClick={ handleClick }
                  style={{ "marginRight": "10px"}}
              >
                  <MenuIcon fontSize="large" color="primary" />
              </IconButton>
              <Menu
                  id="mobile-menu"
                  anchorEl={ anchorEl }
                  open={ open }
                  onClose={ handleClose }
                  MenuListProps={{
                      'aria-labelledby': 'menu-button',
                  }}
              >
                  <MenuItem className="menu-item" onClick={ handleClose }>{ strings.menuAbout }</MenuItem>
                  <MenuItem className="menu-item" onClick={ handleClose }>{ strings.menuFaq }</MenuItem>
                  <MenuItem className="menu-item" onClick={ handleClose }>{ strings.feedback }</MenuItem>
                  <MenuItem className="menu-item" onClick={ handleClose }>{ strings.links }</MenuItem>
              </Menu>
          </div></>
  );
}

export default MobileLinks;
