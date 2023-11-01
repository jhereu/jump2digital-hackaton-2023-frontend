import { FC } from "react";

import logo from "@/assets/images/Rick_and_Morty.svg";
import CharacterList from "@/components/CharacterList";

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
    <div className="justify-center mx-auto w-10/12">
      <a href="/" target="_blank">
        <img
          src={logo}
          width={600}
          className="mx-auto max-w-full mb-24"
          alt="Rick and Morty Glossarium"
        />
      </a>
      <CharacterList />
    </div>
  );
};

_App.defaultProps = defaultProps;

/**
 * Exportación del componente `_App`
 */
export default _App as FC<_AppProps>;
