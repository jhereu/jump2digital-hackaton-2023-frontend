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
  // const [isHover, setIsHover] = useState(false);

  const episodeCount = character.episode.length;
  return (
    <div
      className="group w-64 bg-zinc-700 hover:bg-zinc-600 border-2 border-zinc-800 hover:border-customBlue-500 m-5 rounded-2xl cursor-pointer text-center pb-3"
      // onMouseEnter={() => setIsHover(true)}
      // onMouseLeave={() => setIsHover(false)}
    >
      <img
        src={character.image}
        alt={character.name}
        aria-description={`Image of ${character.name}`}
        className="rounded-t-2xl mb-5 max-w-full"
      />
      <div className="px-5">
        <h3 className=" group-hover:text-customBlue-500 text-zinc-300">
          <span className="font-bold text-xl">{character.name}</span>{" "}
        </h3>
        <p className="text-sm text-zinc-400">
          {episodeCount} episode{episodeCount === 1 ? "" : "s"}
        </p>
        <CharacterStatusTag status={character.status} />
        <p className="mt-1 mb-3">
          <CharacterSpeciesTag
            species={character.species}
            type={character.type}
          />
          <CharacterGenderTag gender={character.gender} />
        </p>
      </div>
      {/* <span className="text-xs text-zinc-400">#{character.id}</span> */}
    </div>
  );
};
