import { FC, useCallback, useMemo, useState } from "react";

import { useGetCharactersQuery } from "@/lib/store/slices/Character/Character.api";
import { CharacterFilters } from "@/lib/store/slices/Character/Character.type";

import { CharacterCard } from "./CharacterCard";
import { CharacterCardSkeleton } from "./CharacterCardSkeleton";
import { CharacterSearch } from "./CharacterSearch";

interface CharacterListProps {
  search?: string;
}

const skeletonCards = Array(20).map((_, i) => (
  <CharacterCardSkeleton key={`character-skeleton-${i}`} />
));

/**
 * Definición del componente `CharacterList`
 */
export const CharacterList: FC<CharacterListProps> = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<CharacterFilters>({});

  const { data, isLoading, isFetching, isError } = useGetCharactersQuery({
    page,
    filters,
  });

  const buttonGroup = useMemo(() => {
    const lastPage = data?.info?.pages || 1;
    const isFirstPage = !data?.info.prev;
    const isLastPage = !data?.info.next;

    const buttonClassNames = [
      "disabled:bg-transparent",
      "disabled:text-zinc-600",
      "disabled:cursor-not-allowed",
      "bg-zinc-800",
      "px-4",
      "py-2",
      "rounded",
      "hover:bg-customBlue-500",
      "hover:text-blue-800",
    ].join(" ");

    return (
      <div className="flex justify-between mx-36 flex-row xs:flex-col">
        <button
          className={buttonClassNames}
          onClick={() => setPage(page - 1)}
          disabled={isFirstPage}
        >
          Previous
        </button>
        <span>
          Page {page} / {lastPage || 1}
        </span>
        <button
          className={buttonClassNames}
          onClick={() => setPage(page + 1)}
          disabled={isLastPage}
        >
          Next
        </button>
      </div>
    );
  }, [data, page]);

  const content = useMemo(() => {
    if (isLoading || isFetching) {
      return skeletonCards;
    }

    if (isError || !data?.results?.length) {
      return (
        <div className="flex flex-wrap justify-center">
          <p>No characters</p>
        </div>
      );
    }

    return (
      <>
        <div className="flex flex-wrap justify-center">
          {data.results.map((character) => {
            return (
              <CharacterCard
                key={`character-id-${character.id}`}
                character={character}
              />
            );
          })}
        </div>
      </>
    );
  }, [data, isError, isFetching, isLoading]);

  const handleFilterChanged = useCallback((filters: CharacterFilters) => {
    setFilters(filters);
    setPage(1);
  }, []);

  return (
    <>
      <CharacterSearch onChange={handleFilterChanged} />
      {buttonGroup}
      {content}
      {buttonGroup}
    </>
  );
};
