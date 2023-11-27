import React, { useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

// import redux
import { updateProfile } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";

const NavBar = () => {
  const history = useHistory();

  // redux
  const profileRedux = useSelector((state) => state.authReducer.profile);
  const cartTotalRedux = useSelector((state) => state.cartReducer.total);
  const dispatch = useDispatch();

  useEffect(
    function () {
      function getProfile() {
        const profileValue = JSON.parse(localStorage.getItem("profile"));
        if (profileValue) {
          dispatch(updateProfile(profileValue));
        }
      }
      getProfile();
    },
    [dispatch]
  );

  //NOTE Non-Context
  // useEffect(function () {
  //   function getProfile() {
  //     const profileValue = JSON.parse(localStorage.getItem("profile"));
  //     if (profileValue) {
  //       setProfile(profileValue);
  //     }
  //   }
  //   getProfile();
  // }, []);

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("profile");
    history.replace("/");
    dispatch(updateProfile(null));
    // userStored.updateProfile(null);
  }

  return (
    <>
      <Navbar bg="success" expand="lg" variant="dark">
        <NavLink className="navbar-brand" to="/" exact>
          <img
            alt="logo-tee"
            width="30"
            height="30"
            className="d-inline-block align-top"
            src="./logo192.png"
          />
          TeeTech
        </NavLink>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink className="nav-link" to="/" exact>
              หน้าหลัก
            </NavLink>
            <NavLink className="nav-link" to="/product">
              สินค้า
            </NavLink>
            <NavLink className="nav-link" to="/about">
              เกี่ยวกับเรา
            </NavLink>
            <NavLink className="nav-link" to="/cart">
              ตระกร้าสินค้า {cartTotalRedux} ชิ้น
            </NavLink>
            <NavDropdown
              title="เพิ่มเติม (Pagination + CRUD)"
              id="basic-nav-dropdown"
            >
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/hospital");
                }}
              >
                ข้อมูลสถาพยาบาล (Pagination)
              </NavDropdown.Item>
              <NavDropdown.Item
                onClick={() => {
                  history.replace("/category");
                }}
              >
                หมวดหมู่ข่าว (CRUD)
              </NavDropdown.Item>
            </NavDropdown>
            <NavLink className="nav-link" to="/upload">
              อัปโหลดไฟล์
            </NavLink>
            <NavLink className="nav-link" to="/member">
              สำหรับสมาชิก
            </NavLink>{" "}
            <NavLink className="nav-link" to="/chart">
              รายงาน Charts
            </NavLink>
          </Nav>

          {profileRedux ? (
            <>
              <span className="navbar-text text-while">
                ยินดีต้อนรับ {profileRedux.name}
              </span>
              <button className="btn btn-danger ml-3" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <Nav>
              <NavLink className="nav-link" to="/login">
                เข้าระบบ
              </NavLink>
              <NavLink className="nav-link" to="/register">
                สมัครสมาชิก
              </NavLink>
            </Nav>
          )}

          {/* useContent */}
          {/* {userStored.profile ? (
            <>
              <span className="navbar-text text-while">
                ยินดีต้อนรับ {userStored.profile.name}
              </span>
              <button className="btn btn-danger ml-3" onClick={handleLogout}>
                Log out
              </button>
            </>
          ) : (
            <Nav>
              <NavLink className="nav-link" to="/login">
                เข้าระบบ
              </NavLink>
              <NavLink className="nav-link" to="/register">
                สมัครสมาชิก
              </NavLink>
            </Nav>
          )} */}
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
