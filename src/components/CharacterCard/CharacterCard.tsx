import "./CharacterCard.css";

import { FC, useState } from "react";
import { Navigate } from "react-router-dom";

import { BUILD_CHARACTER_SHOW_ROUTE } from "@/lib/config/routes";
import { Character } from "@/lib/types/Character.types";

import { CharacterCardGenderTag } from "./CharacterCardGenderTag";
import { CharacterCardSpeciesTag } from "./CharacterCardSpeciesTag";
import { CharacterCardStatusTag } from "./CharacterCardStatusTag";

// Max episodes to show on card flip
const LAST_EPISODES_MAX_COUNT = 5;

interface CharacterCardProps {
  character: Character;
}

/**
 * Character card component.
 *
 * Has 2 sides that flip when hovering the card:
 * - Front has image and basic info
 * - Back has extended info
 *
 * When clicking, redirects to Character details (`CharacterShow`)
 */
export const CharacterCard: FC<CharacterCardProps> = ({ character }) => {
  const [redirection, setRedirection] = useState("");

  // When character name is long, reduce font size so lines do not break into two and card preserves aspect ratio
  const nameClassName = character.name.length > 20 ? "text-md" : "text-xl";
  const nameMarginBottom = character.name.length > 20 ? "mb-3" : "mb-2";

  if (redirection) {
    return <Navigate to={redirection} />;
  }

  return (
    <div
      className="character-card w-64 m-5 pb-3 cursor-pointer"
      onClick={() => setRedirection(BUILD_CHARACTER_SHOW_ROUTE(character.id))}
    >
      <div className="character-card-content">
        {/* Card front */}
        <div className="character-card-front bg-gradient-to-br from-zinc-600 to-zinc-700 rounded-2xl text-center">
          <img
            src={character.image}
            alt={character.name}
            aria-description={`Image of ${character.name}`}
            className="rounded-t-2xl mb-5 max-w-full"
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
              {character.episode.length} episode
              {character.episode.length === 1 ? "" : "s"}
            </p>
            <CharacterCardStatusTag status={character.status} />
            <p className="mt-6 mb-2">
              <CharacterCardSpeciesTag
                species={character.species}
                type={character.type}
              />
              <CharacterCardGenderTag gender={character.gender} />
            </p>
          </div>
        </div>

        {/* Card back */}
        <div className="character-card-back px-8 py-10 text-left flex flex-col text-xs bg-gradient-to-br rounded-2xl from-zinc-800 to-zinc-700">
          <span className="font-bold text-xs mt-4">ID</span>
          <span className="text-xs text-zinc-400">{character.id}</span>
          <span className="font-bold mt-4">Origin</span>
          <span className="text-zinc-400">{character.origin.name}</span>
          <span className="font-bold mt-4">Last location</span>

          <span className=" text-zinc-400">{character.location.name}</span>
          <span className="font-bold mt-4">Species</span>
          <span className="text-zinc-400">{character.species}</span>
          {character.type ? (
            <>
              <span className="font-bold mt-4">Subspecies</span>
              <span className="text-zinc-400">{character.type}</span>
            </>
          ) : null}
          <span className="font-bold mt-4">Last episodes</span>
          {character.episode.length > 0 ? (
            <ul>
              {character.episode
                .slice(-LAST_EPISODES_MAX_COUNT)
                .reverse()
                .map((episode) => {
                  return (
                    <li
                      key={`character-${character.id}-episode-${episode.id}`}
                      className="text-zinc-400"
                    >
                      <span className="font-bold">{episode.episode}</span>{" "}
                      <span className="italic">{episode.name}</span>
                    </li>
                  );
                })}
            </ul>
          ) : (
            <span className="text-zinc-400">None</span>
          )}
        </div>
      </div>
    </div>
  );
};
