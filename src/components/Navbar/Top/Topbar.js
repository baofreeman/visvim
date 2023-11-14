import React, { useEffect, useState } from "react";
import styles from "./Topbar.module.scss";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { BsSearch, BsCart, BsFillPersonFill } from "react-icons/bs";
import { logoVisvim, logoWMV } from "../../../assets";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../services/userServices";
import { logoutUser } from "../../../redux/actions/user";
const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const User = useSelector((state) => state.userReducer.user);
  const [field, setField] = useState(false);

  const handleLogout = async () => {
    const res = await logout();
    dispatch(logoutUser());
    localStorage.removeItem("userId");
    localStorage.removeItem("cartVisvim");
  };
  useEffect(() => {
    if (User) {
      setField(true);
    }
  }, [User]);
  return (
    <div className={styles.container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>
          <img src={logoVisvim} />
        </div>
        <nav className={styles.menu}>
          <ul>
            <Link to={"/"}>
              <img src={logoWMV} />
            </Link>
            <Link to={"/about"}>
              <BsSearch />
            </Link>
            <Link to={"/cart"}>
              <BsCart />
            </Link>
            {field && User ? (
              <div>
                {User.name}
                <span onClick={() => handleLogout()}>Exit</span>
                {User.isAdmin && <Link to={"/admin"}>Admin</Link>}
              </div>
            ) : (
              <Link to={"/login"}>
                <BsFillPersonFill />
              </Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Topbar;
