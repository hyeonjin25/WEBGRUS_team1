import React, { useState } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../_actions/authAction";
import "./bar.scss";

function SimpleMenu(props) {
  const history = useHistory();
  const auth = props.auth;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = async () => {
    //action
    await props.logoutUser().then((res) => {
      if (res) {
        history.push("/login");
      } else {
        alert("로그아웃에 실패했습니다.");
      }
    });
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
        <MenuItem>
          <Link
            to={{ pathname: "" }}
            style={{ textDecoration: "none", color: "black" }}
          >
            내 계정
          </Link>
        </MenuItem>

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

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(SimpleMenu);
