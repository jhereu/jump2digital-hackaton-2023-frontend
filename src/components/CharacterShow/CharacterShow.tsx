import { FC, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import { getCharacter } from "@/lib/api/chartacters.api";
import { CHARACTER_LIST_ROUTE } from "@/lib/config/routes";
import { Character } from "@/lib/types/Character.types";

/**
 * Component for Character details
 *
 * It has a button to go back to Character list
 */
export const CharacterShow: FC = () => {
  const { id } = useParams();
  const idInt = parseInt(id || "");
  const isInvalidId = !idInt || isNaN(idInt);

  const [character, setCharacter] = useState<Character>();
  const [isLoading, setIsLoading] = useState(true);
  const [redirection, setRedirection] = useState(
    !character && isInvalidId ? CHARACTER_LIST_ROUTE : "",
  );

  useEffect(() => {
    if (character) {
      return;
    }

    setIsLoading(true);
    getCharacter(idInt).then((data) => {
      if (!data) {
        setRedirection(CHARACTER_LIST_ROUTE);
        return;
      }
      setCharacter(data);
      setIsLoading(false);
    });
  }, [character, idInt]);

  if (redirection) {
    return <Navigate to={redirection} />;
  }

  if (isLoading || !character) {
    return "Loading...";
  }

  return (
    <>
      <Link
        className="text-customGreen-500 hover:text-customBlue-500 hover:underline mb-5"
        to={CHARACTER_LIST_ROUTE}
      >
        Back to list
      </Link>
      <h1 className="font-bold text-4xl">{character.name}</h1>
      <div className="flex flex-col sm:flex-row sm:justify-center">
        <div className="inline-block">
          <img
            src={character.image}
            alt={character.name}
            aria-description={`Image of ${character.name}`}
            className="rounded-2xl mt-8 mb-8 max-w-full mx-auto"
          />
        </div>
        <div className="flex flex-col ml-10">
          <span className="font-bold mt-4">ID</span>
          <span className="text-zinc-400">{character.id}</span>
          <span className="font-bold mt-4">Name</span>
          <span className="text-zinc-400">{character.name}</span>
          <span className="font-bold mt-4">Status</span>
          <span className="text-zinc-400">{character.status}</span>
          <span className="font-bold mt-4">Gender</span>
          <span className="text-zinc-400">{character.gender}</span>
          <span className="font-bold mt-4">Origin</span>
          <div className="text-zinc-400">
            <p className="text-zinc-400">{character.origin.name}</p>
            <p className="text-zinc-400">{character.origin.dimension}</p>
            <p className="text-zinc-400">{character.origin.type}</p>
          </div>
          <span className="font-bold mt-4">Last location</span>
          <div className="text-zinc-400">
            <p className="text-zinc-400">{character.location.name}</p>
            <p className="text-zinc-400">{character.location.dimension}</p>
            <p className="text-zinc-400">{character.location.type}</p>
          </div>
          <span className="font-bold mt-4">Species</span>
          <span className="text-zinc-400">{character.species}</span>
          {character.type ? (
            <>
              <span className="font-bold mt-4">Subspecies</span>
              <span className="text-zinc-400">{character.type}</span>
            </>
          ) : null}
          <span className="font-bold mt-4">Episodes</span>
          <ul>
            {character.episode.map((episode) => {
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
        </div>
      </div>
    </>
  );
};
