import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
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

  if (props.auth.status.auth === "SUCCESS") {
    return (
      <div className='nav'>
        <button
          className='mymenu'
          aria-controls='menubar'
          aria-haspopup='true'
          onClick={handleClick}
        >
          {props.auth.userData.userid} 님
        </button>
        <Menu
          id='menubar'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <Link to={{ pathname: "/newpost" }}> 디자인올리기</Link>
          </MenuItem>

          <MenuItem onClick={handleClose}>
            <Link
              to={{ pathname: "/mypage" }}
              style={{ textDecoration: "none", color: "black" }}
            >
              마이페이지
            </Link>
          </MenuItem>

          <MenuItem onClick={onLogout}>
            <div>로그아웃</div>
          </MenuItem>
        </Menu>
      </div>
    );
  } else {
    return <></>;
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(SimpleMenu);
