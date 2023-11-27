import React from "react";
import { logo, title } from "../styles/style";
import useHover from "../hook/useHover";

const Logo = () => {
  const { showHover, attrs } = useHover();

  const teeTech = {
    logo: "./logo192.png",
  };

  return (
    <div>
      {/* <img src="./logo192.png" alt="logo" /> */}
      <p style={title}>Logo title</p>
      {showHover ? <p>Logo title</p> : <p>No Logo title</p>}
      <img {...attrs} style={logo} src={teeTech.logo} alt="logo" />
      <img src={teeTech.logo} alt="logo" />
    </div>
  );
};

export default Logo;
