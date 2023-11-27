import { useEffect, useState } from "react";

const Sidebar = () => {
  const [fullName, setFullName] = useState("JohnJee");
  const [isShowed, setIsShowed] = useState(true);

  function handleChangeName() {
    // setFullName("TohnTee");
    setFullName((cur) => (cur === "JohnJee" ? "TohnTee" : "JohnJee"));
    setIsShowed(!isShowed);
  }

  useEffect(() => {
    console.log("useEffect1");
  });

  useEffect(() => {
    console.log("useEffect2");
  }, []);

  useEffect(() => {
    console.log(`useEffect2 ${fullName}`);
  }, [fullName]);

  return (
    <>
      <h3>Sidebar</h3>
      <p>Hi Hi, {fullName}</p>

      {isShowed ? <p>Show</p> : <p>No Show</p>}

      <button onClick={handleChangeName}>Change Name</button>
    </>
  );
};

export default Sidebar;
