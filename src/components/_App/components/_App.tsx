import { FC } from "react";
import { Outlet } from "react-router-dom";

import logo from "@/assets/images/Rick_and_Morty.svg";

import { Footer } from "./Footer";
import { ScrollToTop } from "./ScrollToTop";

/**
 * Props del componente `_App`
 */
export type _AppSafeProps = _AppProps & typeof defaultProps;

export interface _AppProps {}

const defaultProps = {};

/**
 * Definición del componente `_App`
 */
const _App: FC<_AppSafeProps> = () => {
  return (
    <div className="justify-center mx-auto w-10/12 m-10">
      <a href="/" target="_self">
        <img
          src={logo}
          width={600}
          className="mx-auto max-w-full mb-24 xs:mb-12"
          alt="Rick and Morty Glossarium"
        />
      </a>
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  );
};

_App.defaultProps = defaultProps;

/**
 * Exportación del componente `_App`
 */
export default _App as FC<_AppProps>;
