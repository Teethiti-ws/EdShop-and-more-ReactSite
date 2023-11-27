import React from "react";
import Title from "../styles/title/Title";
import Button from "../styles/button/Button";

const Header = () => {
  const company = "TeeTech";
  const address = <p>in Th</p>;
  let num = 99;
  const isLogined = true;

  const product = [
    { id: 1, item: "coke" },
    { id: 2, item: "pepsi" },
  ];

  const showMessage = () => {
    return company + ".com" + company;
  };

  function handleCilck() {
    alert("Clicked!!!");
  }

  return (
    <div>
      <Title>Hi, Tee</Title>
      <Button $primary>test tee</Button>
      <h1>{company}</h1>
      {address}
      {num + 22} <br />
      {showMessage()}
      {isLogined && <p>Logined, Welcome</p>}
      <button onClick={handleCilck}>Click Me!</button>
      <ul>
        {product.map((product, i) => {
          return (
            <li key={product.id}>
              {i + 1} {product.item}
            </li>
          );
        })}
      </ul>
      <hr />
    </div>
  );
};

export default Header;
