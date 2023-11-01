import { FC } from "react";

import { Character } from "@/lib/store/slices/Character/Character.type";

import { CharacterGenderTag } from "./CharacterGenderTag";
import { CharacterSpeciesTag } from "./CharacterSpeciesTag";
import { CharacterStatusTag } from "./CharacterStatusTag";

interface CharacterCardProps {
  character: Character;
}

/**
 * Definición del componente `CharacterCard`
 *
 * @name CharacterCard
 * @description
 */
export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const episodeCount = character.episode.length;
  return (
    <>
      <div
        key={character.id}
        className="group w-72 bg-zinc-800 hover:bg-zinc-700 border-2 border-zinc-800 hover:border-customBlue-500 m-5 p-5 rounded-2xl cursor-pointer text-center"
      >
        <img
          src={character.image}
          alt={character.name}
          aria-description={`Image of ${character.name}`}
          className="mx-auto rounded-2xl w-40"
        />
        <h3 className=" group-hover:text-customBlue-500 text-zinc-300">
          <span className="font-bold text-xl">{character.name}</span>{" "}
          <span className="text-xs text-zinc-400">#{character.id}</span>
        </h3>
        <p className="text-sm text-zinc-400">
          {episodeCount} episode{episodeCount === 1 ? "" : "s"}
        </p>
        <CharacterStatusTag status={character.status} />
        <p className="mt-1">
          <CharacterSpeciesTag
            species={character.species}
            type={character.type}
          />
          <CharacterGenderTag gender={character.gender} />
        </p>
      </div>
    </>
  );
};
