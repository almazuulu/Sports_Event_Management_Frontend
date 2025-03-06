import React from "react";

import classes from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <nav className={classes.footerContainer}>
      <p>© UST Global {currentYear}</p>
      <p>Developed by UST Development Team</p>
    </nav>
  );
}

export default Footer;
