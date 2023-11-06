import { FC } from "react";
import { Outlet } from "react-router-dom";

import logo from "@/assets/images/Rick_and_Morty.svg";

import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

/**
 * Content wrapper for sections. Includes:
 * - Rick and morty Logo
 * - Outlet (React-router-dom displayed container)
 * - Footer
 * - Scroll-to-top button
 */
export const App: FC = () => {
  return (
    <div className="justify-center mx-auto w-10/12 m-10">
      <img
        src={logo}
        width={600}
        className="mx-auto max-w-full mb-24 xs:mb-12"
        alt="Rick and Morty Glossarium"
      />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
};
