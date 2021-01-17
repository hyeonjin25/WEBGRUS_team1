import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../_actions/authAction";
import "./bar.scss";

function SimpleMenu(props) {
  const history = useHistory();
  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    //action
    dispatch(logoutUser());
    history.push("/login");
  };

  return (
    <div className='nav'>
      <button
        aria-controls='menubar'
        aria-haspopup='true'
        onClick={handleClick}
      >
        마이페이지
      </button>
      <Menu
        id='menubar'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {/* <MenuItem>
          <Link
            to={{ pathname: "" }}
            style={{ textDecoration: "none", color: "black" }}
          >
            내 계정
          </Link>
        </MenuItem> */}

        <MenuItem>
          <Link
            to={{ pathname: "/mypage" }}
            style={{ textDecoration: "none", color: "black" }}
          >
            마이페이지
          </Link>
        </MenuItem>

        <MenuItem onClick={onLogout}>로그아웃</MenuItem>
      </Menu>
    </div>
  );
}

export default SimpleMenu;
