import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVersion } from "../redux/actions/authAction";

const Footer = () => {
  const version = useSelector((state) => state.authReducer.version);
  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(getVersion());
    },
    [dispatch]
  );

  return (
    <footer className="container">
      <p>
        Company &copy; {new Date().getFullYear()} | API Version:{version}{" "}
      </p>
    </footer>
  );
};

export default Footer;
