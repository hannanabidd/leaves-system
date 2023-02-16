// import DropDown from "@/components/ui/DropDown/DropDown";
import { Typography } from "@/components/ui/Typography";
// import HeaderData from "@/variables/general";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import classes from "./index.module.css";

function Header() {
  return (
    <div className={classes.header}>
      <div>
        <Image
          src="/images/Megaverse.png"
          alt="logo"
          height={40}
          width={157}
          className="cursor-pointer"
        />
      </div>
      <div className={classes.links}>
        <Typography className={classes.items}>hlo</Typography>

        <div></div>
        <div className={classes.flag}>
          <Image src="/images/flag.svg" alt="logo" height={40} width={40} />
        </div>
      </div>
    </div>
  );
}

export default Header;
