import { Character } from "@/lib/store/slices/Character/Character.type";

import type { FC } from "react";

// import styles from '../styles.module.less';

/**
 * Props del componente `CharacterCard`
 */
export type CharacterCardSafeProps = CharacterCardProps & typeof defaultProps;

export interface CharacterCardProps {
  character: Character;
}

const defaultProps = {};

/**
 * Definición del componente `CharacterCard`
 *
 * @name CharacterCard
 * @description
 */
const CharacterCard: FC<CharacterCardSafeProps> = ({ character }) => {
  return (
    <>
      <li key={character.id}>{JSON.stringify(character)}</li>
    </>
  );
};

CharacterCard.defaultProps = defaultProps;

/**
 * Exportación del componente `CharacterCard`
 */
export default CharacterCard as FC<CharacterCardProps>;
