import { FC, useState } from "react";

import { Character } from "@/lib/types/Character.types";

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
  const [isHover, setIsHover] = useState(false);

  const nameClassName = character.name.length > 20 ? "text-md" : "text-xl";
  const nameMarginBottom = character.name.length > 20 ? "mb-3" : "mb-2";

  const episodeCount = character.episode.length;

  return (
    <div
      className="w-64 bg-gradient-to-br from-zinc-600 to-zinc-700 m-5 rounded-2xl cursor-help text-center pb-3  hover:from-zinc-600 hover:to-zinc-700"
      style={{ minHeight: "430px" }}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isHover ? (
        <div className="group px-8 py-10 text-left flex flex-col">
          {/* <span className="font-bold text-xs mt-4">ID</span>
          <span className="text-xs text-zinc-400">{character.id}</span> */}
          <span className="font-bold text-xs mt-4">Origin</span>
          <span className="text-xs text-zinc-400">{character.origin.name}</span>
          <span className="font-bold text-xs mt-4">Last location</span>

          <span className="text-xs text-zinc-400">
            {character.location.name}
          </span>
          <span className="font-bold text-xs mt-4">Species</span>
          <span className="text-xs text-zinc-400">{character.species}</span>
          {character.type ? (
            <>
              <span className="font-bold text-xs mt-4">Subspecies</span>
              <span className="text-xs text-zinc-400">{character.type}</span>
            </>
          ) : null}
          <span className="font-bold text-xs mt-4">Last episodes</span>
          {episodeCount > 0 ? (
            <>
              {character.episode
                .slice(-3)
                .reverse()
                .map((episode) => {
                  return (
                    <span
                      key={`character-${character.id}-episode-${episode.id}`}
                      className="text-xs text-zinc-400"
                    >
                      {episode.episode} - {episode.name}
                    </span>
                  );
                })}
            </>
          ) : (
            <span className="text-zinc-400">None</span>
          )}

          {/* <span className="text-sm mt-1">Latest episode(s)</span> */}
          {/* {character.episode
            .reverse()
            .slice(0, 3)
            .map((episode, i) => (
              <span key={`episode-${i}`} className="text-zinc-400">
                {episode}
              </span>
            ))} */}
        </div>
      ) : (
        <div className="group">
          <img
            src={character.image}
            alt={character.name}
            aria-description={`Image of ${character.name}`}
            className="rounded-t-2xl mb-5 max-w-full group-hover:hidden"
          />
          <div className="px-5">
            <h3
              className={`group-hover:text-customBlue-500 text-zinc-300 ${nameMarginBottom}`}
            >
              <span className={`font-bold ${nameClassName}`}>
                {character.name}
              </span>
            </h3>
            <p className="text-sm text-zinc-400">
              {episodeCount} episode{episodeCount === 1 ? "" : "s"}
            </p>
            <CharacterStatusTag status={character.status} />
            <p className="mt-6 mb-2">
              <CharacterSpeciesTag
                species={character.species}
                type={character.type}
              />
              <CharacterGenderTag gender={character.gender} />
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
