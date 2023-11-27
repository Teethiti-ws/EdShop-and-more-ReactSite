import React, { useState } from "react";
import useHover from "../hook/useHover";

const Menu = () => {
  const { showHover, attrs } = useHover();
  return (
    <div>
      <h1>Menu</h1>
      {showHover ? <p>I am</p> : <p>not I am</p>}
      <img {...attrs} src="./logo192.png" alt="logo" />
    </div>
  );
};

export default Menu;
