import React from "react";

// NOTE old ver. -=> typescript
import { PropTypes } from "prop-types";

const Footer = ({ title, website, postcode, isOpened }) => {
  return (
    <div>
      <h3>TEE &copy; {new Date().getFullYear()}</h3>
      <p>
        {title} {website} {postcode}{" "}
      </p>
      <p>{isOpened.toString()}</p>
    </div>
  );
};

Footer.propTypes = {
  title: PropTypes.string,
  website: PropTypes.string,
  postcode: PropTypes.number,
  isOpened: PropTypes.bool,
};

export default Footer;
