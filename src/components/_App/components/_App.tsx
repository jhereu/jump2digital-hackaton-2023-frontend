import { FC } from "react";

import logo from "@/assets/Rick_and_Morty.svg";
import CharacterList from "@/components/CharacterList";

import styles from "../styles.module.css";

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
    <>
      <div>
        <a href="/" target="_blank">
          <img
            src={logo}
            className={styles.logo}
            alt="Rick and Morty Glossarium"
          />
        </a>
      </div>
      <CharacterList />
    </>
  );
};

_App.defaultProps = defaultProps;

/**
 * Exportación del componente `_App`
 */
export default _App as FC<_AppProps>;
