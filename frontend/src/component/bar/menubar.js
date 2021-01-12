import React from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_API } from "../../_actions/config";
import { withRouter } from "react-router-dom";
import "./bar.scss";

function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    axios.post(`${SERVER_API}/api/auth/logout`).then((res) => {
      if (res.status === 200) {
        sessionStorage.removeItem("userid");
        props.history.push("/login");
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
export default withRouter(SimpleMenu);
