import React, { FC } from "react";
import Sidebar from "../../Sidebar/Sidebar";
import Navbar from "../../Header/AdminNavbar";
import FooterAdmin from "../../Footer/FooterAdmin";
import HeaderStats from "../../Headers/HeaderStats";

interface Props {
  children: React.ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Sidebar>
        {/* <div className="relative md:ml-64 bg-blueGray-100"> */}
        {/* <Navbar /> */}
        {/* Header */}
        {/* <HeaderStats /> */}
        <div className="px-4 md:px-10 mt-4 mx-auto w-full -m-24">
          {children}
          {/* <FooterAdmin /> */}
        </div>
        {/* </div> */}
      </Sidebar>
    </>
  );
};

export default Layout;
